/**
 * Helper for parsing form data
 * @param e
 */

export const parse = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1]
    }

    return data;
};

/**
 * Capitalize first letter of a string
 * @param str
 * @returns {string}
 */

export const capitalize = str => {
    if (typeof str !== 'string') {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
};

/**
 * Returns acronym of words
 * @param str
 * @returns {string}
 */

export const acronym = (str = '') => {
    return (str.match(/\b\w/g) || []).join('');
};

/**
 * Returns given parsed query string
 * @param string
 * @returns {string}
 */

export const parseQs = (string) => {
    let query = string.substring(1);
    let vars = query.split('&');
    let parsed = {};

    for (let i = 0, len = vars.length; i < len; i++) {
        let pair = vars[i].split('=');
        parsed[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return parsed;
};