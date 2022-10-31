'use strict'

var gStartFrom = { xStartPos: 20, yStartPos: 45 }
let gElCanvas
let gCtx

function onImgSelect(imgIdx) {
    setGlobalMeme(imgIdx)
    displayMemeEditor()

    // addListeners()



    renderMeme()
    initCanvas()
}

function initCanvas() {
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    // addEventListeners()
    renderMeme()

}




function renderMeme(foo = null) {
    const meme = getMeme()
    const lines = meme.lines
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(lines, foo)
        // drawTextOnCanvas('MIKI', 40, 40 + yDisTest, 40, 'left', 'Ariel', 2)
    }
}

function getMeme() {
    return gMeme
}




/* canvas functions */
var gDistance = { xDis: 0, yDis: 0 }
var yDisTest = 0

function moveSpecificText(pos = { dirX: 0, dirY: 0 }) {
    const meme = getMeme()
    // meme
    // console.log('pos', pos);

    meme.lines[meme.selectedLineIdx].pos = pos
    renderMeme(meme.lines)

}


function movePositionText(dirX = 0, dirY = 0, isInCenter = false) {
    const meme = getMeme()

    // TODO: for in loop
    // console.log('movePositionText', movePositionText);
    gDistance.xDis += dirX
    gDistance.yDis += dirY

    if (isInCenter) {
        gDistance = { xDis: 0, yDis: 0 }

    }
    renderMeme(meme.lines)

}

function drawText(lines, foo=null) {
    // addListeners()
    const coordsDraw = getCoordsDraw()
    const heightDiff = coordsDraw.middle.xMiddle * 1.2
    const sizeFont = gMeme.lines[gMeme.selectedLineIdx].size

    // const yTest = gMeme.lines[gMeme.selectedLineIdx].pos.yPos

    lines.forEach((line, idx) => {
        // console.log(gDistance);
        if (idx < 2) {
            const xCoord = coordsDraw.fifth.xFifth * 1.4
            const yCoord = coordsDraw.fifth.yFifth + (idx * heightDiff)
            setPoseMeme({ xPos: xCoord + (gDistance.xDis), yPos: yCoord + (gDistance.yDis) }, idx)
            drawTextOnCanvas(line.txt, gMeme.lines[idx].pos.xPos, gMeme.lines[idx].pos.yPos, sizeFont, 'right', 'impact', idx, line, foo=null)
        }
        else {

            const xCoord = coordsDraw.fifth.xFifth * 1.4
            const yCoord = (1.05 * coordsDraw.middle.yMiddle)
            setPoseMeme({ xPos: xCoord + (gDistance.xDis), yPos: yCoord + (gDistance.yDis) }, idx)
            drawTextOnCanvas(line.txt, gMeme.lines[idx].pos.xPos, gMeme.lines[idx].pos.yPos, sizeFont, 'left', 'impact', idx, line, foo=null)
        }
    }
    )

}


//TODO: check moving one piece of txt - the function works but eed debugger

function setPoseMeme({ xPos, yPos }, idxRow) {
    const meme = getMeme()
    gMeme.lines[idxRow].pos = { xPos, yPos }
}


function drawTextOnCanvas(text, x, y, size, align, font, idx, line, foo=null ) {
    // console.log('drawTextOnCanvas');
    const meme = getMeme()
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'left'
    gCtx.lineWidth = 6
    gCtx.font = `${size}px ${font}`

    //TODO:get font , size , align from user

    gCtx.fillStyle = meme.lines[meme.selectedLineIdx].color || setTextColor()
    gCtx.strokeStyle = 'black'
    gCtx.shadowColor = "blue"

    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
    // printRecOnTxtCanvas()
    if (meme.selectedLineIdx === idx) {
        const txtWidth = gCtx.measureText(line.txt).width
        const rectTopX = calcRectX(line, txtWidth)
        const rectTopY = line.pos.yPos - line.size / 2
        drawRect(rectTopX, rectTopY, txtWidth, line.size)
    }
    if (foo) foo(gElCanvas.toDataURL("image/jpeg"))
}


function calcRectX(line, txtWidth) {
    let x

    switch (line.align) {
        case 'center':
            x = line.pos.xPos - txtWidth * 0.5
            break
        case 'left':
            x = line.pos.xPos
            break
        case 'right':
            x = line.pos.xPos - txtWidth
            break
    }
    return x
}

function setTextColor(colorChoose) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = colorChoose
    renderMeme()
    return colorChoose
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function cleanTextFromMeme() {
    const memes = getMeme()
    // console.log(gMeme);
    deleteTextFromGmemes(gMeme.selectedLineIdx)
    renderMeme()
}

function drawImg() {
    const elImg = document.querySelector('.example-img-for-canvas')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function shareMme() {
    uploadImg()
}
