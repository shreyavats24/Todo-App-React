// this index.js file is simple crud operation on todo and have no authentication or login signup features 
// uh can see all task anybody cant enter edit delete any task 

const express = require("express");
const app = express();
const cors = require("cors"); // helps to run on multiple platforms
app.use(express.json()); 
app.use(cors());
const mysql = require("mysql2");
const todo = mysql.createConnection({
    host: "127.0.0.1", //localhost
    user: "root",
    password: "Shreya123#",
    database: "todoapp"
});

todo.connect((err)=>{
    if(err)
        console.log("Error Connecting!!"); 
    else 
    console.log("Connected!!");
});
// app.post("/login",(req,res)=>{

//     todo.query()
// })
app.get("/todo",(req,res)=>{
    todo.query("Select * from todo;",(err,data)=>{
        if(err)
           console.log(err);
        else{
            // console.log(data);
            res.json(data);
        }
    });
})

app.post("/saveTask",(req,res)=>{
let data = req.body.desc;
    // console.log(data);]
    let q = "INSERT INTO todo (task) VALUES(?) ";
    let task=[data];
    todo.query(q,task,(err,result)=>{
        if(err) console.log("Error Inserting task:",err);
        else{
            let q = "select * from todo where taskId=LAST_INSERT_ID();"
            todo.query(q,(err,data)=>{
                if(err) console.log(err);
                else
                {
                    console.log(data);
                    res.json(data);
                }
            })
        }
    })
    // res.json(data);
})
app.put("/updateTask",(req,res)=>{
    let id= req.body.id;
    let task = req.body.task;
    let query = `UPDATE todo SET task = ? WHERE taskId = ?;`;
    todo.query(query,[task,id],(err,result)=>{
        if(err)
            console.log("Error Updating in DB",err);
        else
            res.json(result);
    })
})
app.put("/updateCheck",(req,res)=>{
    let update = req.body.check;
    let id = req.body.id;
    let query = "UPDATE todo SET completed = ? WHERE taskId = ? ;";
    todo.query(query,[update,id],(err,data)=>{
        if(err)
            console.log(err);
        else
        {
            res.json(data);
        }
    })
})
app.delete("/deleteTask/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    let query = `DELETE from todo WHERE taskId = ?;`;
    // let query = "TRUNCATE TABLE todo;";
    todo.query(query,[id],(err,data)=>{
        if(err)
            console.log("Error Updating in DB",err);
        else
            res.json(data);
    })
})
app.listen(8000,(err)=>{
    if(err){
        console.log("Error Connecting Server");
    }
    else
    console.log("Server is connected!!");
})