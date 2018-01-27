export function removeDuplicates(arr) {
    let seen = {};
    return arr.filter((item) => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}