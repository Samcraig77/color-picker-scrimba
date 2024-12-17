const colorPicker = document.getElementById('color-picker')
const colorChosenEl = document.getElementById('color-chosen')
const virtualNav = document.getElementById('virtual-nav') 
const virtualMain = document.getElementById('virtual-main')
const virtualBubble = document.getElementById('virtual-content')
const virtualText = document.getElementById('virtual-text')
const navColor = document.getElementById('nav-color')
const navTextColor = document.getElementById('nav-text-color')
const placeholderNumber = document.getElementById('placeholder-posts-number')
const placeholderPostsValue = document.getElementById('placeholder-range-value')

colorPicker.addEventListener("input", getColor)
colorPicker.addEventListener("change", getColor)
placeholderNumber.addEventListener("input", (e => {
    getPlaceholders(e.target.value)
}))


function getColor(event) {
    let targetValue = event.target.value.slice(1) // Call the input (color selector), and slice the '#' off the value string
    colorChosenEl.innerText = event.target.value // Display the picked color hex value in #color-chosen span
    // getPlaceholders()

    fetch (`https://www.thecolorapi.com/scheme?hex=${targetValue}&count=36`)
    .then(res => res.json())
    .then(data => {
        const fullColorHexArray = Object.values(data.colors) // After calling the api, we get the color hex values across all the calls
        .map(color => hexValue = color.hex.value) // Then create the array out of only the hex values, the only thing used in the app finishing the const

        const colorNameArray = Object.values(data.colors)
        .map(color => colorValue = color.name.value) //Create array out of the name values for each color
        
        //Now we get to pick if we need the name for text, hex value for styling, or both.
        colorChosenEl.innerText = `#${targetValue} => ${colorNameArray[18]}`
        virtualNav.style.backgroundColor = fullColorHexArray[3]
        navColor.innerText = `Background color: ${fullColorHexArray[0]} => ${colorNameArray[0]}`
        virtualNav.style.color = fullColorHexArray[30]
        navTextColor.innerText = ` ${fullColorHexArray[30]} => ${colorNameArray[30]}`
        virtualMain.style.backgroundColor = fullColorHexArray[18]
        virtualBubble.style.backgroundColor = fullColorHexArray[35]
        virtualText.style.color = fullColorHexArray[0]
        document.querySelectorAll(".article-borderline").forEach(element => element.style.border = `2px solid ${fullColorHexArray[10]}`)
    })
}

function getPlaceholders(number) {
    placeholderPostsValue.innerText = `${number}` 
    fetch ('https://jsonplaceholder.typicode.com/posts/')
    .then(res => res.json())
    .then(data => {
        const postsArray = data.slice(0, `${number}`)
        
        virtualText.innerHTML = postsArray.map(post => 
            `<article class="placeholder-post">
            <h2>${post.title}</h2>
            <p>${post.body}...</p>
            <div class="post-info">
            <div class="likes">Likes : ${Math.floor(Math.random() * 500)}</div>
            <div class="right-aligned">Comments: ${Math.floor(Math.random() * 100)}</div>
            </div>
            </article>
            <hr class="article-borderline">
            `
        ).join('')
    })
}

getPlaceholders(5)