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

    getData("", API.getPlanetsArtists).then(function (result) {
        result.data.forEach(p => {

            let planetArtistsInfoWrapper = addClassToNode(createNode('div', ''), 'planet-artists-info-wrapper');
            planetArtistsInfoWrapper.appendChild(addClassToNode(createNode('h1', p.name.toUpperCase()), 'footer'));

            p.artists.forEach(a => {
                let artist = addClassToNode(createNode('div', ''), 'footer');
                artist.appendChild(addLink(createNode('a', a.artist), a.artistProfile));

                planetArtistsInfoWrapper.appendChild(artist);
            });

            arttistsInfo.appendChild(planetArtistsInfoWrapper);
        });
    }).catch(e => console.log(e.message));
};

function createNode(tagName, text) {
    let node = document.createElement(tagName);
    node.innerText = text;

    return node;
}

function addClassToNode(node, className) {
    node.classList.add(className);
    
    return node;
}

function addLink(node, href) {
    node.href = href;

    return node;
}
