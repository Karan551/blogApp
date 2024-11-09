
import { Container, Logo } from "../index";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogoutBtn from "./LogoutBtn";

export default function Header() {
    const authStatus = useSelector((state) => state.myblog.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];
    return (
        <header className={"py-3 shadow bg-gray-500 text-white font-semibold text-base w-full  md:text-xl"}>
            <Container>
                <ToastContainer />

                <nav className="flex justify-center">
                    <div className="md:mr-4 hidden md:block">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {
                            navItems.map((eachItem) => (
                                eachItem.active ?
                                    <li key={eachItem.name}>
                                        <button className='inline-bock px-3 text-lg md:text-xl md:px-6 py-2 duration-200 hover:bg-blue-500 rounded-full'
                                            onClick={() => navigate(eachItem.slug)}
                                        >{eachItem.name}</button>
                                    </li>

                                    : null
                            ))
                        }
                        {
                            authStatus && <li><LogoutBtn /></li>
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
