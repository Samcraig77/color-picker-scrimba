const colorPicker = document.getElementById('color-picker')
const colorChosenEl = document.getElementById('color-chosen')

colorPicker.addEventListener("input", getColor)
colorPicker.addEventListener("change", getColor)

// function updateColorEl() {
//     colorChosenEl.innerText = getColor()
// }

function getColor(event) {
    let targetValue = event.target.value.slice(1)
    colorChosenEl.innerText = event.target.value
    
    fetch (`https://www.thecolorapi.com/scheme?hex=${targetValue}&count=6`)
    .then(res => res.json())
    .then(data => {
        console.log(Object.keys(data.colors[4].name))
        const colorNameArray = Object.values(data.colors[4].name)
        colorChosenEl.innerText = `#${targetValue} => ${colorNameArray[0]}`
    })
}

