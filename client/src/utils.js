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