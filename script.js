// Access HTML Elements
var city = document.querySelector("#city")
var weatherSearch = document.querySelector("#weatherSearch")
var today = document.querySelector("#today")
var forecast = document.querySelector("#forecast")
var forecastTitle = document.querySelector("#forecastTitle")
var pastCities = document.querySelector("#pastCities")
// Today's Date with Moment
var todayDate = moment()
// APIs for One Call 1.0, the Geocoding API, and their weather icon database
var url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"
var latLonGetter = "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=820ed8269e09bb46f1883762931ddaef"
var iconURL = "http://openweathermap.org/img/w/{icon}.png"
// variables for Longitude and Latitude
var curLat
var curLon
// variables to cycle thru different cities
var lastCity = "{city name}"
var lastLat = "{lat}"
var lastLon = "{lon}"
var pastSearch = 0

// Generate Weather Info
function dashGenerate(event){
    // Stop page from refreshing
    if (pastSearch == 0){
      event.preventDefault()  
    }
    else{
      pastSearch--
    }
    // stop if no city is entered
    if(city.value == ''){
      console.log('ruh roh')
      return
    }
    // Remove old list of cities
    while(pastCities.hasChildNodes()){
      pastCities.removeChild(pastCities.firstChild)
    }
    // https://www.javascripttutorial.net/web-apis/javascript-localstorage/
    // get list of names from localStorage
    let keys = Object.keys(localStorage)
    // add list of past cities
    for(i = 0; i< keys.length; i++){
      var cities = document.createElement('button')
      cities.classList.add("btn","btn-outline-primary")
      cities.textContent = keys[i]
      pastCities.appendChild(cities)
    }
    // add City to localStorage
    localStorage.setItem(city.value, city.value)
    // Search for current city, replace text with default or the last city entered
    latLonGetter = latLonGetter.replace(lastCity, city.value)
    // set current city as the past city
    lastCity = city.value
    console.log(latLonGetter)
    // run geocoding API to get lat/lon
    fetch(latLonGetter)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // console.log(data)
        // set current lat & lon
        curLat = data[0].lat
        curLon = data[0].lon
        // console.log(curLat + ' ' + curLon)
        // replace last lat/long or default with current one pulled from API
        url = url.replace(lastLat, curLat)
        url = url.replace(lastLon, curLon)
        // set current lat/lon as the the past lat/lon
        lastLat = curLat
        lastLon = curLon
        console.log(url)
        // get weather data based on lat/lon
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                // Set Weather Info based on info pulled from One Call 1.0 API
                
                
                today.children[0].textContent = `${city.value} (${todayDate.format('MM/DD/YYYY')})`
                today.children[1].src = iconURL.replace('{icon}', data.current.weather[0].icon)
                today.children[2].textContent = `Temp: ${data.current.temp} \xB0F`
                today.children[3].textContent = `Wind: ${data.current.wind_speed} MPH`
                today.children[4].textContent = `Humidity ${data.current.humidity} %`
                // set UV Index and format accordingly
                today.children[4].textContent = `UV Index ${data.current.uvi}`
                if(data.current.uvi >= 6){
                  today.children[4].style = "background:red; color:white; display:inline" 
                }
                else if(data.current.uvi >= 3){
                  today.children[4].style = "background:yellow; color:black; display:inline"
                }
                else if(data.current.uvi >= 0){
                  today.children[4].style = "background:green; color:white; display:inline"
                }
                
                // Reset the search bar
                city.value = ""
                // Add Title for Forecast
                forecastTitle.children[0].textContent = "5-Day Forecast:"
                // Display the cards
                forecast.style = "display:flex"
                // Loop thru 5 cards
                for(var i = 0; i < 5; i++){
                  // grab date, it's provided in UNIX time
                  var forecastDate = moment.unix(data.daily[i].dt)
                  // grab elements from HTML
                  var title = forecast.children[i].children[0]
                  var icon = forecast.children[i].children[1]
                  var forecastTemp = forecast.children[i].children[2]
                  var forecastWind = forecast.children[i].children[3]
                  var forecastHum = forecast.children[i].children[4]
                  // set title & class
                  title.textContent = forecastDate.format("MM/DD/YYYY")
                  title.classList.add("card-title")
                  // set icon
                  icon.src = iconURL.replace("{icon}",data.daily[i].weather[0].icon)    
                  // set temp
                  forecastTemp.textContent = `Temp: ${data.daily[i].temp.day} \xB0F`
                  forecastTemp.classList.add("card-text")
                  // set wind speed
                  forecastWind.textContent = `Wind: ${data.daily[i].wind_speed} MPH`
                  forecastWind.classList.add("card-text")
                  // set humidity
                  forecastHum.textContent = `Humidity ${data.daily[i].humidity} %`
                  forecastHum.classList.add("card-text")
                }
            })  
    })
    
}

// if City name is submitted generate dashboard
weatherSearch.addEventListener('submit', dashGenerate)

function pastCitiesSearch(event){
  if(event.target.classList.contains("btn")){
    var past = event.target.textContent
    city.value = past
    pastSearch++
    dashGenerate()
  }
}

pastCities.addEventListener('click', pastCitiesSearch)