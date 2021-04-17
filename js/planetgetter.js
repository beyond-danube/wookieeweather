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

    let main = document.getElementById('main');

    main.style.backgroundImage = `url('${data.artLink}')`;
    main.style.backgroundPosition = data.position;
    
    let artist = document.getElementById('artist');

    artist.innerHTML = data.artist;
    artist.href = data.artistProfile;
};

function getPlanetsArtistsToFooter() {
    
    let arttistsInfo = document.getElementById('planets-artists');

    console.log(API.getPlanetsArtists);

    getData("", API.getPlanetsArtists).then(function (result) {
        result.data.forEach(p => {
            let arttistWrapper = document.createElement('div');
            arttistWrapper.classList.add('artits-info-wrapper');

            let planetName = document.createElement('p');
            planetName.innerText = p.name.toUpperCase();

            arttistWrapper.appendChild(planetName);

            p.artists.forEach(a => {
                let artist = document.createElement('div');

                let link = document.createElement('a');

                link.innerText = a.artist;
                link.href = a.artistProfile;

                artist.appendChild(link);
                arttistWrapper.appendChild(artist);
            });

            arttistsInfo.appendChild(arttistWrapper);
        });
    }).catch(e => console.log(e.message));
};
