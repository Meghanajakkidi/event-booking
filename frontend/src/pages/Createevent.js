import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Createevent() {
    const [eventName, settaskName] = useState()
    const [eventlocation, settaskDesc] = useState()
    const [eventtiming , seteventtiming] = useState()
    const [eventamount ,seteventamount] = useState()
    const[ShowAlert,setShowAlert]= useState(false)
    const [ taskerr,setaskerr] = useState({})
    const navigate = useNavigate()
    const oneventNamechange = (e) => {
        settaskName(e.target.value)
    }
    const oneventlocationchange = (e) => {
        settaskDesc(e.target.value)
    }
    const oneventtimingchange = (e) =>{
        seteventtiming(e.target.value)
    }
    const oneventamountchange = (e) =>{
        seteventamount(e.target.value)
    }

    const Createevent = (taskData) => {
        let taskerr = validatetaskform()
        setaskerr(taskerr)
        if(Object.keys(taskerr).length===0){
          fetch("http://localhost:7000/task/create", { method: "POST", headers: { 'content-type': "application/json" }, body: JSON.stringify(taskData) }).then(function (res) {
            return res.json()
        }).then(function (result) {
            if(result._id){
                setShowAlert(true)
          }
            console.log("data saved succesfully")
            //navigate("/")
           
        })
         }else{
            return;
         } }
   
    const validatetaskform = ()=>{
        let taskerr ={}
            if(!eventName){
                taskerr.eventName="please enter your task"
            }if(!eventlocation){
                taskerr.eventlocation="please enter your description"
            }
            if(!eventtiming){
                taskerr.eventtiming="please enter your description"
            }
            if(!eventamount){
                taskerr.eventamount="please enter your description"
            }
        return taskerr
    }
    const saveevent = (e) => {
        e.preventDefault();
        let taskData = {
            eventName,
            eventlocation,
            eventtiming,
            eventamount,
            status:"not_started",
            assigned: true
        }
        Createevent(taskData)
    }
    return (
        <div className="createeventcontainer">
            <div className="card" style={{ width: "30rem", margin: "30px" ,marginLeft:"40%", borderRadius:"10%",background:"none" }}>
                <div className="card-body">
                    <form onSubmit={saveevent}>
                        <div class="form-group" style={{ padding: "10px" }} value={{ eventName }} onChange={oneventNamechange}>
                           <label >EventName:</label>
                            <input type="text" class="form-control" placeholder="Enter name" style={{background:"none"}} /><i style={{color:"red"}}>{taskerr?.eventName}</i><br/>

                        </div>
                        <div class="form-group" style={{ padding: "10px" }} value={{ eventlocation }} onChange={oneventlocationchange}>
                            <label>Event Location:</label>
                            <input type="text" class="form-control" placeholder=" enter location"style={{background:"none"}} /><i style={{color:"red"}}>{taskerr?.eventlocation}</i><br/>
                        </div>
                        <div class="form-group" style={{ padding: "10px" }} value={{ eventtiming }} onChange={oneventtimingchange}>
                            <label>Event Timings:</label>
                            <input type="text" class="form-control" placeholder=" enter timings" style={{background:"none"}}/><i style={{color:"red"}}>{taskerr?.eventtiming}</i><br/>
                        </div>
                       
                        <div class="form-group" style={{ padding: "10px" }} value={{ eventamount }} onChange={oneventamountchange}>
                            <label>Amount:</label>
                            <input type="text" class="form-control" placeholder=" enter amount"  style={{background:"none"}}/><i style={{color:"red"}}>{taskerr?.eventamount}</i><br/>
                        </div>

                        <button type="submit" class="btn btn-danger" style={{ width: "100px", height: "50px" }}>Submit</button>
                        


                    </form>

                </div>
            </div>
           {ShowAlert && <div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                        Event added succesfully!!
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Createevent