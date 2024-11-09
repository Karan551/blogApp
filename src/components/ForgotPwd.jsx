import React, { useState, useRef } from 'react';
import { Input, Button } from "./index";
import { toast } from "react-toastify";
import { login as blogLogin } from "../features/blog/blogSlice";

import { useNavigate } from 'react-router-dom';
import authService from "../appwrite/auth";
import ReactCountryDropdown from "react-country-dropdown";
import { useDispatch } from 'react-redux';

export default function ForgotPwd() {

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [secret, setSecret] = useState("");

    const [userID, setUserID] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [btnDisable, setBtnDisable] = useState(false);
    const inputRef = useRef();


    const handleCountryChange = (country) => {
        setCountryCode(`+${country.callingCodes[0]}`);
    };
    const handleOtp = async () => {
        console.log("this is phone number after submit::", phoneNumber);
        setBtnDisable(true);
        inputRef.current.focus();


        const response = await authService.getPhoneOtp((countryCode + phoneNumber));
        console.log("this is result of appwrite handle otp::", response);
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
        const session = await authService.phoneLogin(userID, secret);
        console.log("this is result of appwrite phone login::", session);
        if (session) {
            const userData = await authService.getCurrentUser();
            console.log("this is userdata in login::", userData);

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


                <h2 className="text-center text-4xl font-bold leading-tight text-white">Login With Contact Number:-</h2>

                {errMsg && <div className="flex justify-between bg-red-500 w-full px-4 py-2 text-white rounded-lg my-2"> <div className="text-center py-2">{errMsg} </div> <div
                    className="flex justify-center items-center cursor-pointer shadow-xl px-4 py-2 bg-white text-black rounded-full w-10 h-10"
                    role='button'
                    onClick={() => setErrMsg("")}
                >X</div>

                </div>}

                <div className="bg-gray-100/80 p-4 my-6 rounded-lg backdrop-blur-sm max-w-lg w-full mx-auto border border-gray-100 text-base md:text-2xl"
                >
                    <form onSubmit={(e) => (e.preventDefault(), handleOtp())} >

                        <div className="flex flex-col md:flex-row justify-between bg-white px-2 rounded-lg">
                            <div className='relative w-24 h-24 ml-1'>
                                <div className='absolute top-[50%]'>
                                    <ReactCountryDropdown
                                        defaultCountry="IN"
                                        onSelect={handleCountryChange}

                                    />
                                </div>
                            </div>
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="Enter Your Number :"
                                    label="Phone Number :"
                                    labelCss="md:ml-8 mt-1"
                                    cssClass="md:ml-9 mb-2 !p-[10px] md:!w-[90%] w-full md:self-end"
                                    autoComplete="username"
                                    required={true}
                                    maxLength={10}

                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

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
