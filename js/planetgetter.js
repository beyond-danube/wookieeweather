async function getPlanet(city) {

    let url = new URL('https://wookiee-weather.herokuapp.com/getPlanet/' + city + '/' + document.getElementById('key').value)
    let response = await fetch(url);

    let data = await response.json();

    console.log(data);

    return data;
}

async function getArt(planet) {

    let url = new URL('https://wookiee-weather.herokuapp.com/getArt/' + planet + '/' + document.getElementById('key').value)
    let response = await fetch(url);

    let data = await response.json();

    console.log(data);

    return data;    
}

function getWeather() {
    getPlanet(document.getElementById('city').value).then(function (result) {
        applyWeatherValues(result);        
        getArt(result.planet).then(artResult => applyIllustration(artResult)).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
};

function applyWeatherValues(forecast) {
    document.getElementById('planet').innerText = forecast.planet.toUpperCase();
    document.getElementById('weather').innerText = (parseInt(forecast.temperature) > 0 ? '+' + parseInt(forecast.temperature) : parseInt(forecast.temperature)) + '°C'
};

function applyIllustration(data) {

    document.body.style.backgroundImage = `url('${data.artLink}')`;
    document.body.style.backgroundPosition = data.position;
    
    let artist = document.getElementById('artist');

    artist.innerHTML = data.artist;
    artist.href = data.artistProfile;
}