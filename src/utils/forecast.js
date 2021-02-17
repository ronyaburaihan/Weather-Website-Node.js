const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=8deab764912fefad1604c0ef7d3d818f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connet to location services !', undefined)
        } else if (body.message){
            callback(body.message, undefined)
        } else {
           callback(undefined, body)
        }
    })
}

module.exports = forecast