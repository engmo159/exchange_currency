// const COUNTRY_NAMES is in data.js file

// api
// const imgApi = `https://flagsapi.com/EG/shiny/32.png`
// const api = `https://v6.exchangerate-api.com/v6/0eb0afd4204cbff754481738/latest/USD`
// dom variables
const selectFrom = document.querySelector('#selectFrom')
const selectTo = document.querySelector('#selectTo')
const inputImg = document.querySelector('#inputImg')
const outputImg = document.querySelector('#outputImg')
const btn = document.querySelector('#btn')
const resultText = document.querySelector('#resultText')
const input = document.querySelector('#input')
const switchBtn = document.querySelector('#switchBtn')
// other variables
let inputCurrency = 'USD'
let outputCurrency = 'EGP'
let conversionResult
let inputNumber = 1
input.focus()
// option mapping
Object.entries(COUNTRY_NAMES).map(entry => {
  // input select options
  entry[0] == 'USD'
    ? (selectFrom.innerHTML += `<option selected value=${entry[0]}>${entry[0]} || ${entry[1]}</option>`)
    : (selectFrom.innerHTML += `<option  value=${entry[0]}>${entry[0]} || ${entry[1]}</option>`)
  // output select options
  entry[0] == 'EGP'
    ? (selectTo.innerHTML += `<option selected value=${entry[0]}> ${entry[0]} || ${entry[1]}</option>`)
    : (selectTo.innerHTML += `<option value=${entry[0]}> ${entry[0]} || ${entry[1]}</option>`)
})

// events
selectFrom.addEventListener('change', e => {
  inputImg.src = `https://flagsapi.com/${e.target.value
    .slice(0, -1)
    .trim()}/shiny/32.png`
  inputCurrency = e.target.value
})

selectTo.addEventListener('change', e => {
  outputImg.src = `https://flagsapi.com/${e.target.value
    .slice(0, -1)
    .trim()}/shiny/32.png`
  outputCurrency = e.target.value
})

input.addEventListener('input', e => {
  isNaN(inputNumber) || inputNumber < 1 || !inputNumber
    ? (inputNumber = 1)
    : (inputNumber = e.target.value)
})

switchBtn.addEventListener('click', e => {
  e.preventDefault()
  let oldInput = inputCurrency
  let oldOutput = outputCurrency
  inputCurrency = oldOutput
  outputCurrency = oldInput
  Object.entries(COUNTRY_NAMES).map(entry => {
    // input select options
    entry[0] == inputCurrency &&
      (selectFrom.innerHTML = `<option  value=${entry[0]}>${entry[0]} || ${entry[1]}</option>`)

    // output select options
    entry[0] == outputCurrency &&
      (selectTo.innerHTML = `<option  value=${entry[0]}> ${entry[0]} || ${entry[1]}</option>`)
  })
  inputImg.src = `https://flagsapi.com/${inputCurrency
    .slice(0, -1)
    .trim()}/shiny/32.png`
  outputImg.src = `https://flagsapi.com/${outputCurrency
    .slice(0, -1)
    .trim()}/shiny/32.png`
})

const fetchHandler = () => {
  fetch(
    `https://v6.exchangerate-api.com/v6/0eb0afd4204cbff754481738/latest/${inputCurrency}`
  )
    .then(res => res.json())
    .then(data => {
      let result = data.conversion_rates[outputCurrency]
      conversionResult = eval(result * inputNumber)

      // result
      resultText.innerHTML = `${inputNumber} ${inputCurrency} = ${conversionResult} ${outputCurrency}`
    })
    .catch(err => console.error(err))
}

btn.addEventListener('click', e => {
  e.preventDefault()
  fetchHandler()
})
