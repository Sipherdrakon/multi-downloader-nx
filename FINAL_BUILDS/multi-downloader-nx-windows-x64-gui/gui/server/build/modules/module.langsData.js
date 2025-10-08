"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subsFile = exports.sortTags = exports.sortSubtitles = exports.parseSubtitlesArray = exports.parseRssSubtitlesString = exports.fixAndFindCrLC = exports.findLang = exports.fixLanguageTag = exports.searchLocales = exports.subtitleLanguagesFilter = exports.dubRegExp = exports.locale2language = exports.langCode2name = exports.dubLanguages = exports.dubLanguageCodes = exports.languages = exports.aoSearchLocales = void 0;
// available langs
var path = __importStar(require("path"));
var languages = [
    { locale: 'un', code: 'und', name: 'Undetermined', language: 'Undetermined', new_hd_locale: 'und', cr_locale: 'und', adn_locale: 'und', ao_locale: 'und' },
    { cr_locale: 'en-US', new_hd_locale: 'en-US', hd_locale: 'English', locale: 'en', code: 'eng', name: 'English' },
    { cr_locale: 'en-IN', locale: 'en-IN', code: 'eng', name: 'English (India)', },
    { cr_locale: 'es-LA', new_hd_locale: 'es-MX', hd_locale: 'Spanish LatAm', locale: 'es-419', code: 'spa', name: 'Spanish', language: 'Latin American Spanish' },
    { cr_locale: 'es-419', ao_locale: 'es', hd_locale: 'Spanish', locale: 'es-419', code: 'spa-419', name: 'Spanish', language: 'Latin American Spanish' },
    { cr_locale: 'es-ES', new_hd_locale: 'es-ES', hd_locale: 'Spanish Europe', locale: 'es-ES', code: 'spa-ES', name: 'Castilian', language: 'European Spanish' },
    { cr_locale: 'pt-BR', ao_locale: 'pt', new_hd_locale: 'pt-BR', hd_locale: 'Portuguese', locale: 'pt-BR', code: 'por', name: 'Portuguese', language: 'Brazilian Portuguese' },
    { cr_locale: 'pt-PT', locale: 'pt-PT', code: 'por', name: 'Portuguese (Portugal)', language: 'Portugues (Portugal)' },
    { cr_locale: 'fr-FR', adn_locale: 'fr', hd_locale: 'French', locale: 'fr', code: 'fra', name: 'French' },
    { cr_locale: 'de-DE', adn_locale: 'de', hd_locale: 'German', locale: 'de', code: 'deu', name: 'German' },
    { cr_locale: 'ar-ME', locale: 'ar', code: 'ara-ME', name: 'Arabic' },
    { cr_locale: 'ar-SA', hd_locale: 'Arabic', locale: 'ar', code: 'ara', name: 'Arabic (Saudi Arabia)' },
    { cr_locale: 'it-IT', hd_locale: 'Italian', locale: 'it', code: 'ita', name: 'Italian' },
    { cr_locale: 'ru-RU', hd_locale: 'Russian', locale: 'ru', code: 'rus', name: 'Russian' },
    { cr_locale: 'tr-TR', hd_locale: 'Turkish', locale: 'tr', code: 'tur', name: 'Turkish' },
    { cr_locale: 'hi-IN', locale: 'hi', code: 'hin', name: 'Hindi' },
    { locale: 'zh', code: 'cmn', name: 'Chinese (Mandarin, PRC)' },
    { cr_locale: 'zh-CN', locale: 'zh-CN', code: 'zho', name: 'Chinese (Mainland China)' },
    { cr_locale: 'zh-TW', locale: 'zh-TW', code: 'chi', name: 'Chinese (Taiwan)' },
    { cr_locale: 'zh-HK', locale: 'zh-HK', code: 'zh-HK', name: 'Chinese (Hong-Kong)', language: '中文 (粵語)' },
    { cr_locale: 'ko-KR', hd_locale: 'Korean', locale: 'ko', code: 'kor', name: 'Korean' },
    { cr_locale: 'ca-ES', locale: 'ca-ES', code: 'cat', name: 'Catalan' },
    { cr_locale: 'pl-PL', locale: 'pl-PL', code: 'pol', name: 'Polish' },
    { cr_locale: 'th-TH', locale: 'th-TH', code: 'tha', name: 'Thai', language: 'ไทย' },
    { cr_locale: 'ta-IN', locale: 'ta-IN', code: 'tam', name: 'Tamil (India)', language: 'தமிழ்' },
    { cr_locale: 'ms-MY', locale: 'ms-MY', code: 'may', name: 'Malay (Malaysia)', language: 'Bahasa Melayu' },
    { cr_locale: 'vi-VN', locale: 'vi-VN', code: 'vie', name: 'Vietnamese', language: 'Tiếng Việt' },
    { cr_locale: 'id-ID', locale: 'id-ID', code: 'ind', name: 'Indonesian', language: 'Bahasa Indonesia' },
    { cr_locale: 'te-IN', locale: 'te-IN', code: 'tel', name: 'Telugu (India)', language: 'తెలుగు' },
    { cr_locale: 'ja-JP', adn_locale: 'ja', ao_locale: 'ja', hd_locale: 'Japanese', locale: 'ja', code: 'jpn', name: 'Japanese' },
];
exports.languages = languages;
// add en language names
(function () {
    for (var languageIndex in languages) {
        if (!languages[languageIndex].language) {
            languages[languageIndex].language = languages[languageIndex].name;
        }
    }
})();
// construct dub language codes
var dubLanguageCodes = (function () {
    var e_1, _a;
    var dubLanguageCodesArray = [];
    try {
        for (var languages_1 = __values(languages), languages_1_1 = languages_1.next(); !languages_1_1.done; languages_1_1 = languages_1.next()) {
            var language = languages_1_1.value;
            dubLanguageCodesArray.push(language.code);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (languages_1_1 && !languages_1_1.done && (_a = languages_1.return)) _a.call(languages_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return __spreadArray([], __read(new Set(dubLanguageCodesArray)), false);
})();
exports.dubLanguageCodes = dubLanguageCodes;
// construct subtitle languages filter
var subtitleLanguagesFilter = (function () {
    var subtitleLanguagesExtraParameters = ['all', 'none'];
    return __spreadArray(__spreadArray([], __read(subtitleLanguagesExtraParameters), false), __read(new Set(languages.map(function (l) { return l.locale; }))), false);
})();
exports.subtitleLanguagesFilter = subtitleLanguagesFilter;
var searchLocales = (function () {
    return __spreadArray(__spreadArray([''], __read(new Set(languages.map(function (l) { return l.cr_locale; }).slice(0, -1))), false), __read(new Set(languages.map(function (l) { return l.adn_locale; }).slice(0, -1))), false);
})();
exports.searchLocales = searchLocales;
exports.aoSearchLocales = (function () {
    return __spreadArray([''], __read(new Set(languages.map(function (l) { return l.ao_locale; }).slice(0, -1))), false);
})();
// convert
var fixLanguageTag = function (tag) {
    tag = typeof tag == 'string' ? tag : 'und';
    var tagLangLC = tag.match(/^(\w{2})-?(\w{2})$/);
    if (tagLangLC) {
        var tagLang = "".concat(tagLangLC[1], "-").concat(tagLangLC[2].toUpperCase());
        if (findLang(tagLang).cr_locale != 'und') {
            return findLang(tagLang).cr_locale;
        }
        else {
            return tagLang;
        }
    }
    else {
        return tag;
    }
};
exports.fixLanguageTag = fixLanguageTag;
// find lang by cr_locale
var findLang = function (cr_locale) {
    var lang = languages.find(function (l) { return l.cr_locale == cr_locale; });
    return lang ? lang : languages.find(function (l) { return l.code === 'und'; }) || { cr_locale: 'und', locale: 'un', code: 'und', name: 'Undetermined', language: 'Undetermined' };
};
exports.findLang = findLang;
var fixAndFindCrLC = function (cr_locale) {
    var str = fixLanguageTag(cr_locale);
    return findLang(str || '');
};
exports.fixAndFindCrLC = fixAndFindCrLC;
// rss subs lang parser
var parseRssSubtitlesString = function (subs) {
    var splitMap = subs.replace(/\s/g, '').split(',').map(function (s) {
        return fixAndFindCrLC(s).locale;
    });
    var sort = sortTags(splitMap);
    return sort.join(', ');
};
exports.parseRssSubtitlesString = parseRssSubtitlesString;
// parse subtitles Array
var parseSubtitlesArray = function (tags) {
    var sort = sortSubtitles(tags.map(function (t) {
        return { locale: fixAndFindCrLC(t).locale };
    }));
    return sort.map(function (t) { return t.locale; }).join(', ');
};
exports.parseSubtitlesArray = parseSubtitlesArray;
// sort subtitles
var sortSubtitles = function (data, sortkey) {
    var e_2, _a;
    var idx = {};
    var key = sortkey || 'locale';
    var tags = __spreadArray([], __read(new Set(Object.values(languages).map(function (e) { return e.locale; }))), false);
    try {
        for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
            var l = tags_1_1.value;
            idx[l] = Object.keys(idx).length + 1;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    data.sort(function (a, b) {
        var ia = idx[a[key]] ? idx[a[key]] : 50;
        var ib = idx[b[key]] ? idx[b[key]] : 50;
        return ia - ib;
    });
    return data;
};
exports.sortSubtitles = sortSubtitles;
var sortTags = function (data) {
    var retData = data.map(function (e) { return { locale: e }; });
    var sort = sortSubtitles(retData);
    return sort.map(function (e) { return e.locale; });
};
exports.sortTags = sortTags;
var subsFile = function (fnOutput, subsIndex, langItem, isCC, ccTag, isSigns, format) {
    subsIndex = (parseInt(subsIndex) + 1).toString().padStart(2, '0');
    var suffix = ".".concat(subsIndex, ".").concat(langItem.code, ".").concat(langItem.language).concat(isCC ? ".".concat(ccTag) : '').concat(isSigns ? '.signs' : '', ".").concat(format ? format : 'ass');
    // Check if the full subtitle filename would exceed path limits
    var fullSubtitlePath = "".concat(fnOutput).concat(suffix);
    var maxLength = process.platform === 'win32' ? 260 : 4096;
    if (fullSubtitlePath.length > maxLength) {
        // Split path into directory and filename parts
        var pathParts = fnOutput.split(/[/\\]/);
        var filename = pathParts[pathParts.length - 1];
        var directory = pathParts.slice(0, -1).join('/');
        // Calculate available space for the filename part
        var directoryLength = directory.length + (directory ? 1 : 0); // +1 for path separator
        var availableSpace = maxLength - directoryLength - suffix.length - 3; // -3 for "..."
        if (availableSpace > 10) {
            var lastDotIndex = filename.lastIndexOf('.');
            if (lastDotIndex > 0) {
                var nameWithoutExt = filename.substring(0, lastDotIndex);
                var extension = filename.substring(lastDotIndex);
                var truncatedName = nameWithoutExt.substring(0, Math.max(0, availableSpace - extension.length)) + '...';
                var newFilename = "".concat(truncatedName).concat(extension).concat(suffix);
                var result = directory ? "".concat(directory).concat(path.sep).concat(newFilename) : newFilename;
                return result;
            }
            else {
                var truncatedName = filename.substring(0, Math.max(0, availableSpace)) + '...';
                var newFilename = "".concat(truncatedName).concat(suffix);
                var result = directory ? "".concat(directory).concat(path.sep).concat(newFilename) : newFilename;
                return result;
            }
        }
        else {
            // Not enough space, use a simple fallback
            var fallbackFilename = "subtitle.".concat(subsIndex, ".").concat(langItem.code, ".").concat(format ? format : 'ass');
            var result = directory ? "".concat(directory, "/").concat(fallbackFilename) : fallbackFilename;
            return result;
        }
    }
    return fullSubtitlePath;
};
exports.subsFile = subsFile;
// construct dub langs const
var dubLanguages = (function () {
    var e_3, _a;
    var dubDb = {};
    try {
        for (var languages_2 = __values(languages), languages_2_1 = languages_2.next(); !languages_2_1.done; languages_2_1 = languages_2.next()) {
            var lang = languages_2_1.value;
            if (!Object.keys(dubDb).includes(lang.name)) {
                dubDb[lang.name] = lang.code;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (languages_2_1 && !languages_2_1.done && (_a = languages_2.return)) _a.call(languages_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return dubDb;
})();
exports.dubLanguages = dubLanguages;
// dub regex
var dubRegExpStr = "\\((".concat(Object.keys(dubLanguages).join('|'), ")(?: (Dub|VO))?\\)$");
var dubRegExp = new RegExp(dubRegExpStr);
exports.dubRegExp = dubRegExp;
// code to lang name
var langCode2name = function (code) {
    var codeIdx = dubLanguageCodes.indexOf(code);
    return Object.keys(dubLanguages)[codeIdx];
};
exports.langCode2name = langCode2name;
// locale to lang name
var locale2language = function (locale) {
    var filteredLocale = languages.filter(function (l) {
        return l.locale == locale;
    });
    return filteredLocale[0];
};
exports.locale2language = locale2language;
