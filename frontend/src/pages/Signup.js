import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Signup() {
    const [userAuth,setUserAuth] = useState({ fullname: "", email: "", password: "",role:"" })
    const Navigate = useNavigate()
    const [error, seterror] = useState({})
    const [iserror, setiserror] = useState(false)
    const [errmsg, seterrmsg] = useState("")
    const [roles, setRoles] = useState(["admin", "user"])
    const[setrole,setSelectedRole]=useState("")
    const onfeildcahnge = (e) => {
        console.log(e.target.value, e.target.name)
        setUserAuth((PrevState) => {
            return {
                ...PrevState,
                [e.target.name]: e.target.value
            }
        })


    }
    const Validiateforms = () => {
        let error = {}
        if (!userAuth.fullname) {
            error.fullname = "please enter full name"
        } if (!userAuth.email) {
            error.email = "please enter email"
        } if (!userAuth.password) {
            error.password = "please enter password"
        }
        return error
    }
    const signup = () => {
        console.log(userAuth)
        fetch("http://localhost:7000/auth/signup", { method: "POST", headers: { "content-type": 'application/json' }, body: JSON.stringify(userAuth) }).then((res) => {
            return res.json();
        }).then((result) => {
            if (result.success) {
                Navigate("/login")
            } else {
                setiserror(true)
                seterrmsg(result.message)

            }
        })
    }
    const register = (e) => {
        e.preventDefault();
        let error = Validiateforms()
        seterror(error)
        if (Object.keys(error).length === 0) {
            signup()
        } else {
            return;
        }


    }

    const onRoleChange = (e)=>{
        console.log(e.target.value)
        setSelectedRole(e.target.value)
        setUserAuth((prevState) => {
            return {
                ...prevState,
                role: e.target.value
            }
        })
    }
    return (
        <div>
            <div className="container" style={{ width: "500px", height: "600px", borderRadius: "10%", border: "2px solid", marginTop: "50px", textAlign: "center" }}>
                <h3 style={{textAlign:"center" }}><b style={{color:"red"}}>EVENT</b><i style={{color:"greenyellow"}}>Brite</i></h3>
                <form onSubmit={register}>
                    <label>NAME:</label>
                    <input type="text" placeholder="enter your name" style={{ width: "300px", height: "50px", margin: "20px" }} value={userAuth.name} onChange={onfeildcahnge} name="fullname"></input><br />
                    <i style={{ color: "red" }}>{error?.fullname}</i><br />
                    <label>email:</label>
                    <input type="email" placeholder="enter your email" style={{ width: "300px", height: "50px", margin: "20px" }} value={userAuth.email} onChange={onfeildcahnge} name="email"></input><br />
                    <i style={{ color: "red" }}>{error?.email}</i> <br />
                    <label>password:</label>
                    <input type="password" placeholder="enter your password" style={{ width: "300px", height: "50px", margin: "20px" }} value={userAuth.password} onChange={onfeildcahnge} name="password"></input><br />
                    <i style={{ color: "red" }}>{error?.password}</i>
                    <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => onRoleChange(e)}>
                                    <option selected disabled value={"Select Role"}>{"Select role"}</option>
                                    {roles.map((role) => {
                                        return (
                                            <option value={role}>{role}</option>
                                        )
                                    })}
                                </select>
                            </div>
                    <Link to="/login">alredy have an account go to login</Link><br/>
                    <button style={{ width: "100px", height: "50px", borderRadius: "10%", backgroundColor: "#3cbda9", marginTop: "5%" }}>signup</button><br/>
                    {iserror && <div className="mt-3">
                        <i style={{ color: "red" }}>{errmsg}</i>

                    </div>}
                </form>

            </div>
        </div>
    )
}

export default Signup