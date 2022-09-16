function currentClimate(){
    const cityName = document.querySelector('.input-current-climate');

    const apiOpenWeatherMap = {
        key: "f0a2e17cbb21681825b8698392313be0",
        url: "https://api.openweathermap.org/data/2.5/weather?q=",
        units: "metric",
        langs: "pt_br",
    }

    function displayConstructor(weather){
        setTemperature(weather);
        setClimate(weather);
        setCityName(weather);
        setMaxAndMinTemperature(weather);
        setHumidity(weather);
        setIcon(weather);
        setWind(weather);
        setFeelsLikeTemperature(weather)
    }

    function setTemperature(weather){
        const temperature = document.querySelector('.current.temperature');
        temperature.innerText = `${parseFloat(weather.main.temp).toFixed(1)}°C`;
    }

    function setFeelsLikeTemperature(weather){
        const feelsLike = document.querySelector('.feels_like.temperature');
        feelsLike.innerText = `Sensação térmica: ${parseFloat(weather.main.feels_like).toFixed(1)}°C`
    }

    function setClimate(weather){
        const climate = document.querySelector('.prevision');
        climate.innerText = captalize(weather.weather[0].description);
    }

    function setCityName(wheater){
        const cityNameNow = document.querySelector('.city-name');
        cityNameNow.innerText = `${wheater.name}, ${wheater.sys.country}`;
    }

    function setMaxAndMinTemperature(wheater){
        const minTemperature = document.querySelector('.min.temperature');
        const maxTemperature = document.querySelector('.max.temperature');

        minTemperature.innerText = `${parseFloat(wheater.main.temp_min).toFixed(1)}°C`;
        maxTemperature.innerText = `${parseFloat(wheater.main.temp_max).toFixed(1)}°C`;
    }

    function setHumidity(wheater){
        const humidity = document.querySelector('.humidity.temperature');
        humidity.innerText = `${wheater.main.humidity}%`;
    }

    function setIcon(weather){
        const icon = document.querySelector('.img-icon');
        icon.src = `src/icons/icons-climate/${weather.weather[0].icon}.png`;
    }

    function setWind(weather){
        const wind = document.querySelector('.wind.temperature');

        wind.innerText = `${parseFloat(weather.wind.speed).toFixed(1)}Km/h`;
    }

    function showPosition(position){
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        loadResultCoords(latitude, longitude);
    }

    function captalize(string){
        const originalString = string;
        const cutString = originalString.slice(1, originalString.lenght)
        const captalizeLetter = originalString[0].toUpperCase();

        return `${captalizeLetter}${cutString}`
    }

    async function requestApi (city){
        const climateRequest = await fetch(`${apiOpenWeatherMap.url}${city}&lang=${apiOpenWeatherMap.langs}&units=${apiOpenWeatherMap.units}&APPID=${apiOpenWeatherMap.key}`)
        .then(response =>{
            if(!response.ok) throw new Error(`CIDADE NÃO ENCONTRADA! Erro: ${response.status}`)

            return response.json();
        })
        .catch(error => {
            alert(error.message)
        });

        displayConstructor(climateRequest);
        console.log(climateRequest);
        
    }

    function resetInput(){
        cityName.value = '';
    }

    async function loadResultCoords(latitude, longitude){
        const loadOnCoords = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${apiOpenWeatherMap.langs}&units=${apiOpenWeatherMap.units}&APPID=${apiOpenWeatherMap.key}`)
        .then(response =>{
            if(!response.ok) throw new Error(`CIDADE NÃO ENCONTRADA! Erro: ${response.status}`);

            return response.json();
        })
        .catch(error => {
            alert(error.message)
        });
        console.log(loadOnCoords)
        displayConstructor(loadOnCoords);
    }

    // Seção de eventos
    document.addEventListener('click', e =>{
        const el = e.target;
        if (el.classList.contains('request-current-climate') || el.classList.contains('img-search')) {
            requestApi(cityName.value);
            captalize(cityName.value);
            resetInput();
            cityName.focus();
    }
    })

    document.addEventListener('keypress', e =>{
        if (e.keyCode === 13) {
            requestApi(cityName.value);
            captalize(cityName.value);
            resetInput();
            cityName.focus();
        };
    })

    window.addEventListener('load', () =>{
        if(!'geolocation' in navigator) alert('Não suporta geolocalização!');
        navigator.geolocation.getCurrentPosition(showPosition);
    })

}
currentClimate();