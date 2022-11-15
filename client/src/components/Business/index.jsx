import styles from "./styles.module.css";
import Search from "../Search";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Login';
import { useNavigate} from "react-router-dom";
import MainMenu from "../Main/MainMenu";

function Business(props) {
    const loggedInUser = localStorage.getItem("token");
	const [id,setUsrId] = useState('')
    const [fname, setUserName] = useState('');
	const [category,setCategory] = useState('');

   
    const navigate = useNavigate();
	
	useEffect(() => {
		const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        if(userToken){
		
			const response = axios.get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`).then((response) => {
			
            setUserName(response.data.firstName);
			setUsrId(response.data._id);
			setCategory(response.data.category)
	
			console.log(response.data._id);
		})
		if(response.staus!=='ok'){
			setUserName('default');
		}
	}      
    }, [])
	if(loggedInUser){
			return (
				<div>
					<MainMenu></MainMenu>
			<div style={{display:"flex",justifyContent:"center",alignContent:"center",margin:"50px"}}>
			<h4><button style={{background:"#3bb19b",color:"white",padding:"30px",borderStyle:"solid",borderRadius:"30px"}} onClick={() => {navigate(`/detail`)}}>
							View All influencers
						</button></h4></div>
					
					<Search category={category}/>
			
				</div>
			);
	}else{
		return(
			<div>
				<Login></Login>
			</div>
		)
	}
};

export default Business;
