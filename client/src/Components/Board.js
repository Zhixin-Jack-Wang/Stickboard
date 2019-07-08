import React,{Component} from 'react';
import Addnew from './Addnew';
import styled from "styled-components";
export default class Board extends Component {
    render(){
        return (
            <>
            <SectionWrapper>
                <Addnew/>
            </SectionWrapper>
            </>
        )
    }
}

const SectionWrapper = styled.section`
    position: relative;
    background-image: url("https://i.imgur.com/RmPTNG3.jpg");
    background-position:cover;
    background-repeat:repeat;
    .addNew{
        position: absolute;

    }
`;
