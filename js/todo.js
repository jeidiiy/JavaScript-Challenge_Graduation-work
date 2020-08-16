const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";
let uniqueNumber = 1;
let toDos = [];

function deleteToDo(event) {
  // ToDo 리스트 지우는 메소드

  const btn = event.target;
  //이벤트를 전달한 객체에 대한 참조

  const li = btn.parentNode;
  // 참조받은 내용 중 parentNode의 값을 li에 저장

  toDoList.removeChild(li);
  // toDoList의 자식들에서 li 삭제

  const cleanToDos = toDos.filter(function (toDo) {
    // 조건에 맞지 않는 요소는 배열에서 삭제하는 filter 메소드를 사용하여 배열을 refresh함.

    return toDo.id !== parseInt(li.id);
    // 조건 : 이벤트가 발생한 li의 id와 toDo의 id가 같지 않으면 true, 같으면 false로 배열에서 삭제
  });

  toDos = cleanToDos;
  // toDos를 refresh한 cleanToDos로 바꿈

  saveToDos();
  // 저장
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // localStorage의 todos에 toDos 객체를 string으로 변환한 값을 set함
}

function paintToDo(text) {
  const li = document.createElement("li");
  // html에 li element 생성하는 변수 li

  const delBtn = document.createElement("button");
  // html에 button element 생성하는 변수 delBtn

  const span = document.createElement("span");
  // html에 span element 생성하는 변수 span

  const newId = uniqueNumber++;
  // id 중복 제거

  delBtn.innerText = "❌";
  // delBtn의 텍스트를 지정

  delBtn.addEventListener("click", deleteToDo);
  // delBtn에서 click 이벤트가 발생하면 deleteToDo 메소드 실행

  span.innerText = text;
  // span의 텍스트 지정

  li.appendChild(span);
  // li 맨 아래에 span element 추가

  li.appendChild(delBtn);
  // li 맨 아래에 delBtn element 추가

  li.id = newId;
  // li의 아이디를 newId로 지정

  toDoList.appendChild(li);
  // toDolist의 맨 아래에 li 추가

  const toDoObj = {
    // 입력받은 text와 id를 가지는 객체 생성
    text: text,
    id: newId,
  };

  toDos.push(toDoObj); // toDos 배열에 toDoObj push
  saveToDos(); // 변경된 toDoObj 저장
}

function handleSubmit(event) {
  event.preventDefault();
  // 브라우저의 기본 동작 막기

  const currentValue = toDoInput.value;
  // toDoInput의 value값

  paintToDo(currentValue);
  // paintToDo 메소드 실행

  toDoInput.value = "";
  // Input값 공백으로 입력
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  // localStorage에서 TODOS_LS의 데이터를 가져옴

  if (loadedToDos !== null) {
    // todo 리스트가 존재한다면
    const parsedToDos = JSON.parse(loadedToDos);
    // string으로 되어 있는 loadedToDos를 객체로 변환한 값을 parsedToDos에 저장

    parsedToDos.forEach(function (toDo) {
      // parsedToDos의 각 객체에 대하여 paintToDo 메소드를 실행

      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  // toDoForm에서 "submit" event가 발생하면 handleSubmit 메소드 실행
}

init();
