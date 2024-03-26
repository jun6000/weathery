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

function getDay(unixTimestamp) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let idx = new Date(unixTimestamp * 1000).getDay();
    return days[idx];
}

function getWeatherSymbol(weatherCode) {
    let codeSrcMap = {
        200: "../assets/" // Thunderstorm
        300: "../assets/" // Drizzle
        500: "../assets/" // Rain
        600: "../assets/" // Snow
        700: "../assets/" // Atmosphere
        800: "../assets/" // Clear
        801: "../assets/" // Clouds
    };

    // Identify weather
    if (weatherCode != 800) {
        if (weatherCode > 800)
            weatherCode = 801;
        else
            weatherCode -= weatherCode % 100;
    }

    // Create img element to be returned
    let symbolElement = $("<img>");
    symbolElement.attr("src", 
}

function populateForecastData(data) {
    // Get one forecast entry per day
    let forecast = data.list,
        currentDay = '',
        list = [];

    for (let i = 0; i < forecast.length; i++) {
        let tmp = getDay(forecast[i].dt);
        if (tmp != currentDay) {
            list.push(forecast[i]);
            currentDay = tmp;
        }
    };

    $('table tr').each(function(tblIdx, row) {
        // For today and tomorrow don't insert day
        if (tblIdx > 1)
            $(row).find('td:first-child').text(getDay(list[tblIdx].dt));

        // Insert temp data
        $(row).find('td:last-child').html("<span>" + Math.round(list[tblIdx].main.temp_max) + "&deg;</span><span>/" + Math.round(list[tblIdx].main.temp_min) + "&deg;</span>");
        // $(row).find('td:eq(1)').html(
    });
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
            populateForecastData(res);
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
