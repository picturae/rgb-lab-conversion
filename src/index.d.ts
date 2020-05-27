declare module 'rgbLabConversion' {

    interface rgbLabMethods {
        rgb2XYZ: (rgbArray: number[], iccProfileName: string) => number[];
        XYZ2Lab: (xyzArray: number[]) => number[];
        rgb2Lab: (rgbArray: number[], iccProfileName: string) => number[];
        cases: object;
    }

    export default function rgbLabConversion(): <rgbLabMethods>;
}
