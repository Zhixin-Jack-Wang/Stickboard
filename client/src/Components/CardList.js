
import React,{Component} from 'react';
import axios from 'axios';
import { GiBoatFishing } from "react-icons/gi";
import {ListGroup,ListGroupItem,Card,Button} from 'react-bootstrap';
import styled from "styled-components";
import EventDetails from './EventDetails';


export default class CardList extends Component {

    convertDate(timestamp){
        const date = new Date(timestamp);
        let month  = date.getMonth()+1;
        month = month < 10 ? '0'+month : month;
        let day = date.getDate();
        day  = day < 10 ? '0'+day :day;
        let hr = date.getHours();
        let ampm = (hr > 12)?"PM":"AM";
        let min = date.getMinutes();
        min = min < 10 ? '0'+min : min;
        const newDate = date.getFullYear() + "-"  + month + '-' + day + " " + hr +":"+min+":"+date.getSeconds()+" "+ampm;
        return newDate;
      }
    render(){
        console.log({props:this.props});
        const {name,description,event_url,venue,time,photo_url,how_to_find_us} = this.props;
        return(
            <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={photo_url?photo_url:"https://i.imgur.com/9vwYguH.jpg"} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {/* <Card.Text>
                </Card.Text> */}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Date: {this.convertDate(time)}</ListGroupItem>
                <ListGroupItem>Venue: {venue?venue.address_1+venue.address_2:"not provided"}</ListGroupItem>
                <ListGroupItem>how to find : {how_to_find_us?how_to_find_us:"not provided"}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                <EventDetails name={name} description={description}/>
                <Card.Link href={event_url} target="_blank">Event Page</Card.Link>
                <Button>Stick It</Button>
            </Card.Body>
            </Card>
        )
    }
}