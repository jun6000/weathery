function populateWeatherData(data) {
    $('#location').text(`${data.name}, ${data.sys.country}`);
    $('#tempCurrent').html(data.main.temp + '&deg;');
    let descText = data.weather[0].description;
    descText = descText.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    $('#description').text(descText);
    $('#maxTemp').html('High ' + data.main.temp_max + '&deg; &bull;');
    $('#minTemp').html('Low ' + data.main.temp_min + '&deg;');
    $('#tempFeelsLike').html('Feels like ' + data.main.feels_like + '&deg;');
    $('#windSpeed span').text(data.wind.speed);
    $('#windDeg span').html(data.wind.deg + '&deg;');
    $('#humidity span').text(data.main.humidity);
    $('#pressure span').text(data.main.pressure);
    $('#visibility span').text(data.visibility);
}

function populateForecastData(data) {
    
}

function getWeatherData() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
            q: "Hyderabad",
            units: "metric",
            appid: "5cac0a072499baa7d097ac0acb3758d7"
        },
        success: function(res) {
            console.log(res);
            populateWeatherData(res);
        },
        error: function(error) {
            alert("An error occured! Check console");
            console.error(error);
        }
    });
}

function getForecastData() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast",
        data: {
            q: "Hyderabad",
            units: "metric",
            appid: "5cac0a072499baa7d097ac0acb3758d7"
        },
        success: function(res) {
            console.log(res);
        },
        error: function(error) {
            alert("An error occured! Check console");
            console.error(error);
        }
    });
}

// Main
$(document).ready(function() {
    getForecastData();
    getWeatherData();

   /*  // Periodic refresh
    let intervalId = setInterval(function() {
        getWeatherData();
    }, 10000); */

    // Manual refresh
    $('#refreshButton').click(function() {
        getWeatherData();
    });
});
