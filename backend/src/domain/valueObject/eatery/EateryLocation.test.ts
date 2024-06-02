import EateryLocation from './EateryLocation';

describe('EateryLocation', () => {
    // * Normal
    test('Normal test', () => {
        expect(new EateryLocation([49.5, 32.4444]).value).toStrictEqual([49.5, 32.4444]);
        expect(new EateryLocation([-32.1, -179.5]).value).toStrictEqual([-32.1, -179.5]);
    });

    test('Equals test of EateryLocation', () => {
        const EateryLocation1 = new EateryLocation([32, 35]);
        const EateryLocation2 = new EateryLocation([32, 35]);
        const EateryLocation3 = new EateryLocation([89.5, 78]);
        expect(EateryLocation1.equals(EateryLocation2)).toBeTruthy();
        expect(EateryLocation1.equals(EateryLocation3)).toBeFalsy();
    });

    // * Abnormal
    test('Abnormal test. Throw Error when abnormal EateryLocation.', () => {
        expect(() => new EateryLocation([-190, 170.8989])).toThrow('The LONGITUDE is not correct.');
        expect(() => new EateryLocation([77.8989, 200.0])).toThrow('The LATITUDE is not correct.');
        expect(() => new EateryLocation([-90.1, 180.1])).toThrow('The LONGITUDE is not correct.');
    });
});
