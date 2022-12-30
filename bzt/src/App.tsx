import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import NavigationB  from './components/NavigationB';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import axios from 'axios';
import Charts from './components/charts';
import Barcharts from './components/Barcharts';


function App() {
  // const [data,setdata] = useState("");
  const[verdict,setverdict]=useState<any>();
  const [userH,setuserH] = useState("");
  const[languages,setlanguages]=useState<any>();
  const[tag,settags]=useState<any>();
  const[ratings,setratings]=useState<any>();
  const[levels,setlevels]=useState<any>();
  // const [data,setData] = useState("");
  
  const updateUserName = (event:any)=>{
    setuserH(event.target.value);
  }

  const fetchData=() =>{
      axios.get("https://codeforces.com/api/user.status?handle="+userH).then((res)=>{
        // setdata(res.data);
        // console.log(res);
        let verdicts=[""]
        let languages=[""];
        let tags : any[] =[]
        let rating=[""]
        let levels=[""]
        let n=res.data.result.length;

        //  built a map
        for(let i=0;i<n;i++){
          languages=[...languages,res.data.result[i].programmingLanguage];
          verdicts=[...verdicts,res.data.result[i].verdict];
          tags=[...tags,...res.data.result[i].problem.tags];
          rating=[...rating,res.data.result[i].problem.rating];
          levels=[...levels,res.data.result[i].problem.index];
        }
          //console.log(verdicts)
        function  fetch(data:any):any{
                console.log(data);
                const mp = data.reduce((accumualtor:any, entry:any) => accumualtor.set(entry, (accumualtor.get(entry) || 0) + 1), new Map());
              //creating the data array
              let tmp=[{}];
            tmp.shift();
              mp.forEach(function(value:any, key:any) {

                if(key!==""){
                  let p={
                    x:key,
                    y:value
                  };
                  if(tmp.length!=0)
                  tmp=[...tmp,p];
                  else
                  tmp=[p];
                }
              })
              return tmp;
      }

      //console.log(tag)
      setverdict(fetch(verdicts));
      setlanguages(fetch(languages));
      settags(fetch(tags));
      setratings(fetch(rating));
      setlevels(fetch(levels));
      // console.log(verdict)
      // console.log(languages)
      // console.log(tags)
      console.log(rating)
      console.log(levels)

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
{/* { { verdict && <Charts data = {verdict} />} } */}
{ languages && <Charts data = {languages} />}
{ tag && <Charts data ={tag} />}
{ ratings &&<Barcharts data ={ratings}/>}
{ levels &&<Barcharts data ={levels}/>}
    </>  

  )
}

export default App

