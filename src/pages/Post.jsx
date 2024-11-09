import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLoaderData } from 'react-router-dom';
import { Button, Container } from '../components/index';
import dbService from '../appwrite/dbConfig';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';


export async function ImgLoading({ params }) {
    const slug = params.postID;
    const post = await dbService.getPost(slug);
    return await dbService.filePreview(post?.featuredImage);

}

export default function Post() {
    const { postID } = useParams();
    const imgSrc = useLoaderData();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const userData = useSelector((state) => state.myblog.userData);


    const isAuthor = posts && userData ? posts.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true);
        if (postID) {
            dbService.getPost(postID)
                .then((response) => {
                    if (response) setPosts(response), setLoading(false);
                    else navigate("/");
                });
        } else {

            navigate("/");
        }

    }, [postID, navigate]);


    const deletePost = () => {
        dbService.deletePost(posts.$id)
            .then((response) => {
                if (response) {
                    dbService.deleteFile(posts.featuredImage)
                        .then((res) => res && (
                            toast.success("Delete Post Successfully."),
                            navigate("/")));
                }
            })
            .catch((err) => console.log("error in file deleting", err.message));
    };



    if (loading)
        return <h1 className='text-3xl grid place-content-center bg-white p-4  min-h-screen'>
            <span className='spinner mx-auto'></span>
        </h1>;
    return posts ? (
        <div className='py-8'>

            <Container>
                <section className='flex flex-wrap gap-2'>
                    <div className="w-full md:w-1/2 flex justify-center mb-4 relative border rounded-xl">
                        <img
                            src={imgSrc}
                            alt={posts?.title || "post-img"}
                            className="rounded-xl"
                        />



                        {
                            isAuthor &&
                            <div className="absolute right-6 top-6 ">

                                <Link to={`/edit-post/${posts?.$id}`}

                                >
                                    <Button
                                        textColor='text-white'
                                        cssClass='text-sm md:text-xl'
                                    >
                                        Edit Post
                                    </Button>
                                </Link>

                                <Button
                                    onClick={deletePost}
                                    textColor='text-white'
                                    cssClass='mx-2 md:mx-4 bg-red-500 hover:bg-red-700 text-sm md:text-xl'
                                >
                                    Delete Post
                                </Button>
                            </div>
                        }
                    </div>

                    <section className='w-full md:w-[48%] p-4 bg-gray-200 rounded-lg'>
                        <div className="w-full mb-4">
                            <h1 className="text-2xl font-bold">Title :- {posts.title}</h1>
                        </div>

                        <div className="text-lg w-full">

                            <div className='font-semibold text-xl md:text-2xl'> Content :</div>
                            <div className='py-2'>  {parse(String(posts.content))}</div>
                        </div>
                    </section>
                </section>
            </Container>
        </div>
    ) : <div>Please Create At Least one Post To show.</div>;
}
