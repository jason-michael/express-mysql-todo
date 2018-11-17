# SimpleTodo
#### Because the world needed another todo app.

This is a basic Node application with an Express/MySQL backend. Features include standard todo list functionality: add, toggle, edit, and delete todos, all stored in a MySQL database.

This app is deployed on Heroku and can be found **[here.](https://desolate-ravine-82175.herokuapp.com/)**
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

## Issues
- Error handling needs to be more robust, i.e. handling database disconnects, bad requests, etc.

---
