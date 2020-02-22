var apiKey = "0fd872b69999056195f0a36444a655c6"

function weather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //Date//
        var showDate = Date(Date.now())
        $(".date").text("Today is:" + " " + showDate)

        //Define Variables//
        var city = $(".city").text("City Name:" + " " + response.name);
        var temperature = $(".temperature").text("Temperature (F) " + response.main.temp);
        var humidity = $(".humidity").text("Humidity: " + response.main.humidity);
        var conditions = $(".conditions").text("Conditions:" + " " + response.weather[0].description);
        var windSpeed = $(".wind-speed").text("Wind Speed: " + response.wind.speed);
        var icon = $("<img>");
        icon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

        //Results Div//
        $("#resultShowHere").append(city, temperature, humidity, conditions, windSpeed, icon);

        //Save Div//
        var saveSearch = $("<div>")
        saveSearch.append(response.name + " ")
        $("#searchHistoryHere").append(saveSearch)





    });
}

function forecast(city) {

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + apiKey;

    //Five Day Div//

    $.ajax({
        url: queryURLForecast,
        method: 'GET'
    }).then(function (response) {
         
        // Storing an array of results in the results variable
        var results = response.list;
        // Used filter to create a new array & captured new array into five day"//
        var fiveDays = results.filter( function(weather_object){
            return weather_object.dt_txt.split(" ")[1]==="12:00:00"
        });
        console.log(fiveDays)
        //empty 5day div--------
        $("#fiveDayHere").empty();
        
        
        for (var i=0; i<fiveDays.length; i++){
            var temp = fiveDays[i].main.temp;
            var hum = fiveDays[i].main.humidity;
            
            var pTemp = $("<p>").text("Temp: " + temp);
         var pHum = $("<p>").text("Humidity " + hum);
         var icon = $("<img>");
          
         icon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
        //  fiveDayDiv.append(icon);
        //  fiveDayDiv.append(pTemp);
        //  fiveDayDiv.append(pHum);
        var fiveDayDiv = $("<div>");
        
        fiveDayDiv.append(icon, pTemp, pHum)
         
        $("#fiveDayHere").append( fiveDayDiv);
        

        }




           


        })
}


$("#submitIt").on("click", function (event) {
    event.preventDefault();
    $("#userResponse").empty();

    var getCity = $("#userResponse").val();


    localStorage.setItem("city", getCity);
    localStorage.getItem(getCity);
    weather(getCity);
    forecast(getCity);



});





