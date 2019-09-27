import tap from 'tap'
import rgbLabConversion from '../src/index.js'


const toBePlusMin = function (found, wanted, plusMin ) {
  let diff = Math.abs( Math.abs(found) - Math.abs(wanted) )
  return ( diff <= plusMin ) ? found : false
}

const rgbSpaces = [
  'eciRGB_v2',
  'AdobeRGB1998',
]

rgbSpaces.forEach(space => {
  rgbLabConversion.rgb2LabStandard.forEach(proofObj => {
    let labArray = rgbLabConversion.RGB_Lab(proofObj.rgb, space)
    labArray.forEach( ( labI, index ) => {
      tap.equal( labI, toBePlusMin( labI, proofObj[space][index], 3 ) )
    })
  })
})
