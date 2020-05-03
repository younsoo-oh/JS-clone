const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours
}:${minutes < 10 ? `0${minutes}` : minutes
}:${seconds < 10 ? `0${seconds}`: seconds}`;
}

// 만든함수를 실행하게해주는 역할
function init(){
  getTime();
  setInterval(getTime,1000);  //setInterval(호출할함수, 지연시간); 매초마다 움직이는게 표시
}

init();
