import { whitePoint, rgbSpaces } from './data.js'
import { cases } from './cases.js'

const kappa = 24389 / 27 // 903.3
const epsilon = 216 / 24389 // 0.008856

const rgbLabConversion = (function() {
    const inverseSRGB = function(fractionedRGB, iccProfile) {
        // http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
        const inversedSRGB = fractionedRGB.map(channel => {
            if (channel > 0.04045) {
                channel = Math.pow((channel + 0.055) / 1.055, 2.4)
            } else {
                channel = channel / 12.92
            }
            return channel
        })
        return inversedSRGB
    }
    const inverseLx = function(fractionedRGB, iccProfile) {
        // http://www.color.org/chardata/rgb/ecirgb.xalter
        // Inverse eciRGB Companding
        const inversedLx = fractionedRGB.map(channel => {
            if (channel > epsilon) {
                channel = Math.pow((channel + 0.16) / 1.16, 3)
            } else {
                channel = channel / kappa / 100
            }
            return channel
        })
        return inversedLx
    }
    const inverseGamma = function(fractionedRGB, iccProfile) {
        // http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
        // https://www.easyrgb.com/en/math.php
        const inversedGamma = fractionedRGB.map(channel =>
            Math.pow(channel, iccProfile.gamma),
        )
        return inversedGamma
    }

    /**
     * XYZ to Lab conversion with color temperature correction
     * @param {number[]} xyzArray
     * @param {number[]} whitePoint
     * @returns {number[]} labArray
     */
    const XYZ_CIELab = function(xyzArray, whitePoint) {
        const sizedXYZ = xyzArray.map(
            (channel, index) => channel / whitePoint[index] / 100,
        )
        // console.log('L*ab after whitepoint', sizedXYZ)

        const [X, Y, Z] = sizedXYZ.map((channel, index) => {
            if (channel > epsilon) {
                channel = Math.pow(channel, 1 / 3)
            } else {
                channel = 7.787 * channel + 16 / 116
            }
            return channel
        })

        const Lx = 116 * Y - 16
        const ax = 500 * (X - Y)
        const bx = 200 * (Y - Z)
        return [Lx, ax, bx]
    }

    /**
     * RGB to XYZ companding for some icc profiles
     * @param {number[]} rgbArray
     * @param {string} iccProfileName - one of the predefined rgbSpaces
     * @returns {number[]} xyzArray
     */
    const RGB_XYZ_compand = function(rgbArray, iccProfileName) {
        const iccProfile = rgbSpaces[iccProfileName]
        if (!iccProfile || !iccProfile.name) {
            console.error(`unknown iccProfile "${iccProfileName}"`)
            return
        }

        // convert to fractions
        const fractionedRGB = rgbArray.map(channel => channel / 255)

        let inverse
        switch (iccProfile.name) {
            case 'Adobe RGB (1998)':
                inverse = inverseGamma
                break
            case 'eciRGB v2':
                inverse = inverseLx
                break
            case 'Gray Gamma 2.2':
                inverse = inverseGamma
                break
            case 'sRGB IEC61966-2.1':
                inverse = inverseSRGB
                break
            default:
                console.error(`unsupported iccProfile "${iccProfile.name}"`)
                return
        }
        const inversedRGB = inverse(fractionedRGB, iccProfile)

        // console.log('XYZ before whitepoint', inversedRGB)
        const X =
            inversedRGB[0] * 100 * iccProfile.matrix.D50.X.red +
            inversedRGB[1] * 100 * iccProfile.matrix.D50.X.green +
            inversedRGB[2] * 100 * iccProfile.matrix.D50.X.blue
        const Y =
            inversedRGB[0] * 100 * iccProfile.matrix.D50.Y.red +
            inversedRGB[1] * 100 * iccProfile.matrix.D50.Y.green +
            inversedRGB[2] * 100 * iccProfile.matrix.D50.Y.blue
        const Z =
            inversedRGB[0] * 100 * iccProfile.matrix.D50.Z.red +
            inversedRGB[1] * 100 * iccProfile.matrix.D50.Z.green +
            inversedRGB[2] * 100 * iccProfile.matrix.D50.Z.blue
        return [X, Y, Z]
    }

    /**
     * XYZ to L*ab conversion like photoshop does
     * @param {number[]} xyzArray
     * @returns {number[]} labArray
     */
    const XYZ_Lab = function(xyzArray) {
        // photoshop shows lab values with D50
        return XYZ_CIELab(xyzArray, whitePoint.D50)
    }

    return {
        rgb2XYZ: RGB_XYZ_compand,
        XYZ2Lab: XYZ_Lab,
        rgb2Lab: function(rgbArray, iccProfileName) {
            const xyzArray = RGB_XYZ_compand(rgbArray, iccProfileName)
            if (!xyzArray) return
            const labArray = XYZ_CIELab(xyzArray, whitePoint.D50)
            return labArray
        },
        cases: cases,
    }
})()

export default rgbLabConversion
