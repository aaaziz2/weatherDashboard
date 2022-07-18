var city = document.querySelector("#city")
var weatherSearch = document.querySelector("#weatherSearch")
var today = document.querySelector("#today")
var forecast = document.querySelector("#forecast")
var forecastTitle = document.querySelector("#forecastTitle")

var todayDate = moment()

// var oldUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"
var url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=820ed8269e09bb46f1883762931ddaef&units=imperial"
var latLonGetter = "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=820ed8269e09bb46f1883762931ddaef"
var iconURL = "http://openweathermap.org/img/w/{icon}.png"

var curLat
var curLon

function dashGenerate(event){
    if(city.value == ''){
      return
    }
    event.preventDefault()
    // oldUrl = oldUrl.replace("{city name}",city.value)
    // console.log(oldUrl)
    localStorage.setItem(city.value, city.value)
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
                
                today.children[0].textContent = `${city.value} (${todayDate.format('MM/DD/YYYY')})`
                // console.log(data.current.temp)
                today.children[1].textContent = `Temp: ${data.current.temp} F`
                // console.log(data.current.wind_speed)
                today.children[2].textContent = `Wind: ${data.current.wind_speed} MPH`
                // console.log(data.current.humidity)
                today.children[3].textContent = `Humidity ${data.current.humidity} %`
                // console.log(data.current.uvi)
                today.children[4].textContent = `UV Index ${data.current.uvi}`
                
                city.value = ""

                forecastTitle.children[0].textContent = "5-Day Forecast:"
                for(var i = 0; i < 5; i++){
                  
                  var forecastDate = moment.unix(data.daily[i].dt)

                  var forecastCard = document.createElement('div')
                  var title = document.createElement('h4')
                  var icon = document.createElement('img')
                  var forecastTemp = document.createElement('p')
                  var forecastWind = document.createElement('p')
                  var forecastHum = document.createElement('p')

                  forecastCard.classList.add("card")
                  
                  title.textContent = forecastDate.format("MM/DD/YYYY")
                  title.classList.add("card-title")
                  forecastCard.appendChild(title)

                  icon.src = iconURL.replace("{icon}",data.daily[i].weather[0].icon)
                  forecastCard.appendChild(icon)                  

                  forecastTemp.textContent = `Temp: ${data.daily[i].temp.day} F`
                  forecastTemp.classList.add("card-text")
                  forecastCard.appendChild(forecastTemp)

                  forecastWind.textContent = `Wind: ${data.daily[i].wind_speed} MPH`
                  forecastWind.classList.add("card-text")
                  forecastCard.appendChild(forecastWind)

                  forecastHum.textContent = `Humidity ${data.daily[i].humidity} %`
                  forecastHum.classList.add("card-text")
                  forecastCard.appendChild(forecastHum)
                  
                  forecast.appendChild(forecastCard)
                }
            })  
    })

    
}

weatherSearch.addEventListener('submit', dashGenerate)