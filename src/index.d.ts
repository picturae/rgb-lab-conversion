declare namespace rgbLabConversion {
    export function rgb2XYZ(rgbArray: number[], iccProfileName: string): number[];
    export function XYZ2Lab(xyzArray: any): number[];
    export function rgb2Lab(rgbArray: any, iccProfileName: any): number[];
}
export default rgbLabConversion;
