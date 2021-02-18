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
                    messageOne.textContent = 'Weather in '+location
                    //console.log(data)
                    messageTwo.textContent = data.main.temp + ' Kelvin'
                }
            })
        })
    } else {
        messageOne.textContent = 'Enter an addess'
    }
})