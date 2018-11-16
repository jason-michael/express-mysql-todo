//============================
// INITIALIZATION
//============================

getTodos();


//============================
// FETCHING & RENDERING
//============================

function getTodos() {
    getCompletedTodos();
    getIncompleteTodos();
}

function getIncompleteTodos() {
    const incompleteList = $('#incompletes');
    let incompleteTodos = [];

    $.get('/api/incomplete', data => {
            incompleteTodos = data;
        })
        .done(() => {
            incompleteList.empty();

            if (!incompleteTodos.length) {
                incompleteList.append('<p>Nothing to do yet.</p>');
            }

            $.each(incompleteTodos, (index, todo) => {
                incompleteList.append(createTodoElem(todo));
            });
        })
        .catch(err => {
            alert(err.statusText);
        });
}

function getCompletedTodos() {
    const completeList = $('#completes');
    let completedTodos = [];

    $.get('/api/complete', data => {
            completedTodos = data;
        })
        .done(() => {
            completeList.empty();

            if (!completedTodos.length) {
                completeList.append('<p>Nothing completed yet.</p>');
            }

            $.each(completedTodos, (index, todo) => {
                completeList.append(createTodoElem(todo));
            });
        })
        .catch(err => {
            alert(err.statusText);
        });
}

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
    </li>`);
}

//===========================
// EVENT HANDLERS
//===========================

function addNewTodo(todo, callback) {
    $.post('/api/add', todo)
        .done(callback())
        .catch(err => alert(err.statusText));
}

function deleteTodo(id, callback) {
    $.ajax({
            type: 'DELETE',
            url: "/api/delete/" + id,
            data: id,
        })
        .done(callback())
        .catch(err => alert(err.statusText));
}

function updateTodo(todo, callback) {
    $.ajax({
            type: 'PUT',
            url: '/api/update',
            data: todo
        })
        .done(callback())
        .catch(err => alert(err.statusText));
}

//============================
// EVENT LISTENERS
//============================

/**
 * Add todo (on click)
 */
$('#addTodoBtn').on('click', () => {
    const newTodo = {
        task: $('#newTodoInput').val(),
        done: 0
    }
    addNewTodo(newTodo, getTodos);
    $('#newTodoInput').val('');
});

/**
 * Add todo (on enter)
 */
$('#newTodoInput').on('keyup', function (e) {
    if (e.keyCode !== 13) return;

    const newTodo = {
        task: $('#newTodoInput').val(),
        done: 0
    }
    addNewTodo(newTodo, getTodos);
    $('#newTodoInput').val('');
});

/**
 * Toggle todo
 */
$(document).on('click', '.toggleBtn', function () {
    const parent = $(this).parent().parent();
    const toggledTodo = {
        id: $(parent).attr('todoid'),
        task: $(parent).attr('todoname'),
        done: ($(parent).attr('tododone') == 1) ? 0 : 1, // Toggle 0 and 1
    }
    updateTodo(toggledTodo, getTodos);
});

/**
 * Delete todo
 */
$(document).on('click', '.deleteBtn', function () {
    const parent = $(this).parent().parent();
    const idToDelete = $(parent).attr('todoId');

    if (!idToDelete) return;

    deleteTodo(idToDelete, getTodos);
});

/**
 * Edit todo: show edit input
 */
$(document).on('click', '.taskBtn', function () {
    const taskInput = $(this).next();
    $(taskInput).show().focus();
    $(this).hide();
});

/**
 * Edit todo: (on blur) update todo and hide edit input
 */
$(document).on('blur', '.editTask', function () {
    $(this).prev().show(); // Task button
    $(this).hide(); // Input

    const parent = $(this).parent().parent();
    const updatedTask = $(this).val().trim();
    const originalTask = $(parent).attr('todotask');
    const updatedTodo = {
        id: parseInt($(parent).attr('todoid')),
        task: updatedTask,
        done: $(parent).attr('tododone')
    }

    if (updatedTask === originalTask) return;

    updateTodo(updatedTodo, getTodos);
});

/**
 * Edit todo: (on enter) update todo and hide edit input
 */
$(document).on('keyup', '.editTask', function (e) {
    if (e.keyCode !== 13) return;

    $(this).prev().show(); // Task button
    $(this).hide(); // Input

    const parent = $(this).parent().parent();
    const updatedTask = $(this).val().trim();
    const originalTask = $(parent).attr('todotask');
    const updatedTodo = {
        id: parseInt($(parent).attr('todoid')),
        task: updatedTask,
        done: $(parent).attr('tododone')
    }

    if (updatedTask === originalTask) return;

    updateTodo(updatedTodo, getTodos);
});