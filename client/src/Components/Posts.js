
import React,{Component} from 'react';
import axios from 'axios';
import { GiBoatFishing } from "react-icons/gi";
import {ListGroup,ListGroupItem,Card,Button,ButtonToolbar,OverlayTrigger,Popover} from 'react-bootstrap';
import styled from "styled-components";
import EventDetails from './EventDetails';


export default class Posts extends Component {
    state={
        showModal:false,
    }

    unpinHandler = () => {
       axios.put("pin/unpin",{id:this.props.id})
        .then(response=>{
            console.log(response);
            this.props.refresh();
        })
        .catch(error=>console.log(error))
    }

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
        const {name,time,venue,how_to_find_us,description,photo_url,event_url} = this.props;
        return(
            <DivWrapper>
                <img onClick={this.unpinHandler} className="pin" src="https://i.imgur.com/P8futcQ.png"/>
                <Card style={{ width: '25rem' }} className="transparent card">

                
                <Card.Link href={event_url} target="_blank">
                    <Card.Img variant="top" className = "card-image" src={photo_url?photo_url:"https://i.imgur.com/9vwYguH.jpg"} />
                </Card.Link>
                <Card.Body>
                    <Card.Title className="title" ><EventDetails name={name} description={description} lgOpen={this.state.showModal}/></Card.Title>
                    {/* <Card.Text>
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="transparent">Date: {this.convertDate(time)}</ListGroupItem>
                    <ListGroupItem className="transparent venue" id="venue">
                        Venue: {venue?venue.address_1+(venue.address_2?venue.address_2:""):"not provided"}
                        <ButtonToolbar>
                            <OverlayTrigger
                                trigger="click"
                                key={"right"}
                                placement={"right"}
                                overlay={
                                    <Popover
                                    id={`popover-positioned-right`}
                                    title={`Direction`}
                                    >
                                    {how_to_find_us?how_to_find_us:"not provided"}
                                    </Popover>
                                }
                                >
                                <span className="direction">how to find?</span>
                            </OverlayTrigger>
                        </ButtonToolbar>
                    </ListGroupItem>
                </ListGroup>
            </Card>
            </DivWrapper>
        )
    }
}

const DivWrapper = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    width:30rem;
    margin-top:2rem;
    margin-bottom:2rem;
    margin-left:2rem;
    padding-bottom:2rem;
    background-image: url("https://i.imgur.com/vdkT6Hy.png");
    background-size: cover;
    background-repeat: no-repeat;
    .transparent{
        background-color:rgba(0, 0, 0, 0);
        border:none;
    }
    .pin{
        position:absolute;
        width:3rem;
        top:0.1rem;;
        z-index:1;
        cursor:pointer;
    }
    .card-image{
        max-height:15.625‬rem;
    }
    .card-body{
        padding-bottom:0;
        margin-bottom:0;
    }
    .card{
        margin-top:3rem;
        margin-left:1.5rem;
        border:none;
        -webkit-transform: rotate(-3deg);
        -moz-transform: rotate(-3deg);
        -o-transform: rotate(-3deg);
        -ms-transform: rotate(-3deg);
        transform: rotate(-3deg);
        height:auto;
        .title{

            cursor:pointer;
        }
        .venue{
            display:flex;
            justify-content:space-between;
            .direction{
                color:blue;
                font-weight:bold;
                cursor:pointer;
            }
        }
    }

`;


