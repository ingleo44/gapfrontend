import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ConfirmDialog extends Component {
  close = () => this.props.onClose()
  accept= () => this.props.onAccept()
  discard= () => this.props.onDiscard()

  render() {
    const { open } = this.props

    return (
      <div>
        <Modal
          open={open}
          onClose={this.close}
        >
          <Modal.Header>{this.props.header}</Modal.Header>
          <Modal.Content>
            <p>{this.props.message}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.discard} negative>
              No
            </Button>
            <Button
              onClick={this.accept}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ConfirmDialog