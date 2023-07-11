import { addDoc, getDocs, collection, query, where, deleteDoc, doc} from "firebase/firestore";
import { Post as InterfacePost} from "./main";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post : InterfacePost;
}
interface Like {
    userid : string;
    likeid: string;
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user]= useAuthState(auth); 

    const[likes, setlikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesdoc = query(likesRef, where("postid", "==", post.id))

    const getLikes = async() => {
        const data = await getDocs(likesdoc);
        setlikes(data.docs.map((doc)=> ({userid: doc.data().userid, likeid:doc.id})));
    }

    const addLike = async() => {
        try {
        const newDoc = await addDoc (likesRef, {userid: user?.uid, postid: post.id});
        if (user) {
            setlikes((prev)=>
            prev ? [...prev, {userid: user.uid, likeid: newDoc.id}] : [{userid: user.uid, likeid: newDoc.id}]);
        };
    } catch (err) {
        console.log(err);
    }
    };
    const removeLike = async() => {
        try {
            const liketodeletequery = query(likesRef, where("postid", "==", post.id),
            where("userid", "==", user?.uid)
            );

            const liketodeletedata = await getDocs(liketodeletequery);

            const liketodelete = doc(db, "likes", liketodeletedata.docs[0].id );

        await deleteDoc (liketodelete);
        if (user) {
            setlikes((prev)=> prev && prev.filter((like)=> like.likeid!==liketodeletedata.docs[0].id));
        };
    } catch (err) {
        console.log(err);
    }
    };

    const hasuserliked = likes?.find((like)=>like.userid === user?.uid);

    useEffect(()=> {
        getLikes();
    }, []);
    
    return(
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>

            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasuserliked ? removeLike : addLike}>{hasuserliked?<>&#128078;</> : <>&#128077;</>}</button>
                {likes &&<p>Likes: {likes?.length}</p>}
            </div>
        </div>

    );
}