function currentClimate(){
    const cityName = document.querySelector('.input-current-climate');

    const apiOpenWeatherMap = {
        key: "f0a2e17cbb21681825b8698392313be0",
        url: "https://api.openweathermap.org/data/2.5/weather?q=",
        units: "metric",
        langs: "pt_br",
    }

    async function requestApi (city){
        const climateRequest = await fetch(`${apiOpenWeatherMap.url}${city}&lang=${apiOpenWeatherMap.langs}&units=${apiOpenWeatherMap.units}&APPID=${apiOpenWeatherMap.key}`)
        .then(response =>{
            if(!response.ok){
                throw new Error(`CIDADE NÃO ENCONTRADA! Erro: ${response.status}`)
            }

            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })

        displayConstructor(climateRequest)
        console.log(climateRequest)
        
    }

    function displayConstructor(weather){
        setTemperature(weather);
        setClimate(weather);
        setCityName(weather);
        setMaxAndMinTemperature(weather);
        setHumidity(weather);
        setIcon(weather);
    }

    function setTemperature(weather){
        const temperature = document.querySelector('.current.temperature');

        temperature.innerText = `${parseFloat(weather.main.temp).toFixed(1)}°C`;
    }

    function setClimate(weather){
        const climate = document.querySelector('.prevision')

        climate.innerText = weather.weather[0].description;
    }

    function setCityName(wheater){
        const cityNameNow = document.querySelector('.city-name');

        cityNameNow.innerText = `${wheater.name}, ${wheater.sys.country}`;
    }

    function setMaxAndMinTemperature(wheater){
        const minTemperature = document.querySelector('.min.temperature');
        const maxTemperature = document.querySelector('.max.temperature');

        minTemperature.innerText = `${parseFloat(wheater.main.temp_min).toFixed(1)}°C`
        maxTemperature.innerText = `${parseFloat(wheater.main.temp_max).toFixed(1)}°C`
    }

    function setHumidity(wheater){
        const humidity = document.querySelector('.humidity.temperature');

        humidity.innerText = `${wheater.main.humidity}%`
    }

    function setIcon(weather){
        const icon = document.querySelector('.img-icon');
        icon.src = `src/icons/icons-climate/${weather.weather[0].icon}.png`
    }

    function showPosition(position){
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        loadResultCoords(latitude, longitude)
    }

    async function loadResultCoords(latitude, longitude){
        const loadOnCoords = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${apiOpenWeatherMap.langs}&units=${apiOpenWeatherMap.units}&APPID=${apiOpenWeatherMap.key}`)
        .then(response =>{
            if(!response.ok){
                throw new Error(`CIDADE NÃO ENCONTRADA! Erro: ${response.status}`)
            }

            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })

        displayConstructor(loadOnCoords)
    }
    

    document.addEventListener('click', e =>{
        const el = e.target;
        if (el.classList.contains('request-current-climate') || el.classList.contains('img-search')){
            console.log('funcionou')
            requestApi(cityName.value)
        }
    })



    document.addEventListener('keypress', e =>{
        
        if (e.keyCode === 13){
            console.log('funcionou')
            requestApi(cityName.value)
        }
    })

    window.addEventListener('load', () =>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(showPosition)
        }else{
            alert('Não suporta geolocalização!')
        }

        loadResultCoords()

    })
}
currentClimate();