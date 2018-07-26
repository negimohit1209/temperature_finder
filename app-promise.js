const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const addr = encodeURIComponent(argv.address); 
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;

axios.get(geocodeUrl)
.then((res) =>{
    if(res.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the address.');
    }
    console.log(JSON.stringify(res.data, undefined, 2));
    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.dara.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/53132d6b4a5ee9cde97a255c60f67896/${lat},${lng}`;
    console.log(`Address: ${res.data.results[0].formatted_address}`);
    return axios.get(weatherUrl);
})
.then( (res) => {
    var temperature = res.data.currently.temperature;
    var apparentTemperature = res.data.currently.apparentTemperature
    console.log(`The current temperature is ${temperature} F`)
    console.log(`BUT it feels like ${apparentTemperature} F`)
})
.catch(error => {
    if(error.code === "ENOTFOUND"){
        console.log("Unable to reach Google API Servers");
    }else{
        console.log(error.message);
    }
})

