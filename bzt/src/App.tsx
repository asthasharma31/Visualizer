import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import NavigationB  from './components/NavigationB';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import axios from 'axios';
import Charts from './components/charts';


function App() {
  const [data,setdata] = useState("");
  const[verdict,setverdict]=useState<any>();
  const [userH,setuserH] = useState("");
  // const [data,setData] = useState("");
  
  const updateUserName = (event:any)=>{
    setuserH(event.target.value);
  }

  const fetchData=() =>{
      axios.get("https://codeforces.com/api/user.status?handle="+userH).then((res)=>{
        setdata(res.data);
        console.log(res);
        //  built a map
        const mp = new Map();
        for(let i=0;i<res.data.result.length;i++){
          if (mp.has(res.data.result[i].verdict)) {
            mp.set(res.data.result[i].verdict, mp.get(res.data.result[i].verdict) + 1);
          } else {
            mp.set(res.data.result[i].verdict, 1);
          }
        }

        //creating the data array
      let arr = [{}];
      for (const [cverdict, count] of mp) {
        let tempObj = {
          x:cverdict,
          y:count
        };
        arr.push(tempObj);
      }
      setverdict([...arr]);
})

}

  return (
    <>  
        <NavigationB />

{/* input form */}
<div>
  <div className="mb-3">
  <label  className="form-label">Enter CodeForce's UserName</label>
  <input type="text" className="form-control" id="exampleInputPassword1" onChange={updateUserName}/>
  <button type="submit" className="btn btn-primary" onClick={fetchData}>Submit</button>
  </div>
</div>
{/* input form closes here. */}


{ verdict && <Charts data = {verdict} />}
  
    </>  

  )
}

export default App

