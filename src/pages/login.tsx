import {auth, provider} from "../config/firebase"
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom"

export const Login = () => {

    const navigate = useNavigate();
    
    const signin = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate("/");
    }

    return <div>
        <p>Sign in with Google to continue</p>
        <button onClick={signin}>Sign in with Google</button>
        </div>
};