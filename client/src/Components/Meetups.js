import React,{Component} from 'react';
import axios from 'axios';
import { GiBoatFishing } from "react-icons/gi";
import {Button} from 'react-bootstrap';
import styled from "styled-components";
import CardList from "./CardList";
export default class Board extends Component {
    state = {
        meetupArr:[]
    }
    searchHandler = () => {
        console.log(this.bar.value); 
        const term = this.bar.value;
        axios
            .post("http://localhost:5000/meetups",{term})
            .then(
                response=>{
                    console.log(response);
                    this.setState({meetupArr:response.data});
                }
            )
    }

    keyUpHandler = (event) => {    
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            this.btn.click();
        }
    }

    render(){
        console.log(this.state.meetupArr);
        return (
            <>
                <SearchWrapper>
                    <div className="search">
                        <span className="search-icon"><GiBoatFishing/></span>
                        <input ref={bar=>this.bar=bar} type="text" className="search-bar" onKeyUp={this.keyUpHandler}/>
                        <Button variant="primary" ref={btn=>this.btn=btn} className="search-btn" onClick={this.searchHandler}>Search</Button>
                    </div>
                </SearchWrapper>
                <SectionWrapper>
                    {this.state.meetupArr.map(e=><CardList {...e} />)}
                </SectionWrapper>
            </>
        )
    }
}

const SectionWrapper = styled.section`
    position: relative;
    display:flex;
    justify-content: space-between;
    flex-flow: row wrap;
    background-color:white;
`;

const  SearchWrapper = styled.div`
width:100%;
display:flex;
justify-content:center
.search{
    width:45%;
    position:relative;
    margin-top:1rem;
    margin-bottom:3rem;
    &-bar{
        width:75%;
        padding-left:2.5rem;
    }
    &-icon{
        position:absolute;
        color:var(--mainBlue);
        left:1rem;
        font-size:1.2rem;
    }
    &-btn{
        padding:0.18rem 1rem;  
        margin-left:1rem;
        background-color:var(--lightBlue);
        border:none;
    }
}
`;