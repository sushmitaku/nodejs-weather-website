//const { response } = require("express")

console.log("node is running showing js")
//backend api integrate 
// fetch('http://localhost:3000/weather?address=India').then((response)=>{
//     response.json().then((data)=>{
//     if(data.error){
//         console.log(data.error)
//     }
//     else{
//         console.log(data.forecast)
//         console.log(data.address)

//     }
// })
     
// })
const weather_form = document.querySelector('form');
const messageOne=document.querySelector("#message_1")
const messageTwo=document.querySelector("#message_2")
//messageOne.textContent="Javascript"

weather_form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = weather_form.elements.location.value; // Access the input value by name
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
   //'http://localhost:3000/weather?address=' + location
    fetch('/weather?address=' + location)
    
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                   // console.log(data.error);
                   messageOne.textContent=data.error
                } else {
                  //  console.log(data.forecast);
                   // console.log(data.address);
                   messageOne.textContent=data.forecast
                   messageTwo.textContent=data.address
                }
            });
        });
});
