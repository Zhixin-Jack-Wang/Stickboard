import React,{Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return (
            <Nav>

                <Link className="main" to="/">
                    <h1 className="title">THE   STICKY   BOARD</h1>
                </Link>
                <div className="menu">
                <Link className="main" to="/">
                    <ButtonContainer home>
                        Home
                    </ButtonContainer>
                </Link>
                <Link to="/meetups">
                    <ButtonContainer>
                        Find Meetups
                    </ButtonContainer>
                </Link>
                </div>
            </Nav>
        )
    }
}

const Nav = styled.nav`
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin: 0 2rem 2rem 2rem;
  background: var(--mainYellow);
  .main{
      align-self:center;
      text-decoration:none;
      h1{
          margin-bottom:0;
          font-family:var(--fontBM);
      }
  }
  .menu{
      display:flex;
      justify-content:flex-end;
  }
  .title{
      color: var(--mainWhite);
      font-family: var(--fontIF);
      font-size: 3rem;
      line-height:5.876rem;
  }
`;

const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.1rem solid var(--mainWhite);
  color: var(--lightBlue);
  color: var(--mainWhite);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  outline-color: red;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--lightBlue);
    background: ${props =>
      props.home ? "var(--mainBlue)" : "var(--lightBlue)"};
    color: var(--mainDark);
  }
  &:focus {
    outline: none;
  }
`;