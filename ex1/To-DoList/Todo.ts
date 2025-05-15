type toDoObj = {
    name:string
    isChecked:boolean
}

let todoList:toDoObj[] = [];

const addBtn = document.getElementById('AddTaskBtn') as HTMLButtonElement;
addBtn.addEventListener('click', ()=>{
    addTodo();
});
function addTodo(){
    const inputElement = document.getElementById('taskName') as HTMLInputElement;
    const name :string = inputElement.value.trim();

    if(!name){
        alert('please enter a task');
        return;
    }
    todoList.push({
        name:name,
        isChecked: false
    });
    inputElement.value = '';
    renderTodo();
}
function renderTodo():void{
    let todoListHtml = '';
    for(let i=0;i<todoList.length;i++){
        const todoObject :toDoObj= todoList[i];
        const name = todoObject.name;
        const isChecked = todoObject.isChecked ? 'checked' : '';
        const className = todoObject.isChecked ? 'completed' : '';

        const html = `
            <div class="li">
                <input type="checkbox" ${isChecked} onchange="toggleCheckbox(${i})">
                <span class=" todoElement ${className} ">${name}</span>
                <button onclick="deleteTodo(${i})" class="delCss">Delete</button>
            </div>
        `;
        todoListHtml+=html;
    }
    const generatedHTML = document.getElementById('showToDos-js') as HTMLElement
    generatedHTML.innerHTML = todoListHtml;
}
function deleteTodo(index:number){
    todoList.splice(index,1);
    renderTodo();
}
function toggleCheckbox(index:number){
    todoList[index].isChecked = !todoList[index].isChecked;
    renderTodo();
}