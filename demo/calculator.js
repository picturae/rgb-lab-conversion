function applyKeyValuePairsFromUrl() {
    var valueString = location.search.substring(1)
    if (valueString) {
        valuePairs = valueString.split('&')
        valuePairs.forEach(pair => {
            pair = pair.split('=')
            if (pair.length === 2) {
                document.getElementsByName(pair[0])[0].value = pair[1]
            }
        })
    }
}

function setFormAction() {
    document.forms[0].action =
        location.protocol + '//' + location.host + location.pathname
}

function calcXYZ(form) {
    var xyz = rgbLabConversion.rgb2XYZ(
        [form.red.value, form.green.value, form.blue.value],
        form.iccProfile.value,
    )

    form.x.value = xyz[0]
    form.y.value = xyz[1]
    form.z.value = xyz[2]
}

function calcLab(form) {
    var lab = rgbLabConversion.XYZ2Lab([
        form.x.value,
        form.y.value,
        form.z.value,
    ])

    form.Lx.value = lab[0]
    form.ax.value = lab[1]
    form.bx.value = lab[2]
}
