import introImg from '../assets/intro-img.png';
import { Link } from 'react-router-dom';
import Rout from '../controllers/route';
import {useNavigate} from "react-router-dom" 



const Intro =() =>{
       let navigate = useNavigate() 

    return             <section>
    <div className="intro-section">
        <div className="intro-text">
            <p className="captitle">Experience the future of
            </p>
            <p className="captitle-bold">Agriculture</p>
            <div className="button-container">
                <button className="btn-white" onClick ={()=>{ navigate("/login_signup")}}>Signup</button>
                <button className="btn-transparent">Signin </button>
            </div>
        </div>
        <div className="intro-image">
            <img src={introImg} alt="Image description"/>
        </div>


    </div>

</section>
}
export default Intro