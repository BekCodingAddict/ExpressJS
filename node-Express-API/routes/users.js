import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

const users = [];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  console.log("Post Route Reached");
  const user = req.body;
  const userId = uuidv4();
  const newUser = { ...user, id: userId };
  users.push(newUser);

  res.send("New User Added to DB!");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const fountUser = users.find((user) => user.id === id);
  res.send(fountUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const remainUsers = users.filter((user) => user.id !== id);
  res.send({
    message: "User has been deleted!",
    data: remainUsers,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { fristName, lastName, age } = req.body;

  const updateUser = users.find((user) => user.id === id);
  if (fristName) updateUser.fristName = fristName;
  if (lastName) updateUser.lastName = lastName;
  if (age) updateUser.age = age;
  res.send(updateUser);
});
export default router;
