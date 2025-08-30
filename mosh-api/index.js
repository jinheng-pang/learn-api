const Joi = require("joi");
const express = require("express");
const app = express();

// Populate body = middleware
app.use(express.json());

const courses = [
  { id: 1, name: "Node.js" },
  { id: 2, name: "React.js" },
  { id: 3, name: "Vue.js" },
];
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// HANDLING POST REQUEST
app.post("/api/courses", (req, res) => {
  // Validate using Joi library
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  // Validate request body
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// HANDLING PUT REQUEST
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If it does not exist, return 404
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course)
    res.status(404).send("The course with the given ID was not found");

  // Validate
  // If invalid, return 400 - Bad request
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
  }

  // Update course
  course.name = req.body.name;
  res.send(course);
});

// HANDLING DELETE REQUEST
// Similar to PUT

app.get("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // A reference object from the array
  const course = courses.find((c) => c.id === id);
  if (!course)
    // 404
    res.status(404).send("The course with the given ID was not found");
  res.send(courses[id - 1]);
});

// localhost:3000/api/posts/:year/:month?sortBy=name
// route param
// query string param

// PORT
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
