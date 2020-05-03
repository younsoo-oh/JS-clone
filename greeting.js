const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// 로컬스토리지 currentUser의 key부분에 넣은 text를 value로 저장
function saveName(text){
  localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
  event.preventDefault();  //이벤트가 발생하지않도록
  const currentValue = input.value;
  paintGreeting(currentValue); //text에 currentValue를 넣어서 넣은 값이 나타나게함
  saveName(currentValue);
}

// currentUser가 없는경우에 요청
function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// currentUser가 있는경우에 나타남
function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

// 로컬스토리지에서 값을 가져오기위한 함수
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }
  else{
    paintGreeting(currentUser);
  }
}
function init(){
  loadName();
}

init();
