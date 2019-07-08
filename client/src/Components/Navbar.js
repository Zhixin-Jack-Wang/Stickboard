import React,{Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return (
            <Nav>
                <Link to="/meetups">find meetups</Link>
                <Link to="/">
                    <h1 className="title">THE STICKY BOARD</h1>
                </Link>
            </Nav>
        )
    }
}

const Nav = styled.nav`
  display:flex;
  justify-content:center;
  margin-bottom: 2rem;
  background: var(--mainYellow);
  .title{
      color: var(--mainWhite);
      font-family: var(--fontIF);
      font-size: 3rem;
      line-height:5.876rem;
  }
`;
