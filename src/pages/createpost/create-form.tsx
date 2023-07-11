import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"
interface createformdata {
    title: string;
    description: string;
};
export const CreateForm =() => {
    
    const [user]= useAuthState(auth); 
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    });

    const {register, handleSubmit, formState:{errors},} = useForm<createformdata>({
        resolver: yupResolver(schema),
    });

    const postref = collection(db, "posts");

    const oncreatepost = async( data:createformdata) => {
        await addDoc(postref, {
            ...data,
            username: user?.displayName,
            userid: user?.uid,
        });
        navigate("/");

    };
    return<div>
        <form onSubmit={handleSubmit(oncreatepost)}>
            <input placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <input placeholder="Description..."{...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="Submit" className="submitformbutton"/>
        </form>
    </div>
}