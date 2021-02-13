async function getData(entity, endpoint) {

    let url = new URL(API.baseApiUrl + endpoint + entity);
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    return data;
}

function getWeather() {

    let cityFieldValue = document.getElementById('city').value;

    let city = cityFieldValue ? cityFieldValue : '';

    let path = cityFieldValue ? API.getPlanet : API.getRandomPlanet;

    getData(city, path).then(function (result) { 
        applyWeatherValues(result);        
        getData(result.name, API.getArt).then(artResult => applyIllustration(artResult)).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
};

function applyWeatherValues(forecast) {

    let weather = [];

    weather.push((parseInt(forecast.temperature) > 0 ? '+' + parseInt(forecast.temperature) : parseInt(forecast.temperature)) + '°C');

    forecast.weather.forEach(e => {
        weather.push(e);
    });

    document.getElementById('planet').innerText = forecast.name.toUpperCase();
    document.getElementById('weather').innerText = weather.join(', ');
};

function applyIllustration(data) {

    document.body.style.backgroundImage = `url('${data.artLink}')`;
    document.body.style.backgroundPosition = data.position;
    
    let artist = document.getElementById('artist');

    artist.innerHTML = data.artist;
    artist.href = data.artistProfile;
}