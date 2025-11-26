// Helper functions
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import childProcess from 'child_process';
import { console } from './log';
import { languages } from './module.langsData';

export default class Helper {
	static async question(q: string) {
		const rl = readline.createInterface({ input, output });
		const a = await rl.question(q);
		rl.close();
		return a;
	}
	static formatTime(t: number) {
		const days = Math.floor(t / 86400);
		const hours = Math.floor((t % 86400) / 3600);
		const minutes = Math.floor(((t % 86400) % 3600) / 60);
		const seconds = Math.floor(t % 60);
		const daysS = days > 0 ? `${days}d` : '';
		const hoursS = daysS || hours ? `${daysS}${daysS && hours < 10 ? '0' : ''}${hours}h` : '';
		const minutesS = minutes || hoursS ? `${hoursS}${hoursS && minutes < 10 ? '0' : ''}${minutes}m` : '';
		const secondsS = `${minutesS}${minutesS && seconds < 10 ? '0' : ''}${seconds}s`;
		return secondsS;
	}

	static cleanupFilename(n: string) {
		/* eslint-disable no-extra-boolean-cast, no-useless-escape, no-control-regex */
		const fixingChar = '_';
		const illegalRe = /[\/\?<>\\:\*\|"]/g;
		const controlRe = /[\x00-\x1f\x80-\x9f]/g;
		const reservedRe = /^\.+$/;
		const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
		const windowsTrailingRe = /[\. ]+$/;
		return n
			.replace(illegalRe, fixingChar)
			.replace(controlRe, fixingChar)
			.replace(reservedRe, fixingChar)
			.replace(windowsReservedRe, fixingChar)
			.replace(windowsTrailingRe, fixingChar);
	}

	static checkPathLength(filePath: string): {
		isValid: boolean;
		length: number;
		maxLength: number;
		warning?: string;
	} {
		const maxLength = process.platform === 'win32' ? 260 : 4096; // Windows MAX_PATH vs typical Unix limit
		const length = filePath.length;
		const isValid = length <= maxLength;

		let warning: string | undefined;
		if (!isValid) {
			warning = `Path length (${length}) exceeds ${process.platform === 'win32' ? 'Windows MAX_PATH' : 'system'} limit (${maxLength})`;
		} else if (length > maxLength * 0.8) {
			warning = `Path length (${length}) is approaching the limit (${maxLength}). Consider shortening filename template.`;
		}

		return {
			isValid,
			length,
			maxLength,
			warning
		};
	}

	static calculateSuffixLength(audioLanguages: string[], subtitleLanguages: string[], ccTag: string = 'cc'): number {
		// If no languages are provided, no suffix will be added
		if (audioLanguages.length === 0 && subtitleLanguages.length === 0) {
			return 0;
		}

		// Find the longest language names and codes that will actually be used
		const usedLanguages = [...new Set([...audioLanguages, ...subtitleLanguages])];
		const languageItems = usedLanguages.map((lang) => languages.find((l: any) => l.code === lang || l.locale === lang)).filter(Boolean);

		if (languageItems.length === 0) {
			// Languages were provided but not found in language list - return 0 to avoid aggressive truncation
			// This should not happen in normal operation, but if it does, we don't want to truncate unnecessarily
			return 0;
		}

		const maxLanguageNameLength = Math.max(...languageItems.map((l: any) => (l.language || l.name).length));
		const maxLanguageCodeLength = Math.max(...languageItems.map((l: any) => l.code.length));

		// Audio suffix: .${languageName}.audio.m4s
		const maxAudioSuffixLength = 1 + maxLanguageNameLength + 6 + 4; // . + language + .audio + .m4s

		// Subtitle suffix: .${subIndex}.${languageCode}.${languageName}${ccTag?}.${format}
		const maxSubtitleSuffixLength = 1 + 2 + 1 + maxLanguageCodeLength + 1 + maxLanguageNameLength + 3 + 1 + 3; // .99.${code}.${name}.cc.ass

		// Use the longer of the two, plus some buffer for safety
		return Math.max(maxAudioSuffixLength, maxSubtitleSuffixLength) + 10;
	}

	static exec(
		pname: string,
		fpath: string,
		pargs: string,
		spc = false
	):
		| {
				isOk: true;
		  }
		| {
				isOk: false;
				err: Error & { code: number };
		  } {
		pargs = pargs ? ' ' + pargs : '';
		console.info(`\n> "${pname}"${pargs}${spc ? '\n' : ''}`);
		try {
			if (process.platform === 'win32') {
				childProcess.execSync('& ' + fpath + pargs, { stdio: 'inherit', shell: 'powershell.exe', windowsHide: true });
			} else {
				childProcess.execSync(fpath + pargs, { stdio: 'inherit' });
			}
			return {
				isOk: true
			};
		} catch (er) {
			const err = er as Error & { status: number };
			return {
				isOk: false,
				err: {
					...err,
					code: err.status
				}
			};
		}
	}
}
