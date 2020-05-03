const weather = document.querySelector(".js-weather");

const API_KEY = "17c75a8202ca0e2bdf8e80f6a37342ea";
const COORDS = 'coords';

// 크롬 개발자도구에서 network에 fetch가 잘 되있는지 확인가능
function getWeather(lat,lng){  //fetch의 안에는 가져올 데이터(주소)를 적음
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
  .then(function(response){  //then은 위에 fetch데이터가 완료된 다음 호출하게함
    return response.json();  //json을 호출
  })
  .then(function(json){  
    const temperature = json.main.temp; //json 안의 온도(temp)
    const place = json.name;  //json 안의 현재 위치(name)
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,  //latitude:latitude와 같음
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log("Cant access geo location");
}

// 현재 위치를 찾게함
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{  //이미 현재위치가 저장된경우 
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
