const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    if (location) {

        messageOne.textContent = 'Loading'

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = 'Weather in ' + data.location
                    //console.log(data)
                    messageTwo.textContent = kelvinToCelsius(data.temp) + '° Celsius. Currently its ' + data.main + ', ' + data.description
                }
            })
        })
    } else {
        messageOne.textContent = 'Enter an addess'
    }
})

function kelvinToCelsius(kelvin) {
    return parseInt(kelvin - 273.15)
}