
import React,{Component} from 'react';
import axios from 'axios';
import {ListGroup,ListGroupItem,Card,Button} from 'react-bootstrap';
import styled from "styled-components";
import EventDetails from './EventDetails';
import { TiPin} from "react-icons/ti";


export default class CardList extends Component {

    pinHandler = () => {
       const body = {...this.props};
       console.log(body);
       axios.put("/pin",body)
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }

    convertDate(timestamp){
        console.log({timestampp:timestamp});
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
        const {name,time,venue,how_to_find_us,description,photo_url,event_url} = this.props;
        return(
            <SectionWrapper>
                <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" className="card-image" src={photo_url?photo_url:"https://i.imgur.com/9vwYguH.jpg"} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    {/* <Card.Text>
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Date: {this.convertDate(time)}</ListGroupItem>
                    <ListGroupItem>Venue: {venue?venue.address_1+(venue.address_2?venue.address_2:""):"not provided"}</ListGroupItem>
                    {/* <ListGroupItem>how to find : {how_to_find_us?how_to_find_us:"not provided"}</ListGroupItem> */}
                </ListGroup>
                <Card.Body>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    <DivWrapper>
                        <div className="buttons">
                            <EventDetails name={name} description={description} button={true}/>
                            <ButtonWrapper onClick={this.pinHandler}><TiPin className="icon"/>Pin It</ButtonWrapper>
                        </div>
                        <Card.Link href={event_url} target="_blank">Event Page</Card.Link>
                    </DivWrapper>
                </Card.Body>
                </Card>
            </SectionWrapper>
        )
    }
}

const SectionWrapper = styled.section`
    .card-image{
        max-height:270px;
    }
    margin-bottom:2rem;
`

const DivWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    .buttons{
        display:flex;
        .details{
            margin-right:1rem;
        }
    }
`

const ButtonWrapper = styled.button`
margin-left:1rem;
.icon{
  font-size:1.5rem;
}
transition: all 0.5s ease-in-out;

`