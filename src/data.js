
const whitePoint = {
  D50: [0.96422, 1, 0.82521],
  D65: [0.95047, 1, 1.08883],
}

const rgbSpaces = {
  AdobeRGB1998: {
    gamma: 2.19921875,
    matrix: {
      D50: {
        X: {red: 0.6097559, green: 0.2052401, blue: 0.1492240},
        Y: {red: 0.3111242, green: 0.6256560, blue: 0.0632197},
        Z: {red: 0.0194811, green: 0.0608902, blue: 0.7448387},
      },
      D65: {
        X: {red: 0.5767309, green: 0.1855540, blue: 0.1881852},
        Y: {red: 0.2973769, green: 0.6273491, blue: 0.0752741},
        Z: {red: 0.0270343, green: 0.0706872, blue: 0.9911085},
      },
    },
    whitepoint: 'D65',
  },
  eciRGB_v2: {
    gamma: 1.8,
    matrix: {
      D50: {
        X: {red: 0.6502043, green: 0.1780774, blue: 0.1359384},
        Y: {red: 0.3202499, green: 0.6020711, blue: 0.0776791},
        Z: {red: 0.0000000, green: 0.0678390, blue: 0.7573710},
      },
      D65: {
        X: {red: 0.67, green: 0.21, blue: 0.14},
        Y: {red: 0.33, green: 0.71, blue: 0.08},
        Z: {red: 0, green: 0.08, blue: 0.78},
      },
    },
    whitepoint: 'D50',
  },
  sRGB: {
    gamma: -2.2,
    matrix: {
      D50: {
        X: {red: 0.4360747, green: 0.3850649, blue: 0.1430804},
        Y: {red: 0.2225045, green: 0.7168786, blue: 0.0606169},
        Z: {red: 0.0139322, green: 0.0971045, blue: 0.7141733},
      },
      D65: {
        X: {red: 0.4124564, green: 0.3575761, blue: 0.1804375},
        Y: {red: 0.2126729, green: 0.7151522, blue: 0.0721750},
        Z: {red: 0.0193339, green: 0.1191920, blue: 0.9503041},
      },
    },
    whitepoint: 'D65',
  },
}

const rgb2LabStandard = [
  { rgb: [51,51,51], eciRGB_v2: [20,0,0], AdobeRGB1998: [20,0,0] },
  { rgb: [204,204,204], eciRGB_v2: [80,0,0], AdobeRGB1998: [83,0,0], },
  { rgb: [154,51,52], eciRGB_v2: [40,53,34], AdobeRGB1998: [42,53,33], },

  { rgb: [153,51,153], eciRGB_v2: [43,55,-26], AdobeRGB1998: [44,60,-31], },
  { rgb: [255,255,51], eciRGB_v2: [97,-11,99], AdobeRGB1998: [98,-16,96], },
  { rgb: [255,102,52], eciRGB_v2: [69,78,79], AdobeRGB1998: [69,69,68], },

  { rgb: [50,51,255], eciRGB_v2: [39,39,-100], AdobeRGB1998: [36,57,-104], },
  { rgb: [52,255,51], eciRGB_v2: [83,-128,74], AdobeRGB1998: [84,-121,79], },
  { rgb: [255,51,52], eciRGB_v2: [65,91,77], AdobeRGB1998: [64,86,63], },
]

export {
  whitePoint,
  rgbSpaces,
  rgb2LabStandard,
}
