const { config } = require("dotenv");
const Joi = require("joi");
const express = require("express");
const func = require("joi/lib/types/func");
const app = express();
app.use(express.json());

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    return res.status(404).send("The course with given id was not found!");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //loop up the course
  //if not existing return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    return res.status(404).send("The course with given id was not found!");
  }
  //validate
  //if invalid , return 400 -Bad request

  const { error } = validateCourse(req.body);

  if (error) {
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);
  }
  //update course
  //return the updated courses
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  // not exist return 404,
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    return res.status(404).send("The course with given id was not found!");
  }

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // return the same course
  res.send(course);
});
////
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}!`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
