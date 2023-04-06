const APIURL="https://api-thirukkural.vercel.app/api?num=";
const main = document.getElementById('main')
const initialVerseNumber = Math.floor(Math.random() *100) +1

// fetch("http://example.com/movies.json")
//   .then((response) => response.json())
//   .then((data) => console.log(data));


//let submitListener
async function getVerse(verseNumber) {
    try {
        const response = await fetch(APIURL + verseNumber)
        const data=await response.json()
        createVerseCard(data)
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

function getPrevVerse (verse) {
    let prevVerse=verse-1
    if (prevVerse==0){
        prevVerse=1330
    }
    getVerse(prevVerse)
}
function getNextVerse (verse) {
    let nextVerse=verse+1
    if (nextVerse===1331){
        nextVerse=1
    }
    getVerse(nextVerse)
}

function createVerseCard (verse) {
    const cardHTML = `
    <div class="card">
        <form class="user-form" id="form">
            <input type="text" id="search" placeholder="Search for Kural Number (1 - 1330)">
        </form>
        <div class="navi">
            <button class="prev-button" onclick="getPrevVerse(${verse.number})">Prev</button>
            <text> Kural ${verse.number} </text>
            <button class="next-button" onclick="getNextVerse(${verse.number})">Next</button>
        </div>
        <div class="tamil-verse">
            <h4>${verse.sect_tam} : ${verse.chapgrp_tam} - ${verse.chap_tam} </h4>
            <p class="tamil">குரல்: ${verse.line1} ${verse.line2}</p>
        </div>
        <div class="tamil-info">
            <p>கருத்து: ${verse.tam_exp}<p>
        </div>
        <div class="english-info">
            <h4>${verse.sect_eng} : ${verse.chapgrp_eng} - ${verse.chap_eng} </h4>
            <p>Translation: ${verse.eng_exp}<p>
        </div>
    </div>
    `
    main.innerHTML = cardHTML
    const form=document.getElementById("form")
    const search = document.getElementById('search')
    // if (submitListener==undefined)
        submitListener=form.addEventListener('submit', (e) => {
            e.preventDefault()
            const verse = search.value
            if(verse) {
                getVerse(verse)
                search.value = ''
            }
        })

}


