var city = document.querySelector("#city")
var weatherSearch = document.querySelector("#weatherSearch")
var today = document.querySelector("#today")
var forecast = document.querySelector("#forecast")

var oldUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"

var url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"

var latLonGetter = "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=820ed8269e09bb46f1883762931ddaef"

var curLat
var curLon


function dashGenerate(event){
    event.preventDefault()
    // oldUrl = oldUrl.replace("{city name}",city.value)
    // console.log(oldUrl)

    latLonGetter = latLonGetter.replace("{city name}",city.value)
    // console.log(latLonGetter)

    fetch(latLonGetter)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // console.log(data)
        curLat = data[0].lat
        curLon = data[0].lon
        // console.log(curLat + ' ' + curLon)

        url = url.replace("{lat}", curLat)
        url = url.replace("{lon}", curLon)

        console.log(url)

        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                console.log(data.current.temp)
                today.children[1].textContent = `Temp: ${data.current.temp} F`
                console.log(data.current.wind_speed)
                today.children[2].textContent = `Wind: ${data.current.wind_speed} MPH`
                console.log(data.current.humidity)
                today.children[3].textContent = `Humidity ${data.current.humidity} %`
                console.log(data.current.uvi)
                today.children[4].textContent = `UV Index ${data.current.uvi}` 
            })  
    })

    city.value = ""
}

weatherSearch.addEventListener('submit', dashGenerate)