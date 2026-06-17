import { console } from './log';

const parseSelect = (
	selectString: string,
	but = false
): {
	isSelected: (val: string | string[]) => boolean;
	values: string[];
} => {
	if (!selectString)
		return {
			values: [],
			isSelected: () => but
		};
	const parts = selectString.includes(',') ? selectString.split(',') : selectString.split(' ');
	const select: string[] = [];

	parts.forEach((part) => {
		if (part.includes('-')) {
			const splits = part.split('-');
			if (splits.length !== 2) {
				console.warn(`[WARN] Unable to parse input "${part}"`);
				return;
			}

			const firstPart = splits[0];
			const match = firstPart.match(/[A-Za-z]+/);
			if (match && match.length > 0) {
				if (match.index && match.index !== 0) {
					console.warn(`[WARN] Unable to parse input "${part}"`);
					return;
				}
				const letters = firstPart.substring(0, match[0].length);
				const number = parseFloat(firstPart.substring(match[0].length));
				const b = parseFloat(splits[1]);
				if (isNaN(number) || isNaN(b)) {
					console.warn(`[WARN] Unable to parse input "${part}"`);
					return;
				}
				for (let i = number; i <= b; i++) {
					select.push(`${letters}${i}`);
				}
			} else {
				const a = parseFloat(firstPart);
				const b = parseFloat(splits[1]);
				if (isNaN(a) || isNaN(b)) {
					console.warn(`[WARN] Unable to parse input "${part}"`);
					return;
				}
				for (let i = a; i <= b; i++) {
					select.push(`${i}`);
				}
			}
		} else {
			const sxExMatch = part.match(/^S(\d+)E(\d+)$/i);
			if (sxExMatch) {
				select.push(`S${parseInt(sxExMatch[1], 10)}E${parseInt(sxExMatch[2], 10)}`);
				return;
			}
			if (part.match(/[0-9A-Z]{9}/)) {
				select.push(part);
				return;
			} else if (part.match(/[A-Z]{3}\.[0-9]*/)) {
				select.push(part);
				return;
			}
			const match = part.match(/[A-Za-z]+/);
			if (match && match.length > 0) {
				if (match.index && match.index !== 0) {
					console.warn(`[WARN] Unable to parse input "${part}"`);
					return;
				}
				const letters = part.substring(0, match[0].length);
				const number = parseFloat(part.substring(match[0].length));
				if (isNaN(number)) {
					console.warn(`[WARN] Unable to parse input "${part}"`);
					return;
				}
				select.push(`${letters}${number}`);
			} else {
				select.push(`${parseFloat(part)}`);
			}
		}
	});

	return {
		values: select,
		isSelected: (st) => {
			if (typeof st === 'string') st = [st];
			return st.some((st) => {
				const sxExMatch = st.match(/^S(\d+)E(\d+)$/i);
				if (sxExMatch) {
					const normalized = `S${parseInt(sxExMatch[1], 10)}E${parseInt(sxExMatch[2], 10)}`;
					const included = select.includes(normalized);
					return but ? !included : included;
				}
				const match = st.match(/[A-Za-z]+/);
				if (st.match(/[0-9A-Z]{9}/)) {
					const included = select.includes(st);
					return but ? !included : included;
				} else if (match && match.length > 0) {
					if (match.index && match.index !== 0) {
						return false;
					}
					const letter = st.substring(0, match[0].length);
					const number = parseFloat(st.substring(match[0].length));
					if (isNaN(number)) {
						return false;
					}
					const included = select.includes(`${letter}${number}`);
					return but ? !included : included;
				} else {
					const included = select.includes(`${parseFloat(st)}`);
					return but ? !included : included;
				}
			});
		}
	};
};

export const hasDuplicateEpisodeNumbers = (episodeNumbers: string[]): boolean => episodeNumbers.length > 0 && episodeNumbers.length !== new Set(episodeNumbers).size;

export const episodeSelectionKeys = (opts: { id: string | number; season: string | number; episodeNumber: string | number; hasDuplicateEpNumbers: boolean }): string[] => {
	const ep = String(opts.episodeNumber);
	const keys = [String(opts.id), `S${parseInt(String(opts.season), 10)}E${parseInt(ep, 10)}`];
	if (!opts.hasDuplicateEpNumbers) {
		keys.unshift(ep);
	}
	return keys;
};

export default parseSelect;
