import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
function NavBar() {
    const [isToggled, setIsToggled] = useState(false)
    const [user,setUser] = useState(null)
    const [profile,setProfile] = useState(null)
    const navigate = useNavigate();
    const getUserInfo = async ()=>{
        const userInfo = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        setUser(userInfo)
    }
    const getUserProfile = async ()=>{
        let userInfo = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        setUser(userInfo)
        if (userInfo) {
            fetch("http://localhost:7000/auth/profile/" + userInfo.email).then((res) => {
                return res.json();
            }).then((data) => {
                    console.log(data)
                setProfile(data);
            })
        }
    }
    useEffect(()=>{
        getUserInfo();
        getUserProfile();
       
    },[])
    const logout = async () => {
        setIsToggled(!isToggled)
        await localStorage.clear();
        navigate("login")
    }
    const dropDownToggele = () => {
        setIsToggled(!isToggled)
    }

    const goToPage = (e,pageName)=>{
        e.preventDefault();
        e.stopPropagation();
        navigate(pageName)
        setIsToggled(!isToggled)
        
    }
    return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <Link className="navbar-brand"  style={{color:"red"}}>Event<i style={{color:"greenyellow"}}>Brite</i></Link>
                <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent" style={{ justifyContent: 'space-around' }}>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    {user?.role!="admin" && <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >Eventlist</Link>
                        </li>}
                        {user?.role==="admin" && <li className="nav-item">
                            <Link to="adimntasks" className="nav-link active" aria-current="page" >Eventlist</Link>
                        </li>}
                        {user?.role==="admin" && <li className="nav-item">
                            <Link className="nav-link" to="create">Createevent</Link>
                        </li>}
                        {user?.role==="admin" && <li className="nav-item">
                            <Link className="nav-link" to="users">Users</Link>
                        </li>}

                    </ul>
                    <ul className="navbar-nav" style={{marginLeft:'auto'}}>
                        <li class="nav-item dropdown">
                            <Link class="nav-link" role="button" onClick={() => dropDownToggele()}>
                                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'#ddd'}}>
                                    <img src={`http://localhost:7000/uploads/${profile?.profilepic}`} style={{width:'100%',height:'100%',borderRadius: '23px'}}/>
                                </div>
                            </Link>
                            {isToggled && <div class="dropdown-menu" style={{ display: 'block' }}>
                                <Link class="dropdown-item" onClick={(e) => goToPage(e,"profile")}>ProfileInfo</Link>
                                <Link class="dropdown-item" onClick={(e) => goToPage(e,"changepassword")}>Change Password</Link>
                                <div class="dropdown-divider"></div>
                                <Link class="dropdown-item" onClick={() => logout()}>Logout</Link>
                            </div>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar