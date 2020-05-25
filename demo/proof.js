function displayData(iccProfileName) {
    let tbody = document.getElementById(iccProfileName);
    let totalDeviation = 0;
    let highestDeviation = 0;
    let count = 0;
    let absDeviation = (labPsI, labCalcI) => Math.abs(
        Math.abs(labPsI) - Math.abs(labCalcI)
    );
    let sumAbsDeviation = (labPS, labCalc) => {
        let tlDev = 0;
        labCalc.forEach((labCalcI, index) => {
            tlDev += absDeviation(labPS[index], labCalcI);
        });
        return tlDev;
    }

    const proofCase = rgbLabConversion.cases.squares;
    proofCase.forEach(obj => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<th class="red">${obj.rgb[0]}</th>
                        <th class="green">${obj.rgb[1]}</th>
                        <th class="blue">${obj.rgb[2]}</th>`;
        let cssTriplet = `rgb(${obj.rgb.join()})`;
        tr.innerHTML += `<th class="view" style="background: ${cssTriplet}">&nbsp;</th>`;
        let labPS = obj[iccProfileName];
        tr.innerHTML +=  `<th class="lum">${labPS[0]}</th>
                          <th class="a-axis">${labPS[1]}</th>
                          <th class="b-axis">${labPS[2]}</th>`;
        let labCalc = rgbLabConversion.rgb2Lab(obj.rgb, iccProfileName);
        let lab = labCalc.map(labI => Math.round(labI));
        tr.innerHTML +=  `<td class="lum">${lab[0]}</td>
                          <td class="a-axis">${lab[1]}</td>
                          <td class="b-axis">${lab[2]}</td>`;
        tr.innerHTML += `<td class="abs-dev-0">${absDeviation(labPS[0], lab[0])}</td>`;
        tr.innerHTML += `<td class="abs-dev-1">${absDeviation(labPS[1], lab[1])}</td>`;
        tr.innerHTML += `<td class="abs-dev-2">${absDeviation(labPS[2], lab[2])}</td>`;
        tr.innerHTML += `<th class="total-dev">${sumAbsDeviation(labPS, lab)}</th>`;
        tbody.appendChild(tr);
        lab.forEach((labI, index) => {
            absoluteDeviation = absDeviation(labPS[index], labI);
            totalDeviation += absoluteDeviation;
            highestDeviation = Math.max(absoluteDeviation, highestDeviation);
            count++;
        });
    });

    let averageDeviation =
        Math.round((totalDeviation / count) * 1000) / 1000;
    highestDeviation = Math.round(highestDeviation * 1000) / 1000;
    console.log(
        `Average absolute deviation with ${iccProfileName}: ${averageDeviation}`
    );
    console.log(
        `Highest absolute deviation with ${iccProfileName}: ${highestDeviation}`
    );
}
