const API = {
    baseApiUrl: 'http://localhost:5000/',
    getPlanet: 'getPlanet/',
    getArt: 'getArt/',
    key: '90172d2d-cf9d-4819-94c1-6898abbbb98f'
}

async function getData(entity, endpoint) {

    let url = new URL(API.baseApiUrl + endpoint + entity + '/' + getKey());
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    return data;
}

function getKey() {
    return API.key ? API.key : document.getElementById('key').value;
}

function getWeather() {
    getData(document.getElementById('city').value, API.getPlanet).then(function (result) { 
        applyWeatherValues(result);        
        getData(result.planet, API.getArt).then(artResult => applyIllustration(artResult)).catch(e => console.log(e.message));
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