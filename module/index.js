const e=[.96422,1,.82521],r=[.95047,1,1.08883],a={AdobeRGB1998:{name:"Adobe RGB (1998)",gamma:2.19921875,matrix:{D50:{X:{red:.6097559,green:.2052401,blue:.149224},Y:{red:.3111242,green:.625656,blue:.0632197},Z:{red:.0194811,green:.0608902,blue:.7448387}},D65:{X:{red:.5767309,green:.185554,blue:.1881852},Y:{red:.2973769,green:.6273491,blue:.0752741},Z:{red:.0270343,green:.0706872,blue:.9911085}}},whitepoint:"D65"},eciRGB_v2:{name:"eciRGB v2",gamma:1.8,matrix:{D50:{X:{red:.6502043,green:.1780774,blue:.1359384},Y:{red:.3202499,green:.6020711,blue:.0776791},Z:{red:0,green:.067839,blue:.757371}},D65:{X:{red:.67,green:.21,blue:.14},Y:{red:.33,green:.71,blue:.08},Z:{red:0,green:.08,blue:.78}}},whitepoint:"D50"},grayGamma22:{name:"Gray Gamma 2.2",gamma:2.19921875,matrix:{D50:{X:{red:.3111242*e[0],green:.625656*e[0],blue:.0632197*e[0]},Y:{red:.3111242,green:.625656,blue:.0632197},Z:{red:.3111242*e[2],green:.625656*e[2],blue:.0632197*e[2]}},D65:{X:{red:.2973769*r[0],green:.6273491*r[0],blue:.0752741*r[0]},Y:{red:.2973769,green:.6273491,blue:.0752741},Z:{red:.2973769*r[2],green:.6273491*r[2],blue:.0752741*r[2]}}},whitepoint:"D65"},sRGB:{name:"sRGB IEC61966-2.1",gamma:-2.2,matrix:{D50:{X:{red:.4360747,green:.3850649,blue:.1430804},Y:{red:.2225045,green:.7168786,blue:.0606169},Z:{red:.0139322,green:.0971045,blue:.7141733}},D65:{X:{red:.4124564,green:.3575761,blue:.1804375},Y:{red:.2126729,green:.7151522,blue:.072175},Z:{red:.0193339,green:.119192,blue:.9503041}}},whitepoint:"D65"}},n={squares:[{rgb:[51,51,51],eciRGB_v2:[20,0,0],AdobeRGB1998:[20,0,0],grayGamma22:[20,0,0],sRGB:[21,0,0]},{rgb:[204,204,204],eciRGB_v2:[80,0,0],AdobeRGB1998:[83,0,0],grayGamma22:[83,0,0],sRGB:[82,0,0]},{rgb:[154,51,52],eciRGB_v2:[40,53,34],AdobeRGB1998:[42,53,33],grayGamma22:[42,0,0],sRGB:[37,44,24]},{rgb:[153,51,153],eciRGB_v2:[43,55,-26],AdobeRGB1998:[44,60,-31],grayGamma22:[44,0,0],sRGB:[40,52,-35]},{rgb:[255,255,51],eciRGB_v2:[97,-11,99],AdobeRGB1998:[98,-16,96],grayGamma22:[98,0,0],sRGB:[98,-15,87]},{rgb:[255,102,52],eciRGB_v2:[69,78,79],AdobeRGB1998:[69,69,68],grayGamma22:[69,0,0],sRGB:[63,58,58]},{rgb:[50,51,255],eciRGB_v2:[39,39,-100],AdobeRGB1998:[36,57,-104],grayGamma22:[36,0,0],sRGB:[36,55,-101]},{rgb:[52,255,51],eciRGB_v2:[83,-128,74],AdobeRGB1998:[84,-121,79],grayGamma22:[84,0,0],sRGB:[88,-75,74]},{rgb:[255,51,52],eciRGB_v2:[65,91,77],AdobeRGB1998:[64,86,63],grayGamma22:[64,0,0],sRGB:[57,75,52]}]},m=function(){const r=function(e,r){return e.map(e=>(e>.04045?e=Math.pow((e+.055)/1.055,2.4):e/=12.92,e))},m=function(e,r){return e.map(e=>e=e>216/24389?Math.pow((e+.16)/1.16,3):e/(24389/27)/100)},b=function(e,r){return e.map(e=>Math.pow(e,r.gamma))},t=function(e,r){const a=e.map((e,a)=>e/r[a]/100),[n,m,b]=a.map((e,r)=>e=e>216/24389?Math.pow(e,1/3):7.787*e+16/116);return[116*m-16,500*(n-m),200*(m-b)]},g=function(e,n){const t=a[n];if(!t||!t.name)return void console.error(`unknown iccProfile "${n}"`);const g=e.map(e=>e/255);let u;switch(t.name){case"Adobe RGB (1998)":u=b;break;case"eciRGB v2":u=m;break;case"Gray Gamma 2.2":u=b;break;case"sRGB IEC61966-2.1":u=r;break;default:return void console.error(`unsupported iccProfile "${t.name}"`)}const i=u(g,t);return[100*i[0]*t.matrix.D50.X.red+100*i[1]*t.matrix.D50.X.green+100*i[2]*t.matrix.D50.X.blue,100*i[0]*t.matrix.D50.Y.red+100*i[1]*t.matrix.D50.Y.green+100*i[2]*t.matrix.D50.Y.blue,100*i[0]*t.matrix.D50.Z.red+100*i[1]*t.matrix.D50.Z.green+100*i[2]*t.matrix.D50.Z.blue]};return{rgb2XYZ:g,XYZ2Lab:function(r){return t(r,e)},rgb2Lab:function(r,a){const n=g(r,a);if(n)return t(n,e)},cases:n}}();export default m;
//# sourceMappingURL=index.js.map
