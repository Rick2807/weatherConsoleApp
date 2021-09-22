 require('dotenv').config()
 const fs = require('fs')
 const axios = require('axios')

 class Search { 
     history = []
     path = './db/data.json'
     constructor(){

     }
     get capitalizedHistory (){
        return this.history.map(h => { 
            return h.charAt(0).toUpperCase() + h.slice(1)
        }) 
     }

     get paramsMapbox (){
        return {
            'access_token': `${process.env.MAP_BOX}`,
            'limit': 5,
            'language': 'es'
        }
     }

     get openWeather(){
         return  {
            appid: process.env.OPEN_WEATHER,
            units: 'metric',
            lang: 'es'
        }
     }
     async city(place = ''){
        try {
            // http request
            const instance = axios.default.create({
            baseURL: ` https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        })

        const answer = await instance.get()
        // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        return  answer.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1]
        }))


        } catch (error) {
            console.log(error)
        }


     }

     async weather(lat='', lon=''){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: { lat, lon, ...this.openWeather,}
            })
            const res = await instance.get();

            const {weather, main} = res.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max, 
                temp: main.temp,      
            }
            
        } catch (error) {
            console.log(error)
        }
     }


     addHistory( place = ''){
        if(this.history.includes(place.toLowerCase())){
            return; 
        }
        this.history = this.history.splice(0,5)


        this.history.unshift(place)
         //save on db
         this.saveFile()

     }
     
      saveFile(){
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.path, JSON.stringify(payload))
    }

    readFile(){
        if(!fs.existsSync(this.path)){
            return null 
        }
    
        const read = fs.readFileSync(this.path, {enconding: 'utf-8'})
        const data = JSON.parse(read); 
    
        this.history = data.history
        
    }

 }

 module.exports = Search