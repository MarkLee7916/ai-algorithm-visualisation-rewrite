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

export function range(lower: number, upper: number): number[] {
    const seq = [];

    for (let item = lower; item < upper; item++) {
        seq.push(item);
    }

    return seq;
}

export function isOdd(num: number): boolean {
    return num % 2 === 0;
}

export function randomIntBetween(lower: number, upper: number): number {
    return Math.round(Math.floor(Math.random() * (upper - lower)) + lower);
}