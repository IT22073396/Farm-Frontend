import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        checkUserLoggedIn();
    },[]);
    //check if the user is logged in.
    const checkUserLoggedIn = async () => {
     
        try {
            const res = await fetch(`http://localhost:4000/api/me`,{
                method:"get",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if(!result.error){
                if(location.pathname === "/login" || 
                location.pathname === "/register"){
                    setTimeout(()=> {
                        navigate("/",{replace:true});

                    },500);
                }else{
                    navigate(location.pathname ? location.pathname:"/");

                }
                setUser(result);
                
            }else if(location.pathname !== "/reset-password-confirm"){
                navigate("/login",{replace:true});
            }
        } catch (err) {
            console.log(err);
        }

    }

    //login request

    const loginUser = async(credentails)=>{
        try {
            const res = await fetch ('http://localhost:4000/api/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",  
                },
                body:JSON.stringify({ ...credentails }),
            })
            const result = await res.json();
          if(!result.error){
           // console.log(result);
            localStorage.setItem("token", result.token);
            setUser(result.user);
            return result;
          }else{
            toast.error(result.error);
          }
        } catch (err) {
            console.log(err);
        }
    }
    //register request
    const registerUser = async(credentails) => {
        try {
            const res = await fetch('http://localhost:4000/api/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",  
                },
                body:JSON.stringify({ ...credentails }),
            })
            const result = await res.json();
            if(!result.error){
               toast.success("User registered successfully!");
               navigate("/login",{replace:true})
    
              }else{
                toast.error(result.error);
              }
        } catch (err) {
            console.log(err);
        }
    }
     // Define the updateUserProfile function
     const updateUserProfile = async (formData) => {
        try {
            const res = await fetch(`http://localhost:4000/api/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (!result.error) {
                toast.success("Profile updated successfully!");
                setUser(result.user); // Update the user state with the updated profile
            } else {
                toast.error(result.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (<AuthContext.Provider value={{ loginUser,registerUser,user,setUser,updateUserProfile}}>
        
        {children}
        </AuthContext.Provider>
    )
}