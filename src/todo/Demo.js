import React, { Component } from "react";
import Tasks from "./Tasks";
import {
  InputGroup,
  Button,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import idGenerator from "./idGenerator";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
    selectedTasks: new Set()
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleCkeck = (taskId) => {
    const selectedTasks = new Set (this.state.selectedTasks)
    
    if(selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId)
    } else {
      selectedTasks.add(taskId)
    } 

    this.setState({
      selectedTasks
    })
  }

  addTask = () => {
    const { inputValue } = this.state;

    if (!inputValue) {
      return;
    }

    const newTask = {
      text: inputValue,
      _id: idGenerator(),
    };

    const tasksArray = [newTask, ...this.state.tasks];

    this.setState({
      tasks: tasksArray,
      inputValue: "",
      selectedTasks: []
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  handleDelete = (taskId) => {
    const newTask = this.state.tasks.filter((task) => task._id !== taskId);
    this.setState({
      tasks: newTask,
    });
  };
  
  removeSelected = () => {
    let tasks = [...this.state.tasks]
    this.state.selectedTasks.forEach((id) => {
       tasks = tasks.filter((task) => task._id !== id)
    })
    this.setState({
      tasks,
    })
  }

  render() {
    const { inputValue } = this.state;
    const tasksArray = this.state.tasks.map((task, i) => {
      return (
        <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
          <Tasks 
             data = {task} 
             onRemove = {this.handleDelete}
             onCheck = {this.handleCkeck}
             disabled={!!selectedTasks.size}
          />
        </Col>
      );
    });

    return (
      <div className="todo">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={3} sm={6}>
              <InputGroup className="mb-3">
                <FormControl
                  aria-describedby="basic-addon1"
                  onChange={(event) => this.handleChange(event)}
                  value={inputValue}
                  placeholder="Add new task"
                  onKeyDown={(event) => this.handleKeyDown(event)}
                  disabled={!!selectedTasks.size}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={this.addTask}
                    disabled={!inputValue}
                  >
                    Add
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Row>{tasksArray}</Row>
        <Button 
          variant="danger"
          onClick={this.removeSelected}
          >Remove Selected</Button>
      </div>
    );
  }
}
export default ToDo;
