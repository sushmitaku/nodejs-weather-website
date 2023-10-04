const express=require('express')
const path=require('path')// inbuild in node no need to install
const hbs = require('hbs');
const geolocation =require('./utils/geolocation');
const forecast= require( './utils/weatherForcast');
const port=process.env.port||3000
const app=express()
//console.log(path.join(__dirname,'../public'))
//console.log(__filename)
// define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))// default starting route below code updated
//static pages
// Define the path to your views directory
const viewsPath = path.join(__dirname, '../views');
const partialPath=path.join(__dirname,'../partials')
hbs.registerPartials(partialPath)

// Set the views directory and view engine and set handlebars 
app.set('views', viewsPath);
app.set('header', partialPath);

app.set('view engine','hbs')// for handlebars hbs for dynamic pages
app.get('',(req,res)=>{
    res.render('index',{
        name:"sushmita",
        title:"weather",
        footer:"This is footer of the page"
   

    }) // view engine convert to html file to html.hbs
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"kumari",
      plainText:"This is some help text ",
      footer:"This is footer of the page"
   

    }) // view engine convert to html file to html.hbs
})
app.get('/about',(req,res)=>{
    res.render('about',{
      plainText:"This is about page ",
      footer:"This is footer of the page"
   

    }) // view engine convert to html file to html.hbs
})
app.get('/products',(req,res)=>{
    console.log(req.query)//{ search: 'games', rating: '5' }
    res.send({
        products:[]
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address."
        });
    }

    geolocation(req.query.address, (error,  {country, latitude, longitude} ={}) => {
        if (error) {
            return res.send({error});
        } else {
          
            console.log('Country:', country);
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error});
                }
                console.log('Data', forecastData);

                // Send the response inside the forecast callback
                res.send({
                    forecast: forecastData,
                    location: country,
                    address: req.query.address
                });
            });
        }
    });
});

app.get('/help/*',(req,res)=>{
    //  res.send('Hello express')
    res.render('pageNotFound',{
        error:"help artical not found",
        footer:"This is footer of the page"
    })
  })

app.get('*',(req,res)=>{
  //  res.send('Hello express')
  res.render('pageNotfound',{
    error:"Error 404 page not found ",
    title:"404",
    footer:"This is footer of the page"
  })
})

// app.get('',(req,res)=>{
//   //  res.send('Hello express')
//   res.send('<h1>Hello express</h1>')
// })
// access in Browser as localhost:3000/help
// app.get('/help',(req,res)=>{
//    // res.send("Help page")
//    res.send('<h1>Help page</h1>')
// })
// app.get('/about',(req,res)=>{
//    // res.send("about page")
//    res.send('<h1>About page</h1>')

// })




app.listen(port,()=>{
console.log('server is running on port', port)
})

