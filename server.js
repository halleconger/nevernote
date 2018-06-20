const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models")
const PORT = process.env.PORT || 3001;
const app = express();

// Configure body parser for incoming POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
// If the node mode is production (if we're still running in production)
// then we want to setup our static file to point to client/build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes 

// GET route to retrive all of the todos from the Todo collection in the MongoDB
app.get("/api/todos", (req, res) => {
  db.Todo.find({})
    .then(results => res.json(results))
    .catch(err => {
      console.log(err)
      res.status(422).json(err);
    })
})

// POST route to post a new todo item
app.post("/api/todo", (req, res) => {
  var newTodo = {
    todo: req.body.todo,
    note: req.body.note,
    deadline: req.body.deadline,
    category: req.body.category
  };
  console.log(newTodo);
db.Todo.create(newTodo)
  .then(results => res.json(results))
  .catch(err => {
    console.log(err)
    res.status(422).json(err);
  })
})

// Send every request to the React app, that doesn't match
// another express route
// Define any API routes before this runs
// Catches anything that doesn't match 
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URL || "mongodb://prod:973164hc@ds163330.mlab.com:63330/heroku_6p3v8571")

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
