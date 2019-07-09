import React,{Component} from 'react';
import styled from "styled-components";
import Axios from 'axios';
import Posts from './Posts';
import CardList from './CardList';
export default class Board extends Component {
    state = {
        meetupArr:[]
    }

    refresh = () => {
        Axios.get("http://localhost:5000/pin")
        .then(
            response=>{
                console.log(response);
                this.setState({meetupArr:response.data});
            }
        )
        .catch(
            console.log("error occurred")
        )
    }

    componentDidMount = () =>{
        console.log("mount");   
        Axios.get("http://localhost:5000/pin")
            .then(
                response=>{
                    console.log(response);
                    this.setState({meetupArr:response.data});
                }
            )
            .catch(
                error=>{
                    console.log(error);
                }
            )
    }

    render(){
        return (
            <>
            <SectionWrapper>
                {this.state.meetupArr.map(e=>{
                    return(
                        <>
                        <Posts {...e} refresh = {this.refresh} />
                        {/* <CardList {...e}/> */}
                        </>
                    )
                }
            )}
            </SectionWrapper>
            </>
        )
    }
}

const SectionWrapper = styled.section`
    display:flex;
    flex-flow: row wrap;
    justify-content:space-evenly;
    position: relative;
    margin: 0 2rem 2rem 2rem;
    background-image: url("https://i.imgur.com/RmPTNG3.jpg");
    background-position:cover;
    background-repeat:repeat;
    .addNew{
        position: absolute;

    }
`;
