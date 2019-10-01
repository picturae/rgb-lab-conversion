# rgb-lab-conversion

Convert rgb values to Lab values the photoshop way.
Currently eciRGB v2 and AdobeRGB (1998) are supported.

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

In order to get unmanaged rgb values from the browser, the browser may not
use color management.
In firefox you can surf to about:config and set gfx.color_management.mode to 0.
