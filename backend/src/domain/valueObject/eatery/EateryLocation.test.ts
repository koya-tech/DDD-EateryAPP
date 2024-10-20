import EateryLocation from './EateryLocation';

describe('EateryLocation', () => {
    // * Normal
    test('Normal test', () => {
        expect(new EateryLocation([32.4444, 49.5]).value).toStrictEqual([32.4444, 49.5]);
        expect(new EateryLocation([-179.5, -32.1]).value).toStrictEqual([-179.5, -32.1]);
    });

    test('Equals test of EateryLocation', () => {
        const EateryLocation1 = new EateryLocation([35, 32]);
        const EateryLocation2 = new EateryLocation([35, 32]);
        const EateryLocation3 = new EateryLocation([78, 89.5]);
        expect(EateryLocation1.equals(EateryLocation2)).toBeTruthy();
        expect(EateryLocation1.equals(EateryLocation3)).toBeFalsy();
    });

    // * Abnormal
    test('Abnormal test. Throw Error when abnormal EateryLocation.', () => {
        expect(() => new EateryLocation([170.8989, -170])).toThrow('The LATITUDE is not correct.');
        expect(() => new EateryLocation([277.8989, 77.7])).toThrow('The LONGITUDE is not correct.');
        expect(() => new EateryLocation([180.1, -90.1])).toThrow('The LONGITUDE is not correct.');
    });
});
