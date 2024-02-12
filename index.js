import express from "express";
import bodyParser from "body-parser";
import todoDb from "./data/data.json" assert { type: "json" };

const port = 8000;
const app = express();

app.use(bodyParser.json());

//create a task
app.post("/task", (req, res) => {
  if (!req.body) {
    console.log(req.body);
    res.status(404).send("Missing body params");
  } else {
    const { id, task } = req.body;
    todoDb.push({ id, task });
    res.status(200).json(todoDb);
  }
});

//Fetch all tasks
app.get("/task/", (req, res) => {
  if (todoDb.length == 0) {
    console.error("Todo List is empty");
  } else {
    console.table(todoDb);
    res.status(200).json(todoDb);
  }
});

//Fetch a task by id
app.get("/task/:id", (req, res) => {
  const task = todoDb.find((item) => item.id == req.params.id);
  if (task) {
    console.table(task);
    res.status(200).json(task);
  }
});

//DELETE a task by id
app.delete("/task/:id", (req, res) => {
  const taskToDelete = todoDb.find((item) => item.id == req.params.id);
  const index = todoDb.indexOf(taskToDelete);
  const deletedTasks = todoDb.splice(index, 1);
  console.table(deletedTasks);
  res.status(200).send(todoDb);
});

//UPDATE a task
app.patch("/task/:id", (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  if (!updatedInfo || !id) {
    res.status(404).send("No request params");
  } else {
    let taskToUpdate = todoDb.find((item) => item.id == id);
    taskToUpdate = updatedInfo;
    console.table(taskToUpdate);
    res.status(200).send(todoDb);
  }
});

app.listen(port, () => {
  console.log(`This app is running on port ${port}`);
});
