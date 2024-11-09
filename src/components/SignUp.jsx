import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import authService from '../appwrite/auth';
import { login } from "../features/blog/blogSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";



export default function SignUp() {
  const [errMsg, setErrMsg] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setTimeout(() => {
    if (pwdFocus) {
      setPwdFocus(false);
    }
  }, 2000);


  const handleSignUp = async (data) => {
    try {
      setLoading(true);

      const user = await authService.createAccount(data);
     
      if (user) {
        const userData = await authService.getCurrentUser();
        
        if (userData) {
          dispatch(login(userData));

           // To show notification
           toast.success("User Created And Login Succesfully.", {
            duration: 2000,
            position: "top-center",
            icon: "✅",
            className: "flex text-lg md:text-xl font-semibold px-2",
            ariaProps: {
                role: "status",
                "aria-live": "polite",
            },
        });

          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error in Signup component::", error.message);
      setErrMsg(error.message);
      setLoading(false);
    }

  };

  if (loading)
    return <h1 className='text-3xl grid place-content-center bg-white p-4  min-h-screen'>
      <span className='spinner mx-auto'></span>
    </h1>;

  return (
    <section className="flex items-center justify-center">

      <div className="mx-auto  items-center justify-center  w-full max-w-lg md:max-w-2xl bg-gray-100 rounded-xl p-10 border border-black/50 my-2 bg-cover bg-no-repeat "

        style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2023/07/23/08/46/flower-8144644_960_720.jpg")` }}
      >
        <h2 className="text-center text-4xl font-bold leading-tight text-white">Create Your account</h2>

        {errMsg && <div className="flex justify-between bg-red-500 w-full px-4 py-2 text-white rounded-lg my-2"> <div className="text-center py-2">{errMsg} </div> <div
          className="flex justify-center items-center cursor-pointer shadow-xl px-4 py-2 bg-white text-black rounded-full w-10 h-10"
          role='button'
          onClick={() => setErrMsg("")}
        >X</div>

        </div>}

        <form className="bg-gray-100/80 px-6 py-4 mt-4 mb-2 rounded-lg backdrop-blur-sm max-w-2xl w-full mx-auto border border-gray-100 md:text-2xl"
          onSubmit={handleSubmit(handleSignUp)}
        >

          <Input
            type="text"
            placeholder="Enter Your Name :"
            label="Username :"
            cssClass="mb-4"
            autoComplete="username"
            {...register("name", {
              required: "Username address is required.",
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />

          {errors.name && <p role="alert" className="text-white bg-red-500/80 p-2 rounded-lg text-base font-semibold mb-2">{errors.name?.message}</p>}


          {/* ---- */}
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

        {/*   <Input
            type="tel"
            placeholder="Enter Your Phone number :"
            label="Number :"
            cssClass="mb-4"
            maxLength="10"
            {...register("phone", {
              required: true
            })}
          />
 */}
          <Input
            type="password"
            placeholder="Enter Your Password :"
            label="Password :"
            cssClass="mb-4"
            autoComplete="current-password"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            {...register("password",
              {
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,

                  message: `8 to 24 characters. Must include uppercase and lowercase letters a number and a special character. 
            Allowed special characters
           ! @ # $ %`
                }


              }
            )}

            aria-invalid={errors.password ? "true" : "false"}
          />
          <p className={pwdFocus ? `text-xs md:text-sm px-2 py-2 text-white bg-black/70 rounded-lg mr-1 mb-2` : "hidden"} id='pwdnote'><FaInfoCircle />
            8 to 24 characters.<br /> Must include uppercase and lowercase letters a number and a special character. <br />
            Allowed special characters
            <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          {errors.password &&
            <p role="alert"
              className="text-white bg-red-500/80 p-2 rounded-lg text-base font-semibold mb-2"
            >{errors.password?.message}</p>}

          <Button
            cssClass="my-4 cursor-pointer w-full text-center"

            type='submit'
            children={"Sign Up"}
            bgColor='bg-teal-500'
          />

          <p className="my-2 text-center text-xl text-black">Already Have an account ? Login <Link to={"/login"} className="hover:underline text-blue-500 hover:text-blue-700">Here</Link></p>
        </form>

      </div>
    </section>
  );
}
