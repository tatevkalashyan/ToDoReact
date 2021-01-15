import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class Tasks extends Component {
    state = {
        checked: false
    }

handleCheck = () => {
    this.setState({
        checked:!this.state.checked
    })
    const {onCheck,data} = this.props
    onCheck(data._id)
}


  render() {
    const task = this.props.data
    const {checked} = this.state
    const {disabled} = this.props
    return (
      <Card className={checked ? 'task' : ''}>
        <Card.Body>
          <input 
                type='checkbox' 
                onClick={() => this.props.onCheck(task._id)}
                key={task._id}
           />
          <Card.Title>{task.text.slice(0, 10) + "..."}</Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="danger"
            onClick={() => this.props.onRemove(task._id)}
            disabled={disabled}
            >
                Delete
          </Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Tasks;
