import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
import ParseJwt from "../../utilities/ParseJwt";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_BASEURL}/api/auth`;
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			const token = localStorage.getItem('token')
			const user = ParseJwt(token)

			if(!user.isActive){
				setError('Your account has been suspended');
				return;
			}

			if(user.category==='influencer'&&user.adminVerified===true&&user.isFirstLogin===true){
				navigate('/firstlogini')}
			else if(user.category==='business'&&user.adminVerified===true&&user.isFirstLogin===true){
					navigate('/firstloginb')

			}else if(user.category==='influencer'&&user.adminVerified===true&&user.isFirstLogin===false){
				navigate('/home')
			}else if(user.category==='business'&&user.adminVerified===true){
				navigate('/business')
			}else if(user.category==='admin'&&user.isFirstLogin===true){
				navigate('/firstlogin')
			}else if(user.category==='admin'&&user.isFirstLogin===false){
				navigate('/dashboard')
			}else{
				setError('Your account has yet to be verified')
			}
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/category">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
