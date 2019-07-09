import { Modal,ButtonToolbar,Button} from 'react-bootstrap';
import React,{Component} from 'react';
import ReactHtmlParser from 'react-html-parser';
import { TiZoom} from "react-icons/ti";
import styled from "styled-components";
export default class EventDetails extends React.Component {
      
    state = {
        lgShow: false,
      };
      
    renderButton = () => {
      if(this.props.button)
        return(
          <ButtonWrapper onClick={() => this.setState({ lgShow: true })}>
            <TiZoom className="icon"/> Details
          </ButtonWrapper>
        )
      else
        return(
          <h5 onClick={() => this.setState({ lgShow: true })}>
            {this.props.name}
          </h5>
        )
    }

    render() {
      let lgClose = () => this.setState({ lgShow: false });
  
      return (
        <ButtonToolbar>
          {this.renderButton()}
          <Modal
            size="lg"
            show={this.state.lgShow}
            onHide={lgClose}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                {this.props.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ReactHtmlParser(this.props.description)}
            </Modal.Body>
          </Modal>
        </ButtonToolbar>
      );
    }
  }

  const ButtonWrapper = styled.button`
  .icon{
    font-size:1.5rem;
  }
  transition: all 0.5s ease-in-out;
  
  `