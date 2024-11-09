import React, { useState,useEffect } from 'react';
import dbService from "../appwrite/dbConfig";
import { Link } from 'react-router-dom';

export default function PostCard({ $id, title, featuredImage }) {

    const [imgSrc, setImgSrc] = useState(null);

    const imgLoading = async () => {
        const result = await dbService.filePreview(featuredImage);
        setImgSrc(result);
    };

    useEffect(() => {
        imgLoading();
    }, []);


    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className="mb-4 w-full">
                    <img src={imgSrc} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-base md:text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}
