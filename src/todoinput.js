const todo_form = document.querySelector("#Todo_Input");
const todo_input = document.querySelector("#Todo_Input input:first-child");
const todo_num = document.querySelector("#Todo_Input > #priorityInput");
const todo1 = document.querySelector(".box1 > ul");
const todo2 = document.querySelector(".box2 > ul");
const todo3 = document.querySelector(".box3 > ul");
const todo4 = document.querySelector(".box4 > ul");

const clearlist = document.getElementById("clearlist");

let toDos = []

const ToDos_Key = "todos"

function saveToDos(){
  localStorage.setItem(ToDos_Key, JSON.stringify(toDos))
}

function ClearTodo(event) {
  const $span = document.createElement("span")
  
  // target은 이벤트를발생시킨 html 태그 button button의 부모태그는 li태그
  const li = event.target.parentElement
  const intext = event.target.parentElement.innerText

  $span.innerHTML = intext

  clearlist.appendChild($span)

  li.remove()

}


function paintTodos(newTodo, newNum) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${newTodo}</span> <button class="clear">✔</button>
    `;

  if (newNum == "1") {
    todo1.appendChild(li);
  } else if (newNum == "2") {
    todo2.appendChild(li);
  } else if (newNum == "3") {
    todo3.appendChild(li);
  } else if (newNum == "4") {
    todo4.appendChild(li);
  } else {
    alert("1번부터4번까지만 지정가능")
  }
 
   // querySelectorAll로 선택된 버튼요소들 배열형태로 반환
   const clearButtons=li.querySelectorAll("button.clear")
   clearButtons.forEach((button)=>{
       button.addEventListener("click", ClearTodo);
   });
}

function handleSubmit(event) {
  event.preventDefault();
  
  const newTodo=todo_input.value;
  const newNum=todo_num.value;
 
  if (newTodo.trim() !== "" && newNum !== "") { // 입력값이 공백이 아닌 경우에만 처리
      todo_input.value="";
      todo_num.value=""; // 추가: 우선순위 입력 필드 초기화

 

     // toDos.push(`{text : ${newTodo}, key : ${newNum}}`)
     toDos.push([newTodo, newNum]);     
      paintTodos(newTodo, newNum);
      saveToDos();
  }
 }

todo_form.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(ToDos_Key) 


if (savedToDos) {
  const parseToDos = JSON.parse(savedToDos);
  toDos = parseToDos
  parseToDos.forEach(item => paintTodos(item[0],item[1]))
}
