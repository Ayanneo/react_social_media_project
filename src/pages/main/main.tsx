import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post{
    id: string
    userid: string
    title: string
    username: string
    description: string
};
export const Main = () => {
    const[postslist, setpostlist] = useState<Post[] | null>(null);
    const postref = collection(db, "posts");

    const getposts = async() => {
        const data = await getDocs(postref)
        setpostlist(data.docs.map((doc)=> ({...doc.data(), id: doc.id}))as Post[]);
    };

    useEffect(()=>{
        getposts();
    }, []);

    return (
        <div>
           {postslist?.map((post) => (
            <Post post={post} />
           ))}
        </div>
    );
};