import React, { useState } from 'react';
import { Input, Button, Logo } from "./index";
import { useForm } from 'react-hook-form';
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as blogLogin } from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const login = async (data) => {
        try {
            setLoading(true);

            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(blogLogin(userData));
                    setLoading(false);
                    
                    // To show notification
                    toast.success("Login Succesfully.", {
                        duration: 2000,
                        position: "top-center",
                        icon: "✅",
                        className: "flex text-2xl font-semibold px-2",
                        ariaProps: {
                            role: "status",
                            "aria-live": "polite",
                        },
                    });

                    // go to home page
                    navigate("/");
                }
            }

        } catch (error) {
            console.log("Error in Login Component::", error.message);
            setErrMsg(error.message);
            setLoading(false);
        }

    };
    if (loading)
        return <h1 className='text-3xl grid place-content-center bg-white p-4  min-h-screen'>
            <span className='spinner mx-auto'></span>
        </h1>;
    return (
        <section className="flex items-center justify-center w-full">

            <div className="mx-auto flex items-center justify-center flex-col w-full max-w-lg md:max-w-2xl bg-gray-100 rounded-xl px-5  py-3 border border-black/50 my-3 bg-cover bg-no-repeat "

                style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2021/08/07/19/49/cosmea-6529220_960_720.jpg")` }}
            >

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-4xl font-bold leading-tight text-white">Sign in to your account</h2>

                {errMsg && <div className="flex justify-between bg-red-500 w-full px-4 py-2 text-white rounded-lg my-2"> <div className="text-center py-2">{errMsg} </div> <div
                    className="flex justify-center items-center cursor-pointer shadow-xl px-4 py-2 bg-white text-black rounded-full w-10 h-10"
                    role='button'
                    onClick={() => setErrMsg("")}
                >X</div>

                </div>}

                <form className="bg-gray-100/80 p-4 my-6 rounded-lg backdrop-blur-sm max-w-lg w-full mx-auto border border-gray-100 text-base md:text-2xl"
                    onSubmit={handleSubmit(login)}
                >
                    <Input
                        type="email"
                        placeholder="Enter Your Email :"
                        label="Email :"
                        cssClass="mb-4"
                        autoComplete="username"
                        {...register("email", {
                            required: "Email address is required.",
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />

                    {errors.email && <p role="alert" className="text-white bg-red-500/80 p-2 rounded-lg text-base font-semibold mb-2">{errors.email?.message}</p>}

                    <Input
                        type="password"
                        placeholder="Enter Your Password :"
                        label="Password :"
                        cssClass="mb-4"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required.",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,

                                message: `8 to 24 characters. Must include uppercase and lowercase letters a number and a special character. 
                          Allowed special characters
                         ! @ # $ %`
                            }

                        })}

                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password &&
                        <p role="alert"
                            className="text-white bg-red-500/80 p-2 rounded-lg text-base font-semibold mb-2"
                        >{errors.password?.message}</p>}

                    <Button
                        cssClass="my-4 cursor-pointer w-full text-center"

                        type='submit'
                        children={"Login"}
                        bgColor='bg-teal-500'
                    />
                    <div className='flex flex-col justify-center space-y-3 items-center'>

                        <Link to={"/forgot-password"} className='hover:underline text-blue-500 font-semibold text-lg md:text-xl'>Login With Contact Number</Link>

                        <Link to={"/email-login"} className='hover:underline text-blue-500 font-semibold text-lg md:text-xl'>Login With Email Address</Link>


                    </div>

                    <p className="my-2 text-center text-xl text-black">Don't Have an account ? Sign Up <Link to="/signup" className="hover:underline text-blue-500 hover:text-blue-700">Here</Link></p>
                </form>

            </div>
        </section>
    );
}
