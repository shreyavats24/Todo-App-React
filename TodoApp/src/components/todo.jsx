// import React from 'react';
import { useEffect, useState } from 'react';
import List from '../components/dbList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

export default function Todo() {
  // let res;
  const [data,setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the backend
    console.log("useEffect!!");
    axios.get('http://localhost:8000/todo',{ withCredentials: true })
      .then(response => {
        //console.log(response);
        if(response.data.message == "User not logged in"){
          navigate("/login");
        }
        else{
          //console.log("response Data:",response.data);
          setData(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  function logout() {
    return function () {
      Cookie.remove('mycookie');  
      navigate("/login");
    }
  }
  return (
    <div className="w-full h-screen m-0 px-2 py-20">
      <div className="w-1/2 mx-auto h-[400px] p-2 bg-red-400 rounded shadow-2xl ">
      <h1 className="text-center text-5xl text-red-700 bg-red-300 border-2 border-red-700 rounded shadow-xl">Todo App</h1>
      <List todoList={data} />
      <button onClick={logout()} className='mt-8 px-2 py-1 mx-64 bg-red-400 border border-black'>Logout</button>
      </div>
    </div>
  )
}

