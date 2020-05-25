const whitePoint = {
    D50: [0.96422, 1, 0.82521],
    D65: [0.95047, 1, 1.08883],
}

const rgbSpaces = {
    AdobeRGB1998: {
        name: 'Adobe RGB (1998)',
        gamma: 2.19921875,
        matrix: {
            D50: {
                X: { red: 0.6097559, green: 0.2052401, blue: 0.149224 },
                Y: { red: 0.3111242, green: 0.625656, blue: 0.0632197 },
                Z: { red: 0.0194811, green: 0.0608902, blue: 0.7448387 },
            },
            D65: {
                X: { red: 0.5767309, green: 0.185554, blue: 0.1881852 },
                Y: { red: 0.2973769, green: 0.6273491, blue: 0.0752741 },
                Z: { red: 0.0270343, green: 0.0706872, blue: 0.9911085 },
            },
        },
        whitepoint: 'D65',
    },
    eciRGB_v2: {
        name: 'eciRGB v2',
        gamma: 1.8,
        matrix: {
            D50: {
                X: { red: 0.6502043, green: 0.1780774, blue: 0.1359384 },
                Y: { red: 0.3202499, green: 0.6020711, blue: 0.0776791 },
                Z: { red: 0.0, green: 0.067839, blue: 0.757371 },
            },
            D65: {
                X: { red: 0.67, green: 0.21, blue: 0.14 },
                Y: { red: 0.33, green: 0.71, blue: 0.08 },
                Z: { red: 0, green: 0.08, blue: 0.78 },
            },
        },
        whitepoint: 'D50',
    },
    grayGamma22: {
        // based on AdobeRGB1998
        name: 'Gray Gamma 2.2',
        gamma: 2.19921875,
        matrix: {
            D50: {
                X: {
                    red: 0.3111242 * whitePoint.D50[0],
                    green: 0.625656 * whitePoint.D50[0],
                    blue: 0.0632197 * whitePoint.D50[0],
                },
                Y: { red: 0.3111242, green: 0.625656, blue: 0.0632197 },
                Z: {
                    red: 0.3111242 * whitePoint.D50[2],
                    green: 0.625656 * whitePoint.D50[2],
                    blue: 0.0632197 * whitePoint.D50[2],
                },
            },
            D65: {
                X: {
                    red: 0.2973769 * whitePoint.D65[0],
                    green: 0.6273491 * whitePoint.D65[0],
                    blue: 0.0752741 * whitePoint.D65[0],
                },
                Y: { red: 0.2973769, green: 0.6273491, blue: 0.0752741 },
                Z: {
                    red: 0.2973769 * whitePoint.D65[2],
                    green: 0.6273491 * whitePoint.D65[2],
                    blue: 0.0752741 * whitePoint.D65[2],
                },
            },
        },
        whitepoint: 'D65',
    },
    sRGB: {
        name: 'sRGB IEC61966-2.1',
        gamma: -2.2,
        matrix: {
            D50: {
                X: { red: 0.4360747, green: 0.3850649, blue: 0.1430804 },
                Y: { red: 0.2225045, green: 0.7168786, blue: 0.0606169 },
                Z: { red: 0.0139322, green: 0.0971045, blue: 0.7141733 },
            },
            D65: {
                X: { red: 0.4124564, green: 0.3575761, blue: 0.1804375 },
                Y: { red: 0.2126729, green: 0.7151522, blue: 0.072175 },
                Z: { red: 0.0193339, green: 0.119192, blue: 0.9503041 },
            },
        },
        whitepoint: 'D65',
    },
}

export { whitePoint, rgbSpaces }
