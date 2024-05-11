export const cache = new Map();
let value = 0;

/**
 * Function that allows array mapping for the cache.
 * @returns array that displays all the cached keys
 */
export function getCache() {
    return Array.from(cache.keys())
}
/**
 * Function that adds trackID's to the cache.
 * @param {*} value of trackID to add to cache
 * @returns the current position for reference
 */
export function addToCache(value) {
    const formattedValue = value.split('=').at(0)
    if(cache.has(formattedValue)) {
        return;
    }
    value++;
    cache.set(formattedValue,value);
    return formattedValue;
}

