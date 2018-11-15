//======================================
// FUNCTIONS
//======================================
function createTodoElem(todo) {
    let iconClass = (todo.done) ? 'fa-check-square' : 'fa-square';
    return $(`
        <li class="todoItem field has-addons" todoid=${todo.id} todotask="${todo.task}" tododone=${todo.done}>
            <div class="control">
                <button class="button toggleBtn"}>
                    <i class="far ${iconClass}"></i>
                </button>
            </div>
            <div class="control is-expanded taskControl">
                <button class="taskBtn button is-fullwidth">${todo.task}</button>
                <input class="editTask" type="text" value="${todo.task}">
            </div>
            <div class="control">
                <button class="button deleteBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </li>
    `);
}

// TODO: refactor getTodos()
function getTodos() {
    let allTodos = [];
    let completedTodos = [];
    let incompleteTodos = [];

    $.get('/api/all', data => allTodos = data)
        .done(() => {
            // Reset input and lists.
            $('#newTodoInput').val('');
            $('#incompletes').empty();
            $('#completes').empty();

            // Sort all todos into complete/incomplete.
            // This is so we can add placeholder text if a list is empty (below).
            $.each(allTodos, (index, todo) => {
                if (todo.done) {
                    completedTodos.push(todo);
                    $('#completes').append(createTodoElem(todo));
                } else {
                    incompleteTodos.push(todo);
                    $('#incompletes').append(createTodoElem(todo));
                }
            });

            // Add placeholder text on empty list
            if (!incompleteTodos.length) {
                $('#incompletes').append('<p>Nothing to do yet.</p>');
            }

            if (!completedTodos.length) {
                $('#completes').append('<p>Nothing completed yet.</p>');
            }
        })
        .catch(err => alert(err.statusText));
}

//======================================
// EVENT LISTENERS
//======================================
// TODO: refactor listeners
// Add new todo
$('#addTodoBtn').on('click', () => {
    const newTodo = {
        task: $('#newTodoInput').val(),
        done: 0
    }

    $.post('/api/add', newTodo)
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});

// Toggle todo
$(document).on('click', '.toggleBtn', function () {
    const parent = $(this).parent().parent();

    const done = ($(parent).attr('tododone') == 1) ? 0:1;

    const todo = {
        id: $(parent).attr('todoid'),
        task: $(parent).attr('todoname'),
        done,
    }

    $.ajax({
            type: 'PUT',
            url: '/api/update',
            data: todo,
        })
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});

// Delete todo
$(document).on('click', '.deleteBtn', function () {
    const parent = $(this).parent().parent();
    const idToDelete = $(parent).attr('todoId');

    $.ajax({
            type: 'DELETE',
            url: "/api/delete/" + idToDelete,
            data: idToDelete,
        })
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});

$(document).on('click', '.taskBtn', function () {
    const editInput = $(this).next();
    $(this).hide();
    editInput.show().focus();
});

$(document).on('focus', '.editTask', function () {
    const parent = $(this).parent().parent();
    console.log($(parent).attr('todotask'))
});

$(document).on('blur', '.editTask', function () {

    // TODO: should only send request if new task is different than original task.

    // TODO: should work on keyup[enter] too. (will be easy if all this was put into fn)

    // UI
    $(this).prev().show();
    $(this).hide();

    const parent = $(this).parent().parent();
    const updatedTodo = {
        id: $(parent).attr('todoid'),
        task: $(this).val().trim(),
        done: $(parent).attr('tododone'),
    }

    $.ajax({
            type: 'PUT',
            url: '/api/update',
            data: updatedTodo,
        })
        .done(() => getTodos())
        .catch(err => alert(err.statusText));
});

getTodos();