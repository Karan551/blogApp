import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice";


export default configureStore({
    reducer: {
        myblog: blogReducer
    }
});
