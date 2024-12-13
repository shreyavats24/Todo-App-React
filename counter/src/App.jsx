// // import  { useState } from 'react'
// import './App.css';
// import card from './components/Card.jsx';
// function App() {
//   // let [counter,setCounter] = useState(15);
//   // function addValue(){
//   //   // counter = counter+1;
//   //   setCounter(counter<20 ?counter+1:counter); 
//   // }
//   // function removeValue(){
//   //   // counter--;
//   //   setCounter(counter>0 ? counter-1:counter)
//   // }

//   return (
//     <>
//       {/* <div itemID='root'>
//       <h1>Counter</h1>
//       <h2>Counter Value : {counter} </h2>
//       <button onClick={addValue}>Increase Value</button>
//       <button onClick={removeValue}>Decrease Value</button>
//       </div> */}
//       <card />
      
//     </>
//   ) 
// }

// export default App
import React from 'react'
import Card from './components/Card.jsx';

function App() {
  let obj = {
    name:"Shreya",
    age:20
  };
  return (
    // <div>App</div>
    <>
      <Card username="Shreya" someObj ={obj} />
      <Card username="Vaishali" someObj ={obj} />
    </>
  )
}

export default App