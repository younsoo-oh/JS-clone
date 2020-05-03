const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

// html의 값과 로컬스토리지의 값을 지움
function deleteToDo(event){
  const btn = event.target; //무엇을 삭제해야되는지
  const li = btn.parentNode; 
  toDoList.removeChild(li);  //html에서 li를 지우게됨
  const cleanToDos = toDos.filter(function(toDo){  //배열에서 특정 조건을 만족하는 값들만 따로 추출하여 새로운 배열을 만듬
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// toDos에 넣어진것을 로컬에 저장
function saveToDos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));  //js는 로컬스토리지에 모든데이터를 string으로 함, JSON.stringify는 js객체를 string으로 바꿔줌
}

function paintToDo(text){
  const li = document.createElement("li");  //createElement를 사용하여 li를 만듬
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;  //글자쓴것이 나오게 span을 넣음
  li.appendChild(delBtn);  //appendChild()는 새로운 노드를 해당 노드의 자식 노드 리스트의 맨 마지막에 추가
  li.appendChild(span);
  li.id = newId; //li에도 Id를 배정
  toDoList.appendChild(li);
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);  //toDos의 array안에 toDoObj를 넣음
  saveToDos();  //마지막에 넣어주어야 로컬스토리지에 저장가능
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //input에 값을 넣고 엔터를 누르면 값이 남지않고 없어지게함(submit같이)
}


function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos); //JSON.parse는 JSON 포맷의 string을 js 객체로 변경
    parsedToDos.forEach(function(toDo){   //forEach는 array에 있는것을 각각 실행
      paintToDo(toDo.text);  //parsedToDos의 text들이 불려나옴
    });
  }
  }

function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);
}
init();
