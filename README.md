# SimpleTodo
#### Because the world needed another todo app.

This is a basic Node application with an Express/MySQL backend. Features include standard todo list functionality: add, toggle, edit, and delete todos, all stored in a MySQL database.

This app is deployed on Heroku and can be found [here.](https://desolate-ravine-82175.herokuapp.com/)

<small><strong>Note:</strong> Becuase this is a Heroku app initial load my be slow.</small>

![1](https://user-images.githubusercontent.com/30272940/48655852-8c44cd00-e9e2-11e8-8f54-394877f4f30e.jpg)

## Quick Start
```
# Clone
git clone git@github.com:jason-michael/express-mysql-todo.git && cd express-mysql-todo

# Install
npm i

# Start
npm run start

# Watch (optional)
npm i nodemon -g
npm run watch
```

## Features
#### ➕ Add
Enter a todo and press enter or click the **+**. New todos are added to **Pending**. Todo names cannot be blank.

#### ✏️ Edit
Click on a todo name to edit it. Press enter or click away to save it. This also cannot be blank.

#### ✔️ Toggle
Click the ☐ <small>or</small> ☑ on the left of each todo to set it to complete or incomplete. Completed todos will be moved to **Done**.

#### ❌ Delete
Click the **x** on the right of each todo to delete it.

## Endpoints
- [/api/all](https://desolate-ravine-82175.herokuapp.com/api/all) - All todos.
- [/api/complete](https://desolate-ravine-82175.herokuapp.com/api/complete) - All completed todos.
- [/api/incomplete](https://desolate-ravine-82175.herokuapp.com/api/incomplete) - All incomplete todos.

Example response:
```json
[
    {
        "id": 1,
        "task": "Example todo",
        "done": 0
    }
]
```

## Issues
- Error handling needs to be more robust, i.e. handling database disconnects, bad requests, etc.
- After each successful request `location.reload()` is called on the client to refresh the page, this makes the server grab updated info and send it to the view. This works but makes the user experience inconsistent.
    - <small>This has been solved (but not deployed) by fetching and rendering data client-side. Although this provides a better user experience it still may not be the better option.</small>

---
