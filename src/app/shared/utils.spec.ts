import { assertDefined, assertNonNull } from "./utils";

describe('assertDefined', () => {
    it('throws when undefined', () => {
        expect(() => assertDefined(undefined)).toThrowError(
            'Argument is undefined!'
        );
    });

    it('returns same result when defined', () => {
        expect(assertDefined('0')).toBe('0');
        expect(assertDefined(1)).toBe(1);
        expect(assertDefined(null)).toBe(null);
    });
});

describe('assertNonNull', () => {
    it('throws when null', () => {
        expect(() => assertNonNull(null)).toThrowError('Argument is null!');
    });

    it('returns same result when non null', () => {
        expect(assertNonNull('0')).toBe('0');
        expect(assertNonNull(1)).toBe(1);
        expect(assertNonNull(undefined)).toBe(undefined);
    });
});