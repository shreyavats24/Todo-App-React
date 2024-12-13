import { useState,useEffect } from "react"; //hook allows react to know what is chnged
import deleteIcon from "../assets/trash.png";
import editIcon from "../assets/edit.png";
// import PropTypes from "prop-types";
import axios from 'axios';
export default function List({todoList}) {
  // if(todoList !=undefined){}
  // console.log(todoList);
  const [todo, setTodo] = useState(todoList);
  const [task, setTask] = useState("");
  const [edit,setEdit] = useState(null);
  console.log(task);
  // const [checkBox,setCheckBox] = useState(false);
  useEffect(() => {
    setTodo(todoList);
  },[todoList]);
async function addTodo(event) {
    if (event.key === "Enter" && edit == null) {
      if (task.trim() != "") {
        //spread operator make a copy of the array
        // setTodo([...todo, task]); //setting the state
        try {
          let res = await axios.post("http://localhost:8000/saveTask",{desc:task});
          if(res.data){
            console.log("Successfully updated!!!",res.data);
            setTodo([...todo, res.data[0]]); //setting the state
            // console.log(todo);
          }
        } catch (error) {
          console.log("Erorr Saving task : ",error);
        }
        setTask(" ");
        
      } else {
        alert("please enter valid data!!");
      }
    }
    else if(event.key === "Enter" && edit !=null){
      if (task.trim() != "") {
        // todo[edit] = task;
        // todo
        let chnges = todo.map(obj => {
          if (obj.taskId === edit) {
            return { ...obj,task: task }; 
          }
          return obj;
        });
       
        // console.log(chnges);
        try{
          let result = await axios.put("http://localhost:8000/updateTask",{id:edit,task:task});
          if(result){
            console.log("Changes successfull!!!");
            setTodo([...chnges]);
          }
          else{
            console.log("changes not made!!");
          }

        }catch(err){
          console.log("Error Editing task:",err);
        }
        setEdit(null);
        setTask("");
      }
      else {
        alert("please enter valid data!!");
      }
    }
    
  }
  function onInputChange(event) {
    setTask(event.target.value);
  }
  function deleteTask(index) {
    
    return async function () {
      // console.log("id",index);
      setTodo(
        todo.filter(function (item) {
          return item.taskId !== index;
        })
      );
      try{
        let res = await axios.delete(`http://localhost:8000/deleteTask/${index}`);
        if(res){
          console.log("Deteted successfully!!!"); 
        }
        else{
          console.log("Deletion failed!!");
        }
      }catch(err){
        console.log("Error in deleting : ",err);
      }
    };
  }
  function editTask(ListIndex){
    return function(){
      // console.log(todo);
      let selected = todo.find((item)=>item.taskId === ListIndex);
      setTask(selected.task);
      setEdit(ListIndex);
    }
  }
 async function toggle(id){
    let selected = todo.find((item)=>item.taskId === id);
    selected.completed?selected.completed=0:selected.completed=1;
    setTodo([...todo]);
    console.log(todo);
    try{
      let res = await axios.put("http://localhost:8000/updateCheck",{check:selected.completed,id:id});
      if(res){
        console.log("CheckBox updated!!");
      }

    }catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
      <input
        type="text"
        placeholder="Enter task here"
        // name="Task"
        value={task}
        className="border-blue-400 mt-3 border w-full p-2 text-center"
        onChange={onInputChange}
        onKeyPress={addTodo}
      />
      <div className="h-[270px] overflow-y-scroll">
        <ol className="relative">
          {todo && todo.length > 0 && todo.map(function (item) {
            // console.log(todo);
            // console.log(item);
            return (
              <>
                <li
                  className="border-1 bg-red-300 border-[1px] border-red-700 p-2 rounded mt-2 relative"
                  // onDoubleClick={deleteTask(index)}
                  key=
                  {item.taskId}
                >
                <input type="checkbox" name="checkBox" checked={item.completed} onChange={()=> toggle(item.taskId)} />
                <span className={item.completed?"line-through":"none"}> {item.task} </span>
                <img src={editIcon} className="absolute top-2 right-10" 
                // onClick={editTask(index)} 
                onClick={editTask(item.taskId)}
                alt="edit" width="20px" />
                <img
                  className="absolute top-2 right-2"
                  src={deleteIcon}
                  // onClick={deleteTask(index)}
                  onClick={deleteTask(item.taskId)}
                  width="20px"
                alt="icon"
                />
                </li>
              </>
            );
          })}
        </ol>
      </div>

    </>
  );
}