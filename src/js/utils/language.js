import { invert } from 'utils/underscore';
import { ajax } from 'utils/ajax';

/**
 * A map of 2-letter language codes (ISO 639-1) to language name in English
 */
const codeToLang = {
    zh: 'Chinese',
    nl: 'Dutch',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    pt: 'Portuguese',
    ru: 'Russian',
    es: 'Spanish',
    el: 'Greek',
};

const langToCode = invert(codeToLang);

export function getLabel(language) {
    if (!language) {
        return;
    }

    // We do not map ISO 639-2 (3-letter codes)
    if (language.length === 3) {
        return language;
    }

    return codeToLang[language.substr(0, 2)] || language;
}

export function getCode(language) {
    return langToCode[language] || '';
}

export const translatedLanguageCodes = ['la'];

export function isTranslationAvailable(language) {
    return translatedLanguageCodes.indexOf(language.substring(0, 2).toLowerCase()) >= 0;
}

export function loadJsonTranslation(base, languageCode, oncomplete, onerror) {
    const url = base + 'translations/' + languageCode + '.json';
    ajax({ url, oncomplete, onerror, otherOptions: { responseType: 'json' } });
}
