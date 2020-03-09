const express= require ("express");
const bodyParser= require("body-parser");
const path = require("path");
const request = require("request");
//injecting code from shop.js

const app = express();


app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.set('views','views');



app.get('/', function (req, res) {  
    res.sendFile(path.join(__dirname,"views","index.html"));   
});



app.post('/', function(req, res){
    let country = req.body.country;
   
    let url =`https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

   request(url, function(error, response, body){
       console.log("Status", response.statusCode);

       let data = JSON.parse(response.body);
    
       res.render('index', { 
        domain: data[0].topLevelDomain,
        callingCode: data[0].callingCodes,
        capital: data[0].capital,
        region: data[0].region,
        subRegion: data[0].subregion,
        population: data[0].population,
        timeZone: data[0].timezones,
        language: data[0].languages[0].name,
        currency: ' code: ' + data[0].currencies[0].code + ' || name: ' + data[0].currencies[0].name + ' || symbol: ' + data[0].currencies[0].symbol,
        flag: data[0].flag
 
    })
   });
   
});
app.listen(process.env.PORT || 5500, function(){
    console.log("Server is running on port 5500");
});


