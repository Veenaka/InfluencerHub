import { useState, useEffect } from "react";
import axios from 'axios';
import ParseJwt from '../../utilities/ParseJwt';
import React, { Component }  from 'react';
import MainMenu from '../Main/MainMenu';
import {Container,Row,Col, Button, Dropdown, DropdownButton} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './styles.module.css';
function ViewNotifications() {

    const [notificationList, setNotificationList] = useState([]);
	const [newestFirst, setNewestFirst] = useState(true);	

	const token = localStorage.getItem("token");
	const loggedinuser = ParseJwt(token);
	
	function loadNotifications(){
		axios.get(`${process.env.REACT_APP_BASEURL}/notification/${loggedinuser._id}`).then((response) => {
			setNotificationList(response.data);						
		})	
	}
	useEffect(()=> {
		loadNotifications();
	},[])

	function MarkAsRead(_ID){
		axios.delete(`${process.env.REACT_APP_BASEURL}/notification/delete/${_ID}`).then((res) => {
      		console.log(res);
     	 console.log(res.data);
		 
		 loadNotifications();
    	});	
	};
	
	let sortedList;
    if (newestFirst === true) {
        sortedList = notificationList.sort((a, b) => new Date(b.NotificationTime) - new Date(a.NotificationTime));
    } else {
        sortedList = notificationList.sort((a, b) => new Date(a.NotificationTime) - new Date(b.NotificationTime))
    }
	
		return(
		<div style={{height:"100vh",background:"#e6e6e6"}}>
		<MainMenu></MainMenu>
		<div>
                <DropdownButton variant="success" title="Sort By" style={{margin:"30px"}}>
                    <Dropdown.Item onClick={() => setNewestFirst(true)}>Newest First</Dropdown.Item>
                    <Dropdown.Item onClick={() => setNewestFirst(false)}>Oldest first</Dropdown.Item>
                </DropdownButton>
        </div>	
		<br/>
		<br />
		<br />
		{sortedList.map((sortedList) => {					
			return (
			  <div>
				 <Container fluid="md" className={styles.record}>				  
				  <Row>
                     <Col>{sortedList.Notificationmessage}<span className={styles.btn} onClick={() => MarkAsRead(sortedList._id)}>Mark As Read</span></Col>                       
                </Row>                          
                </Container>
			  </div>			  
			);			
		  }		  
		  )}
			</div>
)
	
}
 
export default ViewNotifications;