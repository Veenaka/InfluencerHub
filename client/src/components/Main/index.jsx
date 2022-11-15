import styles from "./styles.module.css";
import Search from "../Search";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate} from "react-router-dom";
import MainMenu from "./MainMenu";

import Login from '../Login/index'
function Main(props) {
	//const loggedInUser = localStorage.getItem("token");
	const [category,setCategory] = useState('')
	const [id, setId] = useState('');
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem('token')

	//logout function
	

	//By this,we are retrieving the firstName of user
	useEffect(() => {
		if(loggedInUser){
			const userToken = localStorage.getItem("token");
			const user = ParseJwt(userToken);
			axios.get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`).then((response) => {
					setId(response.data._id);
					setCategory(response.data.category)
				})
		}
	}, [])

	if(loggedInUser){
		return (
			<div className={styles.main_container}>
				
				<MainMenu></MainMenu>
				<h2><button className={styles.white_btn1} onClick={() => {navigate(`/detail`)}}>
						View All Businesses
					</button></h2>
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

export default Main;
