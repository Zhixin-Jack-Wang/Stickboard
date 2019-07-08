import { Modal,ButtonToolbar,Button} from 'react-bootstrap';
import React,{Component} from 'react';

export default class addNew extends React.Component {
      
    state = {
        smShow: false,
        lgShow: false,
      };
  
    render() {
      let lgClose = () => this.setState({ lgShow: false });
  
      return (
        <ButtonToolbar>
          <Button onClick={() => this.setState({ lgShow: true })}>
            Large modal
          </Button>

          <Modal
            size="lg"
            show={this.state.lgShow}
            onHide={lgClose}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Large Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button>Add Note</Button>
              <Button>Add Meetup</Button>
            </Modal.Body>
          </Modal>
        </ButtonToolbar>
      );
    }
  }
  