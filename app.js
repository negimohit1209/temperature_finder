const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./forecast/forecast')

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

// console.log(argv.a);
geocode.geocodeAddress(argv.address, (errorMsg, result) => {
    if(errorMsg){
        console.log(errorMsg);
    }else{
        weather.getWeather(result.latitude,result.longitude, (errorMsg, weatherResults) => {
            if(errorMsg){
                console.log(errorMsg);
            }else{
                console.log(`The temperature at "${result.address}" is ${weatherResults.temperature} F`)
                console.log(`BUT it feels like ${weatherResults.apparentTemperature} F`)
            }
        })
    }
});



