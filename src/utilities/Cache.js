export const cache = new Map();
let value = 0;


export function getCache() {
    return Array.from(cache.keys())
}
export function addToCache(value) {
    const formattedValue = value.split('=').at(0)
    if(cache.has(formattedValue)) {
        return;
    }
    value++;
    cache.set(formattedValue,value);
    return formattedValue;
}

