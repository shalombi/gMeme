
function getCoordsDraw(divider = 1) {

    const canvas = gElCanvas
    const width = canvas.width
    const height = canvas.height

    const constCoordinatesCanvas = {

        // manually: { xQuarter: width / divider, xQuarter: height / divider }
        middle: { xMiddle: width / 2, yMiddle: height / 2 },
        third: { xThird: width / 3, yThird: height / 3 },
        quarter: { xQuarter: width / 4, xQuarter: height / 4 },
        fifth: { xFifth: width / 5, yFifth: height / 5 },
        sixth: { xSixth: width / 6, ySixth: height / 6 },
        eighth: { xEighth: width / 8, yEighth: height / 8 },
        oneUnit: { xEighth: width / width, yEighth: height / width },
    }

    return constCoordinatesCanvas

}

//download
// function downloadMeme() {
//     const elLink = document.querySelector('.download')

//     removeActiveLine()
//     renderMeme(downloadLink)

//     function downloadLink(img) {
//         elLink.href = img
//         elLink.download = 'my-meme'
//         elLink.click()
//     }
// }


