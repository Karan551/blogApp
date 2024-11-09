import { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import dbService from "../appwrite/dbConfig";

export async function currentPost({ params }) {
    const { postID } = params;
    const editPost = await dbService.getPost(postID);
    return { postID, editPost };
}

export default function EditPost() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const { postID, editPost } = useLoaderData();


    useEffect(() => {
        if (postID) {
            setPost(editPost);
        } else {
            navigate("/");
        }
    }, [postID, navigate]);
    
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : <div>No Post To show <Link to="/" className="inline-block p-4 rounded-lg bg-teal-500 hover:bg-teal-700 text-white">Go To Home Page</Link></div>;
}
