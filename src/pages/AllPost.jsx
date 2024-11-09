import { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import dbService from "../appwrite/dbConfig";
import { useLoaderData } from "react-router-dom";

export async function showAllPosts() {
    const response = await dbService.showPosts();
    return response;
}

export default function AllPost() {
    const [posts, setPosts] = useState([]);
    const postResult = useLoaderData();

    useEffect(() => {
        if (posts)
            setPosts(postResult?.documents);
    }, [posts]);
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">

                    {
                        posts.map((eachPost) => (
                            <div key={eachPost.$id} className="w-1/2 p-2">
                                <PostCard {...eachPost} />
                            </div>
                        ))

                    }
                </div>
            </Container>
        </div>
    );
}
