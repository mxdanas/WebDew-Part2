var todoList = [];
var addBtn = document.getElementById('AddTaskBtn');
addBtn.addEventListener('click', function () {
    addTodo();
});
function addTodo() {
    var inputElement = document.getElementById('taskName');
    var name = inputElement.value.trim();
    if (!name) {
        alert('please enter a task');
        return;
    }
    todoList.push({
        name: name,
        isChecked: false
    });
    inputElement.value = '';
    renderTodo();
}
function renderTodo() {
    var todoListHtml = '';
    for (var i = 0; i < todoList.length; i++) {
        var todoObject = todoList[i];
        var name_1 = todoObject.name;
        var isChecked = todoObject.isChecked ? 'checked' : '';
        var className = todoObject.isChecked ? 'completed' : '';
        var html = "\n            <div class=\"li\">\n                <input type=\"checkbox\" ".concat(isChecked, " onchange=\"toggleCheckbox(").concat(i, ")\">\n                <span class=\" todoElement ").concat(className, " \">").concat(name_1, "</span>\n                <button onclick=\"deleteTodo(").concat(i, ")\" class=\"delCss\">Delete</button>\n            </div>\n        ");
        todoListHtml += html;
    }
    var generatedHTML = document.getElementById('showToDos-js');
    generatedHTML.innerHTML = todoListHtml;
}
function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodo();
}
function toggleCheckbox(index) {
    todoList[index].isChecked = !todoList[index].isChecked;
    renderTodo();
}
