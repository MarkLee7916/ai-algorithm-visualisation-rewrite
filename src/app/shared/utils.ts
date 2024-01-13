export function assertDefined<T>(item: T | undefined): T {
    if (item === undefined) {
        throw new Error('Argument is undefined!');
    } else {
        return item;
    }
}

export function assertNonNull<T>(item: T | null): T {
    if (item === null) {
        throw new Error('Argument is null!');
    } else {
        return item;
    }
}

export function deepCopy<T>(item: T): T {
    return JSON.parse(JSON.stringify(item));
}