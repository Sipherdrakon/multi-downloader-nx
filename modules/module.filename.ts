import path from 'path';
import { AvailableFilenameVars } from './module.args';
import { console } from './log';
import Helper from './module.helper';

export type Variable<T extends string = AvailableFilenameVars> = (
	| {
			type: 'number';
			replaceWith: number;
	  }
	| {
			type: 'string';
			replaceWith: string;
	  }
) & {
	name: T;
	sanitize?: boolean;
};

const parseFileName = (
	input: string,
	variables: Variable[],
	numbers: number,
	override: string[],
	audioLanguages: string[] = [],
	subtitleLanguages: string[] = [],
	ccTag: string = 'cc'
): string[] => {
	const varRegex = /\${[A-Za-z1-9]+}/g;
	const vars = input.match(varRegex);
	const overridenVars = parseOverride(variables, override);
	if (!vars) return [input];

	// First pass: replace all variables except {title}
	for (let i = 0; i < vars.length; i++) {
		const type = vars[i];
		const varName = type.slice(2, -1);
		let use = overridenVars.find((a) => a.name === varName);
		if (use === undefined && type === '${height}') {
			use = { type: 'number', replaceWith: 0 } as Variable<string>;
		}
		if (use === undefined) {
			console.info(`[ERROR] Found variable '${type}' in fileName but no values was internally found!`);
			continue;
		}

		// Skip {title} for now - we'll handle it separately
		if (varName === 'title') {
			continue;
		}

		if (use.type === 'number') {
			const len = use.replaceWith.toFixed(0).length;
			const replaceStr = len < numbers ? '0'.repeat(numbers - len) + use.replaceWith : use.replaceWith + '';
			input = input.replace(type, replaceStr);
		} else {
			if (use.sanitize) use.replaceWith = Helper.cleanupFilename(use.replaceWith);
			input = input.replace(type, use.replaceWith);
		}
	}

	// Now handle {title} with truncation if needed
	const titleVar = overridenVars.find((a) => a.name === 'title');
	if (titleVar && titleVar.type === 'string') {
		let titleValue = titleVar.replaceWith;
		if (titleVar.sanitize) {
			titleValue = Helper.cleanupFilename(titleValue);
		}

		// Calculate the maximum length available for the title
		const maxLength = process.platform === 'win32' ? 260 : 4096;

		// Calculate the exact suffix length needed for this specific download
		const potentialSuffixLength = Helper.calculateSuffixLength(audioLanguages, subtitleLanguages, ccTag);
		const effectiveMaxLength = maxLength - potentialSuffixLength;

		// Check if truncation is needed
		const templateWithTitle = input.replace('${title}', titleValue);
		const pathCheck = Helper.checkPathLength(templateWithTitle);

		if (!pathCheck.isValid || templateWithTitle.length > effectiveMaxLength) {
			// Calculate how much space we have for the title
			const templateWithoutTitle = input.replace('${title}', '');
			const availableSpace = effectiveMaxLength - templateWithoutTitle.length;

			if (availableSpace > 10) {
				// Leave some buffer
				const maxTitleLength = availableSpace - 3; // -3 for "..."
				if (titleValue.length > maxTitleLength) {
					titleValue = titleValue.substring(0, maxTitleLength) + '...';
				}
			} else {
				// Not enough space even for a short title, use fallback
				titleValue = 'Episode';
			}
		}

		// Replace the title variable with the processed value
		input = input.replace('${title}', titleValue);
	}

	const cleanedParts = input.split(path.sep).map((a) => Helper.cleanupFilename(a));
	return cleanedParts;
};

const parseOverride = (variables: Variable[], override: string[]): Variable<string>[] => {
	const vars: Variable<string>[] = variables;
	override.forEach((item) => {
		const index = item.indexOf('=');
		if (index === -1) return logError(item, 'invalid');
		const parts = [item.slice(0, index), item.slice(index + 1)];
		if (!(parts[1].startsWith("'") && parts[1].endsWith("'") && parts[1].length >= 2)) return logError(item, 'invalid');
		parts[1] = parts[1].slice(1, -1);
		const already = vars.findIndex((a) => a.name === parts[0]);
		if (already > -1) {
			if (vars[already].type === 'number') {
				if (isNaN(parseFloat(parts[1]))) return logError(item, 'wrongType');
				vars[already].replaceWith = parseFloat(parts[1]);
			} else {
				vars[already].replaceWith = parts[1];
			}
		} else {
			const isNumber = !isNaN(parseFloat(parts[1]));
			vars.push({
				name: parts[0],
				replaceWith: isNumber ? parseFloat(parts[1]) : parts[1],
				type: isNumber ? 'number' : 'string'
			} as Variable<string>);
		}
	});

	return variables;
};

const logError = (override: string, reason: 'invalid' | 'wrongType') => {
	switch (reason) {
		case 'wrongType':
			console.error(`[ERROR] Invalid type on \`${override}\`. Expected number but found string. It has been ignored`);
			break;
		case 'invalid':
		default:
			console.error(`[ERROR] Invalid override \`${override}\`. It has been ignored`);
	}
};

export default parseFileName;
