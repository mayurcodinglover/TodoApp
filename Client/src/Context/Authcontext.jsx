import { useContext } from "react";
import { createContext } from "react";
import { useState ,useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Authcontext=createContext();

const AuthProvider=({children})=>{
    const [user, setuser] = useState(null);
    const [token, settoken] = useState(localStorage.getItem('token')||null);
    const navigate=useNavigate();

    useEffect(() => {
      const validatetoken=async()=>{
        console.log("useeffect called");
        try {
          if(token)
            {
              axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
              const response=await axios.post("http://localhost:3000/validatetoken",{
                token:token,
              });
              setuser(response.data.user)
            }
        } catch (error) {
          console.log("Error while validating token",error);
          settoken('');
          setuser(null);
        }
      }
      validatetoken();
    }, [token])
    

    const userregister = async (formdata) => {
        try {
          const response = await axios.post("http://localhost:3000/register", {
            username: formdata.username,
            email: formdata.email,
            password: formdata.password,
          });
          localStorage.setItem('token',response.data.token);
          settoken(response.data.token);
          setuser(response.data.user);
          alert("user registered successfully")
          navigate("/home")
        } catch (error) {
          if (error.response.status === 400) {
            alert("user already exist")
          } else {
            console.error("Error while calling user register API:", error);
            throw new Error("Error while calling user register API");
          }
        }
      };

      const userlogin=async(formdata)=>{
        try {
          const response=await axios.post("http://localhost:3000/login",{
            email:formdata.email,
            password:formdata.password,
          });
          localStorage.setItem('token',response.data.token);
          settoken(response.data.token);
          setuser(response.data.user);  
          
          alert("user login success");
          navigate("/home")
        } catch (error) {
          if(error.response.status===400)
            {
              alert("Invalid username or password")
            }
            else{
              throw new Error("Error while calling user login API");
            }
        }
      }
      const logout=()=>{
        localStorage.removeItem('token');
        settoken(null);
        setuser(null);
        navigate("/");
      }

      return (
        <Authcontext.Provider value={{user,token,userregister,userlogin,logout}}>
        {children}
        </Authcontext.Provider>
      )
}

export {Authcontext,AuthProvider};

