//======================================
// FUNCTIONS
//======================================
/**
 * Returns a single todo element.
 */
function createTodoElem(name, id) {
    return $(`
        <li class="todoItem field has-addons">
            <div class="control">
                <button class="button toggleBtn">
                    <i class="far fa-square"></i>
                </button>
            </div>
            <div class="control is-expanded">
                <button class="nameBtn button is-fullwidth">${name}</button>
            </div>
            <div class="control">
                <button class="button deleteBtn" todoId=${id}>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </li>
    `);
}

/**
 * Get all todos from the DB and updates the 'incomplete' list.
 */
function getTodos() {
    let todos = [];

    $.get('/api/all', data => todos = data)
        .done(() => {
            $('#newTodoInput').val('');
            $('#incompletes').empty();

            if (!todos.length) {
                $('#incompletes').append('<p>No todos yet.</p>')
            } else {
                $.each(todos, (index, todo) => {
                    $('#incompletes').append(createTodoElem(todo.todo_name, todo.id));
                });
            }
        })
        .catch(err => alert(err.statusText));
}

//======================================
// EVENT LISTENERS
//======================================
// Add new todo
$('#addTodoBtn').on('click', () => {
    const newTodo = {
        todo_name: $('#newTodoInput').val(),
        completed: 0
    }

    $.post('/api/add', newTodo)
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});

// Delete todo
$(document).on('click', '.deleteBtn', function () {
    const idToDelete = $(this).attr('todoId');

    $.ajax({
            type: "DELETE",
            url: "/api/delete/" + idToDelete,
            data: idToDelete,
        })
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});