import { useState, useEffect } from "react"

function Eventlist() {
    const [tasks, setTasks] = useState([])
    const [searchkey, setsearchkey] = useState("")
    const [filteredtask, setfilteredtask] = useState([])
    const [status, setstatus] = useState(["Our Events", "Festive Events", "Education Events", "Live Contensts"])
    const[ShowAlert,setShowAlert]= useState(false)
    //const [taskSummary, setTaskSummary] = useState({  available: 0,  })

    const getAllTasks = () => {
        fetch("http://localhost:7000/task/all").then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setfilteredtask(result)

        })
    }
    //const getallavailabletask = () => {
    //fetch("http://localhost:7000/task/available").then((res) => {
    //return res.json();
    // }).then((result) => {
    //setTasks(result)
    //setfilteredtask(result)

    // })
    //}
    //const getTaskSummary = () => {
    //fetch(`http://localhost:7000/task/summary`).then((res) => {
    //  res.json();
    //}).then((result) => {
    // console.log(result)
    //setTaskSummary(result)
    //})
    //}

    useEffect(() => {
       // getallavailabletask();
         getAllTasks();
       // getTaskSummary();
    }, [])

    const deletetask = (e, id) => {
       // fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
           // return res.text;
            setShowAlert(true)
        }
        
            
        //then((result) => {
            // getAllTasks(result)
    

    const searchtasks = (e) => {
        setsearchkey(e.target.value)
        if (e.target.value) {
            let filteredtaskdata = tasks.filter((item) => {
                return item.eventName.includes(e.target.value)

            })
            setfilteredtask(filteredtaskdata)
        } else {
            setfilteredtask(tasks)
        }
    }

    const starttask = (e, id, status) => {
        if (status === "inprogress") {
            status = "completed"
        } else {
            status = "inprogress"
        }
        fetch("http://localhost:7000/task/update/" + id, { method: "PUT", headers: { "Content-type": "Application/Json" }, body: JSON.stringify({ status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks(result)
        })
    }
    const assigntasktouser = async (taskId, status) => {
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        if (status === "inprogress") {
            status = "completed"
        } else {
            status = "inprogress"
        }
        fetch("http://localhost:7000/user/task/assigntask", { method: "POST", headers: { "Content-type": "Application/Json" }, body: JSON.stringify({ taskId: taskId, userId: user.userId, status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks(result)
        })
    }

    const assigntask = async (e, taskId, status) => {
        assigntasktouser(taskId, status);

    }
    const getTasksbystatus = (status) => {
        fetch("http://localhost:7000/task/bystatus/" + status).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setfilteredtask(result)
        })
    }
    const statuschange = (e) => {
        //console.log(e.target.value)
        getTasksbystatus(e.target.value)
    }


    return (
        <div className="eventcontainer">
            <div>
                <div className="imgcontainer"><img className="eventimg" src="https://ii100.moiglobal.com/wp-content/uploads/sites/15/2020/04/post-87-copyright.jpg" width={"100%"} height={"500px"} ></img></div>
                <select className="form-select" id="floatingSelect" style={{ position: "absolute", bottom: "90%", border: "2px solid" }}>
                    {status.map((item) => {
                        return (
                            <option value={item}>{item}</option>
                        )
                    })}

                </select>
            </div>

            <div className="contentcontainer">
                <h1>Let’s grow together</h1>
                <h3>Eventbrite powers ticketing and registration for millions of events each year. Join hundreds of thousands of event organizers on our platform today.</h3>
                <div className="contentcard">
                    <div className="contentdata">
                        <div><img src="https://s3.amazonaws.com/eventbrite-s3/marketing/landingpages/assets/icons/custom/clipboard-brite-surf.svg"></img>
                            <h6>Simplify your planning</h6>
                            <h6>Create a 100% mobile-optimized event page and start selling tickets in minutes.</h6></div>

                    </div>
                    <div className="contentdata">
                        <div>
                            <img src="https://s3.amazonaws.com/eventbrite-s3/marketing/landingpages/assets/icons/custom/plant-brite-surf.svg"></img>
                            <h6>Grow your event</h6>
                            <h6>Grow faster with Eventbrite’s built-in event promotion and social sharing tools.

                            </h6>
                        </div>

                    </div>
                    <div className="contentdata">
                        <div>
                            <img src="https://s3.amazonaws.com/eventbrite-s3/marketing/landingpages/assets/icons/custom/dashboard-brite-surf.svg"></img>
                            <h6>Manage your sales</h6>
                            <h6>Manage smarter with 24/7 access to data, reports, and check-in tools on any device.</h6>
                        </div>

                    </div>
                </div>
            </div>

            <form className="d-flex" role="search" style={{ position: "absolute", left: "50%", bottom: "101%" }} >
                <input className="form-control me-2" type="search" style={{ width: "500px" }} placeholder="Search" onChange={(e) => searchtasks(e)} value={searchkey} />

            </form>

            {/*<div className="demo">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid blue' }}>
                            <div className="card-body">
                                <h5 className="card-title">AVALIABLE Events</h5>
                                <p className="card-text count-task">{taskSummary.available}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>*/}
            <h1><i>EVENT LIST</i></h1>
            <div className="row">
                <div>
                    <div className="form-floating" style={{ borderRadius: "20%" }} onChange={(e) => statuschange(e)}>


                    </div>
                </div>
                {filteredtask.length === 0 && <h4>NO AVALIABLE Events</h4>}
                {filteredtask.map((tasks) => {
                    return (
                        <div className="col-md-3 mt-3">
                            <div className="card">
                                {/*{tasks.status === "inprogress" && <button style={{ position: "absolute", }} className="btn btn-success" onClick={(e) => starttask(e, tasks._id, tasks.status)}>{'completed'}</button>}
                                {tasks.status === "not_started" && <button style={{ position: "absolute", }} className="btn btn-success" onClick={(e) => assigntask(e, tasks._id, tasks.status)}>{'start'}</button>}*/}
                                <img src="https://png.pngtree.com/background/20210711/original/pngtree-campus-culture-and-art-festival-poster-design-picture-image_1129242.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:"red",fontStyle:"bold"}}>Name : {tasks.eventName}</h5>
                                    <p className="card-text" style={{color:"green"}}> Location :{tasks.eventlocation}</p>
                                    <p className="card-text" style={{color:"green"}}>Timings :{tasks.eventtiming}</p>
                                    <p className="card-text" style={{color:"green"}}>Amount :{tasks.eventamount}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span className="btn btn-success">BOOK NOW</span>
                                        <span className="btn btn-danger" onClick={(e) => deletetask(e, tasks._id)}>delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                 {ShowAlert && <div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert" style={{color:"red"}}>
                       ONLY ADMIN CAN DELETE !!
                    </div>
                </div>
            </div>}
            </div>
            <header>
                <div className="headcontainer">
                    <h4>Let’s make event magic.</h4>
                    <h5>Sign up for free to create your first event and start sending free online invitations today</h5>
                    <input placeholder="Email"></input><input placeholder="passwoord" style={{ marginLeft: "10px" }}></input><button style={{ width: "200px", height: "50px", backgroundColor: "orangered", marginLeft: "10px" }}>GET STARTED</button>
                </div>

                <div>
                    <img src="https://tse1.mm.bing.net/th?id=OIP.YYdsO4HZiUgZxIFipySulgHaEY&pid=Api&P=0&h=180" width={"100%"}></img>
                </div>
                <div className="gridheadcontainer">
                    <div><b>Use Eventbrite</b></div>
                    <div><b>Plan Events</b></div>
                    <div><b>Find Events</b></div>
                    <div>Create Events</div>
                    <div>Sell Tickets Online</div>
                    <div>New Orleans Food & Drink Events</div>
                    <div>Pricing</div>
                    <div>Event Planning</div>
                    <div>San Francisco Holiday Events</div>
                    <div>Event Marketing Platform</div>
                    <div>Virtual Events Platform</div>
                    <div>Tulum Music Events</div>
                    <div>Eventbrite Mobile Ticket App</div>
                    <div>Event Payment System</div>
                </div>
            </header>
        </div>


    )
}


export default Eventlist