
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
const Category = () => {
	useEffect(() => {
		// change background color with a random color
		const color = Math.floor(Math.random()*16777215).toString(16);
		document.body.style.background = color;
	  });

	return (
		
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					
				</div>
				<div className={styles.right}>
					<h1>Select category</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Influencer
						</button>
					</Link>
                    <Link to="/signupb">
						<button type="button" className={styles.white_btn}>
							Business
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Category;
