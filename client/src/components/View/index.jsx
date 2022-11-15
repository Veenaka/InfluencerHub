import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import image from "../../images/user.jpg";
import styles from "./styles.module.css";
import Login from '../Login/index'
import AllPostsExternal from '../posts-and-comments/AllPostsExternal';
import MainMenu from '../Main/MainMenu';
import { FaStar } from 'react-icons/fa';

function View() {
  const loggedInUser = localStorage.getItem("token");  
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [businessName,setBusinessName] = useState('');
  const [email, setUserEmail] = useState();
  const [category, setUserCategory] = useState();
  const [imageUsr, setUserImage] = useState();
  const [rating, setRating] = useState();
  
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${id}`).then((response) => {

          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserEmail(response.data.email);
          setUserCategory(response.data.category);    
          setUserImage(response.data.img);         
          setBusinessName(response.data.businessName);
          setRating(response.data.rating);
      })       
  }, [])

    if (loggedInUser) {
        
        return (

            <div id="allUsers" style={{height:"100vh",background:"#e6e6e6"}}>
                <MainMenu></MainMenu>
                <div>
                    <Container className={styles.mainContainer}>
                            {imageUsr?<img src={imageUsr} className={styles.profileImg } alt="..." />:<img src={image}  className={styles.profileImg } alt="..." />}
                        <hr />
                        {(!businessName)?<Row className={styles.nameTagdiv}><h3 className={styles.nameTag}>{firstName+" "+lastName}</h3></Row>:
                        <Row className={styles.nameTagdiv}><h3 className={styles.nameTag}>{businessName}</h3></Row>}
                        {
                            (rating > 0) ?
                                <div style={{paddingLeft:'40px'}}>
                                    <FaStar
                                        size={50}
                                        color='#FFD700'
                                    />
                                    <h4>{rating} / 5</h4>
                                </div>: null

                        }                       
                        <Row> <h5 className={styles.infoTag}>Category : {category}</h5></Row>
                        <Row> <h10 className={styles.infoTag}>Email: {email}</h10></Row>
                     <button className={styles.button1} onClick={()=>{navigate(`/report/${id}`)}}>
                       Report
                     </button> 
                    </Container>
                    
                </div >
                <Container>
                    <AllPostsExternal id={id}></AllPostsExternal>
                </Container>
            </div >


        );
    } else {
        return (
            <div>
                <Login></Login>
            </div>
        )
    }
};

export default View;