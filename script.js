const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')



let id = 100;
let todos = [];

function newTodo() {
  let text = prompt('What do you need to do?')
  let todo = {
    id: id++, text, checked: false};
  todos.push(todo);
  console.log("todos", todos);
  render();
}

function updateCount() {
  itemCountSpan.innerText = list.children.length;
  uncheckedCountSpan.innerText = [...list.children].map(item=> item.firstElementChild).filter(item=> !item.checked).length;
}
function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  updateCount();
}


function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onclick="toggleTodo(${todo.id})">
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.checked = !todo.checked;
  }
  updateCount();
  render();
}


function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  updateCount();
  render();
}

