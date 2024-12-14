const colorPicker = document.getElementById('color-picker')
const colorChosenEl = document.getElementById('color-chosen')
const virtualNav = document.getElementById('virtual-nav') 
const virtualMain = document.getElementById('virtual-main')
const virtualBubble = document.getElementById('virtual-bubble')
const virtualText = document.getElementById('virtual-text')

colorPicker.addEventListener("input", getColor)
colorPicker.addEventListener("change", getColor)

// function updateColorEl() {
//     colorChosenEl.innerText = getColor()
// }

function getColor(event) {
    let targetValue = event.target.value.slice(1) //Call the input (color selector), and slice the '#' off the value string
    colorChosenEl.innerText = event.target.value //Display the picked color hex value in #color-chosen span
    
    fetch (`https://www.thecolorapi.com/scheme?hex=${targetValue}&count=36`)
    .then(res => res.json())
    .then(data => {
        const fullColorHexArray = Object.values(data.colors) //After calling the api, we get the color hex values across all the calls
        .map(color => hexValue = color.hex.value) //Then create the array out of only the values, the only thing used in the app finishing the const

        console.log(Object.values(data.colors[18]))
        const colorNameArray = Object.values(data.colors[18].name)
        colorChosenEl.innerText = `#${targetValue} => ${colorNameArray[0]}`
        virtualNav.style.backgroundColor = fullColorHexArray[6]
        virtualNav.style.color = fullColorHexArray[30]
        virtualMain.style.backgroundColor = fullColorHexArray[17]
        virtualBubble.style.backgroundColor = fullColorHexArray[35]
        virtualText.style.color = fullColorHexArray[0]
   })
}