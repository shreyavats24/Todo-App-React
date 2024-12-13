import { useState } from 'react'
import React from 'react';
// import './App.css'

function App() {
  const [color,setColor] = useState("pink");
  return (
    <>
    <div className="w-full h-screen duration-200" style={{backgroundColor:color}}></div>
    <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
      <div className="flex flex-wrap justify-center shadow-xl bg-white gap-3 px-3 py-2 rounded-xl">
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"red"}} onClick={()=>setColor("red")}>Red</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"blue"}} onClick={()=>setColor("blue")}>Blue</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"green"}} onClick={()=>setColor("green")}>Green</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"yellow"}} onClick={()=>setColor("yellow")}>Yellow</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"pink"}} onClick={()=>setColor("pink")}>Pink</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"white"}} onClick={()=>setColor("white")}>White</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"grey"}} onClick={()=>setColor("grey")}>Grey</buttom>
        <buttom className="outline-none px-4 py-1 rounded-full shadow-xl" style={{backgroundColor:"orange"}} onClick={()=>setColor("orange")}>orange</buttom>
      </div>
    </div>
    </>
  )
}

export default App
