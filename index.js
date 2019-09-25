
var whitePoint = {
	D50: [0.96422, 1, 0.82521],
	D65: [0.95047, 1, 1.08883],
}

var rgbSpace = {
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

var invS_RGB_XYZ = function (rgbArray, iccProfile) {
	// Inverse sRGB Companding
	//sR, sG and sB (Standard RGB) input range = 0 ÷ 255
	//X, Y and Z output refer to a D65/2° standard illuminant.
	var red = ( rgbArray[0] / 255 )
	var green = ( rgbArray[1] / 255 )
	var blue = ( rgbArray[2] / 255 )

	if ( red > 0.04045 ) red = Math.pow( ( ( red + 0.055 ) / 1.055 ), 2.4 )
	else                   red = red / 12.92
	if ( green > 0.04045 ) green = Math.pow( ( ( green + 0.055 ) / 1.055 ), 2.4 )
	else                   green = green / 12.92
	if ( blue > 0.04045 ) blue = Math.pow( ( ( blue + 0.055 ) / 1.055 ), 2.4 )
	else                   blue = blue / 12.92

	red = red * 100
	green = green * 100
	blue = blue * 100

	var X = red * iccProfile.matrix.D50.X.red + green * iccProfile.matrix.D50.X.green + blue * iccProfile.matrix.D50.X.blue
	var Y = red * iccProfile.matrix.D50.Y.red + green * iccProfile.matrix.D50.Y.green + blue * iccProfile.matrix.D50.Y.blue
	var Z = red * iccProfile.matrix.D50.Z.red + green * iccProfile.matrix.D50.Z.green + blue * iccProfile.matrix.D50.Z.blue
	return [ X, Y, Z ]
}

var invGamma_RGB_XYZ = function (rgbArray, iccProfile) {
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

var RGB_XYZ = function ( rgbArray, iccProfileName ) {
  var RGB_XYZ_function = invGamma_RGB_XYZ
	if ( iccProfileName === 'eciRGB_v2') {
		RGB_XYZ_function = invS_RGB_XYZ // mss via een andere functie
	}
  return RGB_XYZ_function ( rgbArray, rgbSpace[iccProfileName] )
}

var XYZ_CIELab = function ( xyzArray, whitePoint) {

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

var XYZ_Lab = function ( xyzArray ) {
  return XYZ_CIELab ( xyzArray, whitePoint.D50 )
}

var RGB_Lab = function ( rgbArray, iccProfileName ) {
  var xyzArray = RGB_XYZ ( rgbArray, iccProfileName )
  return XYZ_CIELab ( xyzArray, whitePoint.D50 )
}
