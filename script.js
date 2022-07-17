var city = document.querySelector("#city")
var weatherSearch = document.querySelector("#weatherSearch")

var oldUrl = "https://api.openweathermap.org/data/2.5/onecall?q={city name}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"

var url = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=alerts,hourly,minutely&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"

var latLonGetter = "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=820ed8269e09bb46f1883762931ddaef"

var curLat
var curLon


function dashGenerate(event){
    event.preventDefault()
    oldUrl = oldUrl.replace("{city name}",city.value)
    console.log(oldUrl)

    latLonGetter = latLonGetter.replace("{city name}",city.value)
    console.log(latLonGetter)

    fetch(latLonGetter)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        curLat = data[0].lat
        curLon = data[0].lon
        console.log(curLat + ' ' + curLon)
        
        url = url.replace("{lat}", curLat)
        url = url.replace("{lon", curLon)
    })
    
    console.log(url)

    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
    })  
}

weatherSearch.addEventListener('submit', dashGenerate)