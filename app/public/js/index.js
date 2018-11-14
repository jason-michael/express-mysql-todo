//======================================
// FUNCTIONS
//======================================
/**
 * Returns a single todo element.
 */
function createTodoElem(name) {
    return $(`
        <li class="todoItem">
            <p class="checkbox">☐</p>
            <p class="todoName">${name}</p>
        </li>
    `);
}

/**
 * Get all todos from the DB and update the 'incomplete' list.
 */
function getTodos() {
    let todos = [];

    $.get('/api/all', data => todos = data)
        .done(() => {
            $('#newTodoInput').val('');
            $('#incompletes').empty();

            $.each(todos, (index, todo) => {
                $('#incompletes').append(createTodoElem(todo.todo_name));
            });
        })
        .catch(err => alert(err.statusText));
}

//======================================
// EVENT LISTENERS
//======================================
$('#addTodoBtn').on('click', () => {
    const newTodo = {
        todo_name: $('#newTodoInput').val(),
        completed: 0
    }

    $.post('/api/add', newTodo)
        .done(response => getTodos())
        .catch(err => alert(err.statusText));
});