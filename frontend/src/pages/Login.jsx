import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Login(){

    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        email:"",
        password:""

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



    const handleLogin = async()=>{


        if(!formData.email || !formData.password){

            alert("Please enter email and password");
            return;

        }



        try{


            const response = await API.post(

                "/login",

                formData

            );



            console.log(response.data);



            // Save JWT Token

            localStorage.setItem(

                "token",

                response.data.token

            );



            alert("Login successful");



            navigate("/dashboard");


        }


        catch(error){


            console.log("LOGIN ERROR:",error);



            alert(

                error.response?.data?.message ||

                "Login failed"

            );


        }


    };




    return(


        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800">


            <div className="w-105 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8">



                <h1 className="text-3xl font-bold text-white text-center">

                    AI Multi-Risk

                </h1>



                <p className="text-white text-center mb-6">

                    Secure Risk Analysis Platform

                </p>



                <input

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    type="email"

                    placeholder="Enter Email"

                    className="w-full p-3 mb-4 rounded-lg"

                />




                <input

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    type="password"

                    placeholder="Enter Password"

                    className="w-full p-3 mb-5 rounded-lg"

                />




                <button

                    onClick={handleLogin}

                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"

                >

                    Login

                </button>



                <div className="text-center text-white my-4">

                    OR

                </div>



                <button

                    className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold"

                >

                    🔵 Continue with Google

                </button>




                <p className="text-white text-center mt-5">

                    Don't have an account?


                    <span

                        onClick={()=>navigate("/register")}

                        className="text-yellow-300 cursor-pointer ml-2"

                    >

                        Register

                    </span>


                </p>



            </div>


        </div>


    );

}


export default Login;