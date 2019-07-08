import { Modal,ButtonToolbar,Button} from 'react-bootstrap';
import React,{Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class EventDetails extends React.Component {
      
    state = {
        lgShow: false,
      };
  
    render() {
      let lgClose = () => this.setState({ lgShow: false });
  
      return (
        <ButtonToolbar>
          <Button onClick={() => this.setState({ lgShow: true })}>
            Details
          </Button>

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