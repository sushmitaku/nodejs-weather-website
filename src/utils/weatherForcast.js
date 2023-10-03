const request = require('axios');
const weatherForcast=(latitude,longitude,callback)=>{
const request=require('request')
//const url='http://api.weatherstack.com/current?access_key=500efed559535bd8b0be316bde6c0565&query=23.3441,85.3096&units=f'
const url = `http://api.weatherstack.com/current?access_key=500efed559535bd8b0be316bde6c0565&query=${latitude},${longitude}&units=f`;
request({url:url,json:true},(err,response)=>{
   // console.log(response)
    // const data=JSON.parse(response.body)
    // console.log(data.current)
    if(err){
        // network connection issue
        callback("unable to connect to weather service",undefined)
    }
    else if(response.body.err){
        callback('unable to find location',undefined)// error code 400

    }
    else{
        callback(undefined, `${response.body.current.weather_descriptions[0]}, temperature is ${response.body.current.temperature}, it feels like temperature is ${response.body.current.feelslike}`);

    }
})
}
//module.exports=weatherForcast
module.exports = weatherForcast;
