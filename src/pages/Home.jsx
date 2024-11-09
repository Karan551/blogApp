import React, { useEffect, useState } from 'react';
import { Container, PostCard } from "../components/index";
import dbService from "../appwrite/dbConfig";
import { Link, useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';


export async function postLoading() {
    const allPosts = await dbService.showPosts();
    return  allPosts ;
}

export default function Home() {
    const [posts, setPosts] = useState([]);
    const loaderResult = useLoaderData();
    const isLoggedIn = useSelector((state) => state.myblog.status);


    useEffect(() => {
        if(loaderResult){
            setPosts(loaderResult.documents)
        }
      
    }, [posts]);

    if (posts.length == 0 || !isLoggedIn) {
        return <div className="w-full py-2 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl md:text-3xl font-bold ">
                            <Link to={"/login"}
                                className="text-blue-500 hover:text-blue-700 hover:underline"
                            > Login</Link> to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>;
    }
    return (
        isLoggedIn && <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((eachPost) => (

                            <div key={eachPost.$id} className="w-1/2 md:w-1/4 p-2">
                                <PostCard {...eachPost} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    );


}
