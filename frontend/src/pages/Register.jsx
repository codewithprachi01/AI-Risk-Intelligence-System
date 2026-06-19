import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Register(){

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        name:"",
        email:"",
        password:""

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleRegister = async()=>{


        if(!formData.name || !formData.email || !formData.password){

            alert("Please fill all fields");
            return;

        }



        try{


            const response = await API.post(
                "/register",
                formData
            );


            console.log(response.data);


            alert("Registration successful");


            navigate("/");


        }

        catch(error){


            console.log("REGISTER ERROR:", error);


            if(error.response){

                console.log(
                    "SERVER RESPONSE:",
                    error.response.data
                );

            }


            alert(
                error.response?.data?.message ||
                "Registration failed"
            );


        }


    };




    return(

        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800">


            <div className="w-105 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8">


                <h1 className="text-3xl font-bold text-white text-center mb-2">

                    AI Multi-Risk

                </h1>


                <h2 className="text-2xl font-bold text-white text-center mb-6">

                    Create Account

                </h2>




                <input

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                    placeholder="Full Name"

                    className="w-full p-3 mb-4 rounded-lg"

                />



                <input

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    type="email"

                    placeholder="Email Address"

                    className="w-full p-3 mb-4 rounded-lg"

                />



                <input

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    type="password"

                    placeholder="Password"

                    className="w-full p-3 mb-5 rounded-lg"

                />




                <button

                    onClick={handleRegister}

                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"

                >

                    Register

                </button>




                <p className="text-white text-center mt-5">

                    Already have an account?

                    <span

                        onClick={()=>navigate("/")}

                        className="text-yellow-300 cursor-pointer ml-2"

                    >

                        Login

                    </span>


                </p>


            </div>


        </div>


    );

}


export default Register;