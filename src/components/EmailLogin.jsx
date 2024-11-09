import React, { useState, useRef } from 'react';
import { Input, Button } from "./index";
import authService from "../appwrite/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { login as blogLogin } from "../features/blog/blogSlice";
import { useDispatch } from 'react-redux';



export default function EmailLogin() {
    const [errMsg, setErrMsg] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userID, setUserID] = useState(null);
    const [secret, setSecret] = useState("");

    const inputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOTP = async () => {
        inputRef.current.focus();
        setBtnDisable(true);
        const response = await authService.emailOtp(userEmail);
        if (response) {
            setUserID(response?.userId);

            // To show notification
            toast.success("OTP send Succesfully.", {
                duration: 2000,
                position: "top-center",
                icon: "✅",
                className: "flex text-xl font-semibold px-2",
                ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        const session = await authService.emailLogin(userID, secret);
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
    };

    if (loading)
        return <h1 className='text-3xl grid place-content-center bg-white p-4  min-h-screen'>
            <span className='spinner mx-auto'></span>
        </h1>;
    return (
        <section className="flex items-center justify-center w-full">
            <div className="mx-auto flex items-center justify-center flex-col w-full max-w-lg md:max-w-2xl bg-gray-100 rounded-xl px-5  py-3 border border-black/50 my-3 bg-cover bg-no-repeat"

                style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2021/08/07/19/49/cosmea-6529220_960_720.jpg")` }}
            >
                <h2 className="text-center text-4xl font-bold leading-tight text-white">Login With Email:-</h2>

                {
                    errMsg && <div className="flex justify-between bg-red-500 w-full px-4 py-2 text-white rounded-lg my-2"> <div className="text-center py-2">{errMsg} </div> <div
                        className="flex justify-center items-center cursor-pointer shadow-xl px-4 py-2 bg-white text-black rounded-full w-10 h-10"
                        role='button'
                        onClick={() => setErrMsg("")}
                    >X</div>

                    </div>
                }

                <div className="bg-gray-100/80 p-4 my-6 rounded-lg backdrop-blur-sm max-w-lg w-full mx-auto border border-gray-100 text-base md:text-2xl"
                >
                    <form onSubmit={(e) => (e.preventDefault(), handleOTP())}>
                        <Input
                            type="email"
                            placeholder="Enter Your Email :"
                            label="Email :"
                            cssClass="mb-4"
                            autoComplete="username"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}

                        />

                        <Button
                            cssClass="my-2 cursor-pointer w-[40%] md:w-1/4 text-sm md:text-lg px-4 text-center font-semibold disabled:text-gray-400/70 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            type="submit"
                            children={"Send OTP"}
                            bgColor='bg-teal-500'
                            disabled={btnDisable}
                        />
                    </form>

                    <form onSubmit={(e) => (e.preventDefault(), handleLogin())}>
                        <Input
                            type="text"
                            placeholder="Enter Your OTP :"
                            maxLength={6}
                            cssClass="mb-2 mt-2"
                            autoComplete="username"
                            ref={inputRef}
                            readOnly={!btnDisable}
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                        />

                        <Button
                            cssClass="mt-2 cursor-pointer w-full px-6 text-center font-semibold disabled:text-gray-400/70 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            type='submit'
                            children={"Login"}
                            bgColor='bg-teal-500'
                            disabled={!btnDisable}
                        />

                    </form>
                </div>
            </div>
        </section>
    );
}
