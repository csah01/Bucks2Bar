/**
 * @param {Object} object - The query object
 * @param {string} path - The path of the attribute to get
 * @param {*} fallback - The default value to return if no value found in path
 * @returns {*} Returns the resolved value (undefined / fallback value / value found).
 */
export default function getNode(object, path, fallback) {
    if (typeof object !== 'object' || object === null || object === undefined) {
        return fallback;
    }

    const segments = path.split('.');
    let current = object;

    for (const segment of segments) {
        if (current[segment] === undefined) {
            return fallback;
        }
        current = current[segment];
    }

    return current;
}