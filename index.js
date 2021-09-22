const { readInput, inquirerMenu, pause, listPlaces } = require("./helpers/inquirer")
const Search = require('./models/searches')

const main = async () => {
    // await readInput()
    let opt; 
    const search = new Search()
    

    do { 
        console.clear()
        
        opt = await inquirerMenu()
        switch(opt){
            case 1: 
                //Show message  
                const place = await readInput("City: ")
                //Search for places
                const places = await search.city(place)
                //choose a place
                const id = await listPlaces(places)
                if(id === '0') continue;
                const selectPlace = places.find(p => p.id === id)
                const {name, lat, lng} = selectPlace;
                
                search.addHistory(name)

                //weather
                const weather = await search.weather(lat, lng)

                
                //show results
                console.clear()
                console.log('\nInformation about the city\n'.green)
                console.log('City:', name.blue )
                console.log('Lat:', lat)
                console.log('Lng:', lng)
                console.log('Temp:', weather.temp)
                console.log('Min:',weather.min)
                console.log('Max:',weather.max)
                console.log('What is the weather like? ', weather.desc.blue)

            break; 
            case 2: 
                await search.readFile()
                search.capitalizedHistory.forEach((place, i) => {
                    const idx = `${i + 1}`.blue;
                    console.log(`${idx}: ${place}`) 
                })
                // Object.keys(read).forEach((place, i) => {
                //     const idx = `${i + 1}`.green;
                //     console.log(`${idx}: ${read[place]}`) 
                // });
                console.log()
                

            break;
        }
        // console.clear()
        if(opt !== 0) await pause() 
    }while(opt !== 0 )

    console.log(opt)
}

main()