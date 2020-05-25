import tap from "tap";
import rgbLabConversion from "../src/index.js";

const absoluteDifference = function(found, wanted) {
  return Math.abs(Math.abs(found) - Math.abs(wanted));
};

const toBePlusMin = function(difference, plusMin) {
  return difference <= plusMin;
};

const rgbSpaces = ["eciRGB_v2", "AdobeRGB1998", "sRGB"];
const proofCase = rgbLabConversion.cases.squares;
const MAX_ABS_DEVIATION = 1

rgbSpaces.forEach(space => {
  proofCase.forEach(proofObj => {
    let labArray = rgbLabConversion.rgb2Lab(proofObj.rgb, space);
    labArray.forEach((labI, index) => {
      let absDiff =
        Math.round(absoluteDifference(labI, proofObj[space][index]) * 100) /
        100;
      tap.equal(
        labI,
        toBePlusMin(absDiff, MAX_ABS_DEVIATION) ? labI : proofObj[space][index],
        `lab from rgb ${proofObj.rgb} differs ${absDiff} in ${space}`
      );
    });
  });
});
