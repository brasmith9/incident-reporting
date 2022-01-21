const https = require("https");
const db = require("../config/database");


/*
|--------------------------------------------------------------------------
| A GET endpoint that lists all the incidents.
|--------------------------------------------------------------------------
*/

const getIncidents = (request, response) => {
    db.query('SELECT * FROM incidents', (error, results) => {
        if(error){
            throw error
        }

        response.status(200).json(results.rows)
    })
}

/*
|--------------------------------------------------------------------------
| A POST endpoint that receives the incident report.
|--------------------------------------------------------------------------
*/

const createIncident = (request, response) => {
    
        console.log(request.body);
        let client_id = request.body.client_id; 
        let incident_desc = request.body.incident_desc; 
        let city = request.body.city;
        let country = request.body.country;

    /*
    |-------------------------------------------------------------------------------------
    | Fetch weathwer report from the API service of https://openweathermap.org/current
    |-------------------------------------------------------------------------------------
    | Access current weather data for any location on Earth. We collect and process weather 
    | data from different sources such as global and local weather models, satellites, 
    | radars and a vast network of weather stations. Data is available in JSON, XML, or HTML
    | format
    */
         
    const api_key = process.env.OPEN_WEATHER_API;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key

    https.get(url, (resp) => {
        if (resp.statusCode === 200) {
            resp.on("data", (data) => {
                let weather_report = JSON.parse(data);   
                /*
                |--------------------------------------------------------------------------
                | Insert data into Database when weather reports is returned
                |--------------------------------------------------------------------------
                */
                db.query('INSERT INTO incidents (client_id, incident_desc, city, country, weather_report) VALUES ($1, $2, $3, $4, $5)', [client_id,  incident_desc, city, country, weather_report], (err, result) => {
                    if (err) {
                        throw err
                      }
                    response.status(201).send("You have successfully reported your Incident.")
                })
              })
        }else{
            resp.on("error", (error) => {
                throw error;
              })
        }

      })
}

module.exports = {
    getIncidents,
    createIncident
}