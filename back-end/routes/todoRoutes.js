const express = require("express");
const router = express.Router();
const todoController= require("../controllers/todoController");
const {isAutheticated,islogout} = require("../middlewares/Authentication");

router.get("/todo",isAutheticated,todoController.getTodoList);
router.post("/login",islogout,todoController.loginUser);
router.post("/signup",islogout,todoController.createNewUser);
router.post("/saveTask",isAutheticated,todoController.saveTask);
router.put("/updateTask",isAutheticated,todoController.updateTask);
router.put("/updateCheck",isAutheticated,todoController.updateCheckBox);
router.delete("/deleteTask/:id",isAutheticated,todoController.deleteTask);
module.exports = router;