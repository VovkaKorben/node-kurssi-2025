// use express moudle
const express = require("express")
// create Express object
const app = express()
// use json middleware
app.use(express.json())
// returns random integer between min (inclusive) and max (inclusive).
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function CelsiusToFahrenheit(c) {
    return c * 9 / 5 + 32;
}
const states = ["Sunny", "Cloudy", "Rainy"]
let cities_data =
    [
        { 'city_name': 'Helsinki' },
        { 'city_name': 'Turku' },
        { 'city_name': 'Rovaniemi' },
        { 'city_name': 'Joensuu' },
        { 'city_name': 'Kitee' },
        { 'city_name': 'Nurmes' },
        { 'city_name': 'Espoo' },
    ];



// app.get('/weather/:city?', (req, res) => {
app.get(['/weather', '/weather/:city'], (req, res) => {

    // get city name from request
    let city = req.params.city || req.query.city;
    let units = req.query.units;


    // console.log(city_name, temperature_unit);
    // let city = req.params.city;
    if (!city)
        return res.status(400).json({ error: "City name required." });
    
    // convert input
    city_name = city.toLowerCase();
    const found_city = cities_data.find(city_rec => city_rec.city_name.toLowerCase() === city_name);
    if (found_city === undefined)
        return res.status(400).json({ error: `City ${city} not found` });

    // if temperature not specified, use Celsius by default
    units = (units || 'c').toLowerCase();

    // return city data
    return res.status(200).json({
        city_name: found_city['city_name'],
        temperature: units === 'c' ? found_city['temperature_value'] : CelsiusToFahrenheit(found_city['temperature_value']),
        unit: units,
        state: found_city['state']
    });
})

// Prepare tables
cities_data.forEach((v) => {
    // assign random temperature
    v['temperature_value'] = Math.random() * 20 + 10;
    // assign random state
    v['state'] = states[getRandomInt(0, states.length - 1)];
    //    console.log(v);
}
);

// start server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Wheather API running at http://localhost:${PORT}`));

/* test URLs 
normal responce:
http://localhost:3001/weather?city=joensuu&units=F
http://localhost:3001/weather?city=Helsinki&units=c
http://localhost:3001/weather?city=ESPOO

error handling:
http://localhost:3001/weather?city=Helsinki2
http://localhost:3001/weather/joensuuu
*/