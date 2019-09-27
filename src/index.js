import {
  whitePoint,
  rgbSpaces,
  rgb2LabStandard,
} from './data.js'

const rgbLabConversion = (function (){

  const invS_RGB_XYZ = function (rgbArray, iccProfile) {
    // Inverse sRGB Companding
    var red = ( rgbArray[0] / 255 )
    var green = ( rgbArray[1] / 255 )
    var blue = ( rgbArray[2] / 255 )

    if ( red > 0.04045 ) {
      red = Math.pow( ( ( red + 0.055 ) / 1.055 ), 2.4 )
    } else {
      red = red / 12.92
    }
    if ( green > 0.04045 ) {
      green = Math.pow( ( ( green + 0.055 ) / 1.055 ), 2.4 )
    } else {
      green = green / 12.92
    }
    if ( blue > 0.04045 ) {
      blue = Math.pow( ( ( blue + 0.055 ) / 1.055 ), 2.4 )
    } else {
      blue = blue / 12.92
    }

    red = red * 100
    green = green * 100
    blue = blue * 100

    var X = red * iccProfile.matrix.D50.X.red + green * iccProfile.matrix.D50.X.green + blue * iccProfile.matrix.D50.X.blue
    var Y = red * iccProfile.matrix.D50.Y.red + green * iccProfile.matrix.D50.Y.green + blue * iccProfile.matrix.D50.Y.blue
    var Z = red * iccProfile.matrix.D50.Z.red + green * iccProfile.matrix.D50.Z.green + blue * iccProfile.matrix.D50.Z.blue
    return [ X, Y, Z ]
  }

  const invGamma_RGB_XYZ = function (rgbArray, iccProfile) {
    // Inverse Gamma Companding
    var red = ( rgbArray[0] / 255 )
    var green = ( rgbArray[1] / 255 )
    var blue = ( rgbArray[2] / 255 )

    red = Math.pow( red, iccProfile.gamma )
    green = Math.pow( green, iccProfile.gamma )
    blue = Math.pow( blue, iccProfile.gamma )

    red = red * 100
    green = green * 100
    blue = blue * 100

    var X = red * iccProfile.matrix.D50.X.red + green * iccProfile.matrix.D50.X.green + blue * iccProfile.matrix.D50.X.blue
    var Y = red * iccProfile.matrix.D50.Y.red + green * iccProfile.matrix.D50.Y.green + blue * iccProfile.matrix.D50.Y.blue
    var Z = red * iccProfile.matrix.D50.Z.red + green * iccProfile.matrix.D50.Z.green + blue * iccProfile.matrix.D50.Z.blue
    return [ X, Y, Z ]
  }

  const XYZ_CIELab = function ( xyzArray, whitePoint) {

    var X = ( xyzArray[0] / whitePoint[0] / 100 )
    var Y = ( xyzArray[1] / whitePoint[1] / 100 )
    var Z = ( xyzArray[2] / whitePoint[2] / 100 )

    if ( X > 0.008856 ) X = Math.pow( X , ( 1/3 ) )
    else                    X = ( 7.787 * X ) + ( 16 / 116 )
    if ( Y > 0.008856 ) Y = Math.pow( Y , ( 1/3 ) )
    else                    Y = ( 7.787 * Y ) + ( 16 / 116 )
    if ( Z > 0.008856 ) Z = Math.pow( Z , ( 1/3 ) )
    else                    Z = ( 7.787 * Z ) + ( 16 / 116 )

    var Lx = ( 116 * Y ) - 16
    var ax = 500 * ( X - Y )
    var bx = 200 * ( Y - Z )
    return [ Lx, ax, bx ]
  }

  const RGB_XYZ = function ( rgbArray, iccProfileName ) {
    var RGB_XYZ_function = invGamma_RGB_XYZ
    if ( iccProfileName === 'eciRGB_v2') {
      RGB_XYZ_function = invS_RGB_XYZ // mss via een andere functie
    }
    return RGB_XYZ_function ( rgbArray, rgbSpaces[iccProfileName] )
  }

  const XYZ_Lab = function ( xyzArray ) {
    return XYZ_CIELab ( xyzArray, whitePoint.D50 )
  }

  return {
    RGB_XYZ: RGB_XYZ,
    XYZ_Lab: XYZ_Lab,
    RGB_Lab: function ( rgbArray, iccProfileName ) {
      var xyzArray = RGB_XYZ ( rgbArray, iccProfileName )
      var labArray = XYZ_CIELab ( xyzArray, whitePoint.D50 )
      return labArray
    },
    rgb2LabStandard: rgb2LabStandard,
  }
})()

export default rgbLabConversion
