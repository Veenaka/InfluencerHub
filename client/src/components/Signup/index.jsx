import React,{ useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

//influencers signup form
const Signup = () => {
	const [repassword,setRepassword] = useState(null);
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		category: "",
		

		category:'influencer'
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(data.password===repassword){
			try {
				const url = `${process.env.REACT_APP_BASEURL}/api/users`;
				const { data: res } = await axios.post(url, data);
				setMsg(res.message);
				console.log(res.message);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}else{
			alert("Password mismatch")
		}
	
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Influencer Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
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
						<input
						type="password"
						placeholder="confirm password"
						name="password"
						onChange={(e)=>{setRepassword(e.target.value)}}
						value={repassword}
						required
						className={styles.input}
					/>



						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
