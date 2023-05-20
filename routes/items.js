//import required essentials
const express = require("express");
//create new router
const router = express.Router();

//create a JSON data array
let data = [
  {
    id: 1,
    title: "Create a project",
    order: 1,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 2,
    title: "Take a coffee",
    order: 2,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 3,
    title: "Write new article",
    order: 3,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 4,
    title: "Walk toward home",
    order: 4,
    completed: false,
    createdOn: new Date(),
  },
  {
    id: 5,
    title: "Have some dinner",
    order: 5,
    completed: false,
    createdOn: new Date(),
  },
];

//this end-point of an API returns JSON data array
router.get("/", function (req, res) {
  res.status(200).json(data);
});

//this end-point returns an object from a data array find by id
//we get 'id' from URL end-points
router.get("/:id", function (req, res) {
  //find an object from 'data' array match by 'id'
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  //if object found return an object else return 404 not-found
  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

//add a new item
router.post("/", function (req, res) {
  let newItem = req.body;
  const id = data[data.length - 1].id + 1;
  const order = data[data.length - 1].order + 1;
  const completed = false;
  const createdOn = new Date();
  const checkDuplication = data.find((item) => item.id === newItem.id);
  if (!checkDuplication) {
    newItem = { id, ...newItem, order, completed, createdOn };
    data.push(newItem);
    res.status(200).json(newItem);
  } else {
    res.send("Data with same ID exists already");
  }
});

// delete a item
router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const order = data[id].order - 1;
  data = data.filter((item) => item.id !== id);
  res.send("Data of order " + order + " deleted successfully");
});

// update a item
router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (item) {
    item.title = req.body.title || data[id - 1].title;
    item.order = req.body.order || data[id - 1].order;
    item.completed = req.body.completed || data[id - 1].completed;
    item.createdOn = new Date();
  } else {
    res.send("Item with id " + id + " not found.");
  }
  res.send("Data updated successfully");
});
module.exports = router;
