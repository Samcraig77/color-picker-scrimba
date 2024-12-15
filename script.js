const colorPicker = document.getElementById('color-picker')
const colorChosenEl = document.getElementById('color-chosen')
const virtualNav = document.getElementById('virtual-nav') 
const virtualMain = document.getElementById('virtual-main')
const virtualBubble = document.getElementById('virtual-content')
const virtualText = document.getElementById('virtual-text')
const navColor = document.getElementById('nav-color')
const placeholderNumber = document.getElementById('placeholder-posts-number')
// const placeholderPosts = document.querySelectorAll('.placeholder-post')

colorPicker.addEventListener("input", getColor)
colorPicker.addEventListener("change", getColor)
placeholderNumber.addEventListener("input", (e => {
    getPlaceholders(e.target.value)
}))


function getColor(event) {
    let targetValue = event.target.value.slice(1) //Call the input (color selector), and slice the '#' off the value string
    colorChosenEl.innerText = event.target.value //Display the picked color hex value in #color-chosen span
    // getPlaceholders()

    fetch (`https://www.thecolorapi.com/scheme?hex=${targetValue}&count=36`)
    .then(res => res.json())
    .then(data => {
        const fullColorHexArray = Object.values(data.colors) //After calling the api, we get the color hex values across all the calls
        .map(color => hexValue = color.hex.value) //Then create the array out of only the values, the only thing used in the app finishing the const

        const colorNameArray = Object.values(data.colors[18].name) //The chosen color appears in the middle of the API call, we pick it out and give it the name displayed here
        colorChosenEl.innerText = `#${targetValue} => ${colorNameArray[0]}`
        virtualNav.style.backgroundColor = fullColorHexArray[3]
        virtualNav.style.color = fullColorHexArray[30]
        virtualMain.style.backgroundColor = fullColorHexArray[18]
        virtualBubble.style.backgroundColor = fullColorHexArray[35]
        virtualText.style.color = fullColorHexArray[0]
    })
}

function getPlaceholders(number) {
    number ? number = number : number = 5

    fetch ('https://jsonplaceholder.typicode.com/posts/')
    .then(res => res.json())
    .then(data => {
        const postsArray = data.slice(0, `${number}`)
        
        virtualText.innerHTML = postsArray.map(post => 
            `<article class="placeholder-post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <hr>
            </article>`
        ).join('')
    })
}

getPlaceholders(5)