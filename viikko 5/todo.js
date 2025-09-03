const express = require("express")
const app = express()
app.use(express.json())

let todos = [
    { id: 1, task: "Osta leipää", done: false },
    { id: 2, task: "Vie roskat", done: true }
]


app.get('/todos', (req, res) => {
    let done_param = req.query.done;

    // check for 'done'-param is exists
    if (done_param === undefined)
        return res.json(todos);

    // check for 'done'-param is ok
    done_param = done_param.toLowerCase();
    if (done_param !== "true" && done_param !== "false") {
        return res.status(400).json({ error: "Use true or false for 'done'-parameter." });
    }

    // Filter todos by done param
    const filter_bool = done_param === "true";
    const filtered = todos.filter(todo => todo.done === filter_bool);
    res.json(filtered);
})

/* POST
Creates a new todo task
task is a mandatory field (trim empty string off)
if task is missing - 400 Bad Request and error message
if successful-restore 201 Created and new todo   */
app.post('/todos', (req, res) => {

    // check parameters is OK
    if (!req.body || !req.body.task || !req.body.task.trim())
        return res.status(400).json({ error: "Todo text required." });

    // generate new id
    const new_id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 0;

    // create task object to insert
    const new_task = {
        id: new_id,
        task: req.body.task.trim(),
        done: false
    };

    // append new task
    todos.push(new_task);

    // return status and appended record
    return res.status(201).json(new_task);
})

/* PUT /todos/:id
  * - Updates an existing todo based on the id
  * - task and done are optional (if provided → update)
  * - if the id is not found → 404 Not Found
  * - if successful → return the updated todo  */

// i think, AT LEAST ONE PARAMETER (task text/done) must present, in other case this request doesnt have sense
app.put('/todos/:id', (req, res) => {

    // ensure param is number
    const id = Number(req.params.id)
    if (isNaN(id))
        return res.status(400).json({ error: "ID parameter must be number." });

    // find task index
    const task_index = todos.findIndex(todo => todo.id === id);
    if (task_index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    // "task modified" flag
    let changed = false;
    update_params = req.body || {};

    // each field, that can be changed checking existence and type
    ['task', 'done'].forEach(field => {
        if ((field in update_params) && update_params[field] && (typeof todos[task_index][field] === typeof update_params[field])) {
            todos[task_index][field] = update_params[field];
            changed = true;
        }
    });

    // if some of fields changed returns corresponding answer
    if (changed)
        return res.status(200).json(todos[task_index]);
    else
        return res.status(304).json({ error: "Not changed." });
})

/* DELETE /todos/:id
* - Deletes a todo based on the id
* - if the id is not found → 404 Not Found
* - if deletion is successful → return 204 No Content     */
app.delete('/todos/:id', (req, res) => {

    // get param from route
    let id = req.params.id;
    //if (!id) return res.status(400).json({ error: "ID parameter required." });

    // ensure param is number
    id = Number(id)
    if (!isNumber(id))
        return res.status(400).json({ error: "ID parameter must be number." });

    const task_index = todos.findIndex(todo => todo.id === id);

    if (task_index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    todos.splice(task_index, 1);
    res.status(204).end();
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Todo API running: http://localhost:${PORT}/todos`));
