$(document).ready(function() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
            q: "Hyderabad",
            units: "metric",
            appid: "5cac0a072499baa7d097ac0acb3758d7"
        },
        success: function(res) {
            console.log(res);

            // Populate HTML elements with values from API
            
            $('#tempCurrent').prepend(res.main.temp); // Temp converted from Kelvin scale to Celsius
            let descText = res.weather[0].description;
            descText = descText.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            $('#description').text(descText);
            $('#maxTemp').append(' ' + res.main.temp_max + '&deg;');
            $('#minTemp').append(' ' + res.main.temp_min + '&deg;');
            $('#tempFeelsLike').append(' ' + res.main.feels_like + '&deg;');
            $('#windSpeed').text(res.wind.speed);
            $('#windDeg').text(res.wind.deg);
            $('#humidity').text(res.main.humidity);
            $('#pressure').text(res.main.pressure);
            $('#visibility').text(res.visibility);

            // Periodic refresh TODO



            // Manual refresh TODO
        },
        error: function(error) {
            alert("An error occured! Check console");
            console.error(error);
        }
    });
});
