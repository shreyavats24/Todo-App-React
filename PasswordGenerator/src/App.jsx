import { useState } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [characterAllowed,setcharacterAllowed]=useState(false);
  const [Password,setPassword] = useState();
  const generatedPassword =(()=>{
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var pass="";
    for(var i = 0;i<Array.length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass = str.charAt(char);
      setPassword(pass);
    }
  },length,numberAllowed,characterAllowed,setPassword)
  return (
    <>
     <h1 className="text-4xl text-center">Password Generator</h1>
    </>
  )
}

export default App
