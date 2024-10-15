import { useState } from "react"

function Changepassword(){
    const [currentpassword,setcurrentpassword]=useState("")
    const[newpassword,setnewpassword] = useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const[ShowAlert,setShowAlert]= useState(false)
    const [ error,setaskerr] = useState({})


    const onChangecurrentpassword = (e)=>{
        setcurrentpassword(e.target.value)
    }
    const onChangenewpassword = (e)=>{
        setnewpassword(e.target.value)
    }
    const onChangeconfirmpaswword= (e)=>{
       setconfirmpassword(e.target.value)
    }

    const validateform = ()=>{
        let error ={}
            if(!currentpassword){
            error.currentpassword="please enter your currentpassword"
            }if(!newpassword){
                error.newpassword="please enter your newpassword"
            }
            if(!confirmpassword){
                error.confirmpassword="please enter  confirm your password"
            }
            
        return error
    }
    const applychangepassword = async()=> {
        const user =  await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        let error = validateform()
        setaskerr(error)
        if(Object.keys(error).length===0){
            fetch("http://localhost:7000/auth/change", { method: "PUT", headers: { 'content-type': "application/json" }, body: JSON.stringify({email:user.email,currentpassword,newpassword}) }).then(function (res) {
              return res.json()
          }).then(function (result) {
              if(result._id){
                  setShowAlert(true)
            }
              console.log("password added succesfully")
            
             
          })
           }else{
              return;
           } }
    
    const Changepassword = (e)=>{
        
        e.preventDefault();
        applychangepassword();
        
    }
    
    return(
        <div className="container">
            <h4><i>change your password here !!!</i></h4>
            <div className="card" style={{ width: "30rem", margin: "30px" , borderRadius:"10%" }}>
                <div className="card-body">
                    <form onSubmit={Changepassword}>
                        <div class="form-group" style={{ padding: "10px" }} value={{ currentpassword }} onChange={onChangecurrentpassword}>
                           <label >currentpassword</label>
                            <input type="text" class="form-control" placeholder="Enter currentpassword" />
                        </div>
                        <div class="form-group" style={{ padding: "10px" }} value={{ newpassword }} onChange={onChangenewpassword}>
                            <label>new password</label>
                            <input type="text" class="form-control" placeholder=" enter newpassword" />
                        </div>
                       
                        <div class="form-group" style={{ padding: "10px" }} value={{ confirmpassword }} onChange={onChangeconfirmpaswword}>
                            <label>confirm password</label>
                            <input type="text" class="form-control" placeholder=" enter confirmpassword" />
                        </div>

                        <button type="submit" class="btn btn-danger" style={{ width: "100px", height: "50px" }}>Submit</button>
                        


                    </form>

                </div>
            </div>
          {ShowAlert && <div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                        password change successfully
                    </div>
                </div>
    </div>}
        </div>
    )
}

export default Changepassword