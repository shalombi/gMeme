'use strict'

let gIsOpenMenu = false
let gKeywords 
const KEYWORDS_KEY = 'keyword'

function galleryInit(){
    displayGallery()
    getKeywords()
    renderKeywords()
    let memes = getMemes()
    renderGallery(memes)
}

function renderGallery(images) {
    const elContainerGallery = document.querySelector('.gallery-container')
    const memesImgsHTML = images.map((img, idx) =>
    
        `
         <img class="btn" src=${img.url} onClick="onImgSelect(${idx})"  value="img/${idx + 1}.jpg" alt="">
         `
    )
    elContainerGallery.innerHTML = memesImgsHTML.join('')
}

function getKeywords(){
    let keywords = JSON.parse(localStorage.getItem(KEYWORDS_KEY))
    if(keywords){
        gKeywords = keywords
    }
    else{
        gKeywords = [
            {keyword:'animals',fontSize:15},
            {keyword:'baby',fontSize:15},
            {keyword:'surprised',fontSize:15},
            {keyword:'funny',fontSize:15},
            {keyword:'programmer',fontSize:15},
            {keyword:'perfect',fontSize:15},
        
        ]
        localStorage.setItem(KEYWORDS_KEY,JSON.stringify(gKeywords))
    }
}

function hamburgerMenuClicked(elBtn) {
    gIsOpenMenu = !gIsOpenMenu
    if (gIsOpenMenu) {
        document.querySelector('nav').classList.add('nav-open')
        document.querySelector('.hamburger-btn').innerText = "X"
    } else {
        document.querySelector('nav').classList.remove('nav-open')
        document.querySelector('.hamburger-btn').innerText = "☰"
    }
}

function renderKeywords(){
    const keywordsContainer = document.querySelector('.keywords')
    let keywords = gKeywords.map(keyword=> 
        {
            return `<a style="font-size:${keyword.fontSize}px" onclick="onKeywordFilter('${keyword.keyword}')" class="btn" >${keyword.keyword.toUpperCase()}</a>`}).join('')
    keywordsContainer.innerHTML = keywords

}

function onKeywordFilter(keyword){
    const key= gKeywords.find(currKeyword=> currKeyword.keyword === keyword)
    if(key.fontSize < 30)
    key.fontSize = key.fontSize + 3
    localStorage.setItem(KEYWORDS_KEY,JSON.stringify(gKeywords))
    renderKeywords()
    
    const keywordFilter = filterMemes(keyword)
    renderGallery(keywordFilter)
}

function onFilterMemes(value){
    const filteredMemes = filterMemes(value)
    renderGallery(filteredMemes)

}

function displayGallery() {
    // clearCanvas()
    // document.querySelector('.keywords').style.display = "none"

    document.querySelector('.gallery-container').style.display = "grid"
    document.querySelector('nav').classList.remove('nav-open')
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.hamburger-btn').innerText = "☰"

}

function displayMemeEditor() {
    document.querySelector('.gallery-container').style.display = 'none'
    // document.querySelector('.keywords').style.display = "none"

    document.querySelector('.editor').style.display = 'block'
}

