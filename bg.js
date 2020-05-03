const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/${imgNumber+1}.jpg`; //imgNumber+1의 이유는 Math.random()가 값을 0으로 줄수있기에
  image.classList.add("bgImage"); //css에서 수정하기위해 class를 만듬
  body.prepend(image);
}

function genRandom(){   //Math.floor은 소수점값 내림, Math.ceil은 올림
  const number = Math.floor(Math.random()*IMG_NUMBER);  //Math.random()은 임의로 값을 냄, * 숫자를 넣으면 그 숫자까지의 임의값이 나옴
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
