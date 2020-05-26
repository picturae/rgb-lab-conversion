# rgb-lab-conversion

Convert rgb values to Lab values the photoshop way.
Currently supported color profiles:
* Adobe RGB (1998),
* eciRGB v2
* Gray Gamma 2.2
* sRGB IEC61966-2.1

## Install

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or just read
and an es-module in the module folder to import.

## Usage

Once included in your setup, the variable rgbLabConversion is available.
To calculate the Lab values:

    let rgbTriplet = [52, 255, 51]
    let iccProfileName = 'AdobeRGB1998'
    let labTriplet = rgbLabConversion.rgb2Lab( rgbTriplet, iccProfileName )

There are also methods for the seperate conversion steps:

    let rgbTriplet = [228, 160, 211]
    let iccProfileName = 'eciRGB_v2'
    let xyzTriplet = rgbLabConversion.rgb2XYZ( rgbTriplet, iccProfileName )
    let labTriplet = rgbLabConversion.XYZ2Lab( xyzTriplet )

In all calculations we start off with unmanaged rgb values. Whitepoint and
conversion matrices are corrected for the D50 illuminant.

iccProfileName is one of:
* 'AdobeRGB1998'
* 'eciRGB_v2'
* 'grayGamma22'
* 'sRGB'

## Demo

Drag and drop
.../rgb-lab-conversion/demo/calculator.html
or
.../rgb-lab-conversion/demo/proof.html
in a browser window
