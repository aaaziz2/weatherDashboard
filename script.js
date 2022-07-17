var city = document.querySelector("#city")
var weatherSearch = document.querySelector("#weatherSearch")

var url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=820ed8269e09bb46f1883762931ddaef"

function dashGenerate(event){
    event.preventDefault()
    url = url.replace("{city name}",city.value)
    console.log(url)

    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        console.log(data.main.temp)
        
    
    })
      
}

weatherSearch.addEventListener('submit', dashGenerate)