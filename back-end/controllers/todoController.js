const {comparePassword,bcryptPassword} = require("./bcryptPassword");
// require('../env').config();
const mysql = require("mysql2");
const todo = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
password: process.env.DB_PASS,
  database: "todoapp",
});
todo.connect((err) => {
    if (err) console.log("Error Connecting!!");
    else console.log("Connected!!");
  });
const { getUser, makeToken } = require("./token");
const getTodoList = function (req,res){
    const user = getUser(req.cookies.mycookie);
    todo.query("Select * from todolist WHERE user_id = ?;",[user.id], (err, data) => {
    if (err) console.log(err);
    else {
        // console.log(data);
      res.json(data);
    }
  });
}
const loginUser =async (req,res)=>{
console.log("/login");
  let password = req.body.password;
  let email = req.body.email;
  if (email.trim() != "" && password.trim() != "") {
    let query = `SELECT user_id, username,password FROM users WHERE username = ?;`;
    todo.query(query, [email], async (err, result) => {
      if (err) console.log("Error in Finding User!!", err);
      else {
        // console.log("data:", result);
        if (result.length > 0) {
          let status = await comparePassword(password, result[0].password);
          if (status) {
            let user = result[0];
            // console.log("User:",user);
          let token =await makeToken(user);
          // res.cookie("mycookie",token,{httpOnly:true,sameSite: 'None',secure: false});
          res.status(200).json({ message: "User Authenticated!!" ,token:token});
        }
          else res.status(401).json({ message: "Invalid Credential!!!" });
        } else {
          res.status(404).json({ message: "User Not found!!!" });
        }
      }
    });
  }
}
const createNewUser = async (req,res)=>{
    let email = req.body.email;
  let password = req.body.password;

  if (email.trim() != "" && password.trim() != "") {
    todo.query(
      "SELECT username,password FROM users WHERE username = ?",
      [email],
      async (err, result) => {
        // console.log(result);
        if (err) console.log("Error Occured!!", err);
        else if (result.length > 0) {
          res.json({ message: "User Already Exists" });
        } else {
          password = await bcryptPassword(password);
          let query = "INSERT INTO users (username,password) VALUES (?,?)";
          todo.query(query, [email, password], (err, data) => {
            if (err) console.log(err);
            else {
              console.log("Sucessfully Registered!!", data);
              res.json({message:"Sucessfully Registered!!"});
            }
          });
        }
      }
    );
  }
}
const saveTask =(req,res)=>{
    let data = req.body.desc;
  console.log(data);
  const user = getUser(req.cookies.mycookie);
  console.log(user);
  let q = "INSERT INTO todolist (user_id,task) VALUES(?,?)  ";
  let task = [user.id,data];
  todo.query(q, task, (err, result) => {
    if (err) console.log("Error Inserting task:", err);
    else {
      let q = "select * from todolist where task_id=LAST_INSERT_ID();";
      todo.query(q, (err, data) => {
        if (err) console.log(err);
        else {
          console.log(data);
          res.json(data);
        }
      });
    }
  });
}
const updateTask = (req,res)=>{
    let id = req.body.id;
  let task = req.body.task;
  let query = `UPDATE todolist SET task = ? WHERE task_id = ?;`;
  todo.query(query, [task, id], (err, result) => {
    if (err) console.log("Error Updating in DB", err);
    else res.json(result);
  });
}
const updateCheckBox = (req,res)=>{
    let update = req.body.check;
  let id = req.body.id;
  let query = "UPDATE todolist SET completed = ? WHERE task_id = ? ;";
  todo.query(query, [update, id], (err, data) => {
    if (err) console.log(err);
    else {
      res.json(data);
    }
  });
}
const deleteTask = (req,res)=>{
    let id = req.params.id;
  let query = `DELETE from todolist WHERE task_id = ?;`;
  // let query = "TRUNCATE TABLE todo;";
  todo.query(query, [id], (err, data) => {
    if (err) console.log("Error Updating in DB", err);
    else res.json(data);
  });
}
module.exports={
    getTodoList,loginUser,createNewUser,saveTask,updateTask,updateCheckBox,deleteTask
}