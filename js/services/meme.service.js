var gMeme;
var gRowSelectedIndex

var gKeywordSearchCountMap = {
    'decisive': 1,
    'cats': 1,
    'funny': 7,
    'president': 3,
    'animals': 3,
    'dogs': 2,
    'cute': 2,
    'baby': 3,
    'lovely': 1,
    'sleep': 1,
    'cats': 1,
    'magician': 1,
    'listening': 2,
    'so simple': 1,
    'wrestling': 1,
}

var gImgs = [
    { id: 1, url: 'img/0.jpg', keywords: ['decisive', 'president'] },
    { id: 2, url: 'img/1.jpg', keywords: ['animals', 'dogs', 'cute'] },
    { id: 3, url: 'img/2.jpg', keywords: ['animals', 'dogs', 'baby', 'lovely'] },
    { id: 4, url: 'img/3.jpg', keywords: ['animals', 'cats', 'funny', 'sleep'] },
    { id: 5, url: 'img/4.jpg', keywords: ['baby', 'decisive'] },
    { id: 6, url: 'img/5.jpg', keywords: ['cute', 'surprised'] },
    { id: 7, url: 'img/6.jpg', keywords: ['magician', 'listening'] },
    { id: 8, url: 'img/7.jpg', keywords: ['baby', 'funny'] },
    { id: 9, url: 'img/8.jpg', keywords: ['laughing', 'president'] },
    { id: 10, url: 'img/9.jpg', keywords: ['wrestling', 'president'] },
    { id: 11, url: 'img/10.jpg', keywords: ['what would you do', 'funny'] },
    { id: 12, url: 'img/11.jpg', keywords: ['programmer', 'funny'] },
    { id: 13, url: 'img/12.jpg', keywords: ['perfect', 'funny'] },
    { id: 14, url: 'img/13.jpg', keywords: ['listening', 'funny'] },
    { id: 15, url: 'img/14.jpg', keywords: ['decisive', 'president'] },
    { id: 16, url: 'img/15.jpg', keywords: ['so simple', 'funny'] },
];
function removeActiveLine() {
    gMeme.selectedLineIdx = null
}
function filterMemes(value) {
    console.log(value);
    let filteredMemes = gImgs.map(meme => {
        if (meme.keywords.some(keyword => keyword.includes(value))) {

            return meme
        }
        return false

    })
    filteredMemes = filteredMemes.filter(meme => meme !== false)
    return filteredMemes


}

function setGlobalMeme(imgIndex) {
    gMeme =
    {
        selectedImgId: imgIndex,
        selectedLineIdx: 0,
        lines: [
            { txt: 'COOL 1', size: 29, align: 'left', color: 'white', pos: null },
            { txt: 'COOL 2', size: 29, align: 'left', color: 'white', pos: null }

        ]
    }
}

// gMeme.selectedLineIdx

// gMeme.lines[gMeme.selectedLineIdx].pos.yPos
// gRowSelectedIndex = gMeme.selectedLineIdx

function setLineTxt(inputTxt) {
    // const line = { txt: inputTxt.value, size: 29, align: 'left', color: 'purple' }
    gMeme.lines[gMeme.selectedLineIdx].txt = inputTxt.value
    // console.log(gMeme.lines, ';;;;;;')
    renderMeme()
}

function getMemes() {
    return gImgs
}




function changeSelectedLineIdx() {
    // console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    if (gMeme.selectedLineIdx + 1 < gMeme.lines.length) {
        ++gMeme.selectedLineIdx
    } else {
        gMeme.selectedLineIdx = 0
    }
    renderMeme()
}

// printRecOnTxtCanvas()

function clearCanvasBoard() {
    // console.log('clearCanvas');
    cleanTextFromMeme()
    clearCanvas()
    changeSelectedLineIdx()
    renderMeme()
}

function setCurrColor() {
    const meme = getMeme()
    return meme.lines[meme.selectedLineIdx].color
}

function addLine(emoji = null) {
    const line = { txt: emoji || 'COOL 3', size: 29, align: 'left', color: setCurrColor() }
    gMeme.lines.push(line)
    drawText(gMeme.lines)
    setCurrRowIndex(gMeme.lines.length - 1)
    renderMeme()
}

function setCurrRowIndex(indexCurrRow) {
    gMeme.selectedLineIdx = indexCurrRow

}

function deleteTextFromGmemes(index) {
    gMeme.lines[index].txt = ''
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function changeLineTxt(txt) {
    getCurrLine().txt = txt
}

function changeFontSize(isIncrease, measure = 2) {
    const wordIdx = gMeme.selectedLineIdx
    isIncrease ? gMeme.lines[wordIdx].size += measure : gMeme.lines[wordIdx].size -= measure
    drawText(gMeme.lines)
    renderMeme()
}



function printRecOnTxtCanvas() {
    const meme = gMeme
    const lineForDrawRec = meme.lines[meme.selectedLineIdx].pos
    drawRect(40, 40, 250, 250)
}


function drawRect(x, y, xRigth, yDown) {
    // console.log('kkkkkkkk');
    gCtx.beginPath()
    gCtx.shadowBlur = 0
    gCtx.rect(x - 10, y - 5, xRigth + 20, yDown + 10)
    gCtx.strokeStyle = 'orange'
    gCtx.stroke()
    gCtx.closePath()
    console.log('  gCtx.rect(x - 10, y - 5, xRigth + 20, yDown + 10)', x - 10, y - 5, xRigth + 20, yDown + 10);
    // renderMeme()
}



function changeHeight(value, id) {

    yDisTest += value
    renderMeme()

}