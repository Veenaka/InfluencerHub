import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Card,CardGroup} from 'react-bootstrap'
import Login from '../Login';
import { createPath, useNavigate } from 'react-router-dom';
import image from "../../images/user.jpg";
import styles from "./styles.module.css";
import ParseJwt from '../../utilities/ParseJwt';
import MainMenu from '../Main/MainMenu';

function Detail() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const loggedInUser = localStorage.getItem("token");
    const userMain = ParseJwt(loggedInUser)
    const navigate = useNavigate();
 
   // const category= localStorage.getItem("token");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/useraccounts`).then((response) => {
             setListOfUsers(response.data);
             console.log(response.data);
        })
    }, [])

//   {listOfUsers.filter((user)=>user.category.includes("Business")).map((user,id) =>
    console.log(listOfUsers)
if(loggedInUser){
      
    return (
      
    
        <div id="allUsers">
            <MainMenu></MainMenu>
            <div className="container" style={{marginTop:"30px"}}>
                        <div
                        className="container"
                        style={{
                            position: "absolute",
                            marginTop: "10px",
                            paddingTop:"5px",
                            paddingBottom:"10px"
                        }}
                        ></div>
            <h1>All Users</h1>
            {listOfUsers.map((user,id) => {
               if(user.category!=='admin'&&user.category!==userMain.category){
                return (

                    <div styles={{display:"flex"}}>
                        <Container fluid="md" className={styles.card} key={user._id}>

                            <div className="card-body">

                                {user.img?<img src={user.img} className={styles.image_img} alt="..." />:<img src={image} className={styles.image_img} alt="..." />}
                                <h3 class="card-title">{user.firstName + " " + user.lastName}</h3>
                                <Row> <h5>{user.category}</h5></Row>
                                <Row> <h10>{user.email}</h10></Row>
                                <Row>
                                    <Col xs={3} md={2}><b> <button className="btn btn-success"
                                        onClick={() => { navigate(`/view/${user._id}`) }}
                                    >View
                                    </button> </b></Col>
                                </Row>
                            </div>
                        </Container>
                    </div>

                );
               }else{
                return(
                    <div></div>
                )
               }
            })}
                    
        </div >
</div >
    );
        }
        else{
            return(
                <div>
                    <Login></Login>
                </div>  
        )
    }
    
};

export default Detail;
