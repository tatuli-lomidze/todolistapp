import React, { Component } from "react"
import ToDoitem from "./ToDoitem"

class ToDolist extends Component {

    state = {
        inputValue: "",
        todoList: [
          { id: 1, todo: "Exercise", status: "todo" },
          { id: 2, todo: "Study", status: "todo" }
        ],
        doneList: []
      }

    
      onChange = (event) => {
        const value = event.target.value
        this.setState({
          inputValue: value
        })

      }

      addTask = (event) => {
        event.preventDefault();
      
        const newTask = {
          id: this.state.todoList.length + 1,
          todo: this.state.inputValue,
          status: "todo"
        };
      
        this.setState({
          todoList: [...this.state.todoList, newTask],
          inputValue: ""
        })
      }
      
      removeTask = (id, status) => {
        const updatedList =
          status === "todo"
            ? this.state.todoList.filter((task) => task.id !== id)
            : this.state.doneList.filter((task) => task.id !== id);
      
        this.setState({
          todoList: status === "todo" ? updatedList : this.state.todoList,
          doneList: status === "done" ? updatedList : this.state.doneList
        })
      }
      
      toggleStatus = (id) => {
        const taskToUpdate = this.state.todoList.find((task) => task.id === id)
      
        if (taskToUpdate) {
          const updatedTodoList = this.state.todoList.filter((task) => task.id !== id)
          const updateddoneList = [...this.state.doneList, { ...taskToUpdate, status: "done" }]
      
          this.setState({
            todoList: updatedTodoList,
            doneList: updateddoneList
          })
        }

      }
      moveBackToTodo = (id) => {
        const taskToUpdate = this.state.doneList.find((task) => task.id === id)
    
        if (taskToUpdate) {
          const updatedDoneList = this.state.doneList.filter((task) => task.id !== id);
          const updatedTodoList = [...this.state.todoList, { ...taskToUpdate, status: "todo" }]
    
          this.setState({
            todoList: updatedTodoList,
            doneList: updatedDoneList
          })
        }
      }
      
      render() {

        return (
          <div className="to-do-list">
            <h3>To Do List</h3>
      
            <form onSubmit={this.addTask} className="form">
              <input type="text" onChange={this.onChange} value={this.state.inputValue} />
              <button type="submit">Add Task</button>
            </form>
      
            <div className="column">
              <h4>To Do</h4>
              {this.state.todoList.map((task) => (
                <ToDoitem key={task.id} task={task} removeTask={this.removeTask} toggleStatus={this.toggleStatus} moveBackToTodo={this.moveBackToTodo}/>
              ))}
            </div>
      
            <div className="column">
              <h4>Done </h4>
              {this.state.doneList.map((task) => (
                <ToDoitem key={task.id} task={task} removeTask={this.removeTask} toggleStatus={this.toggleStatus} moveBackToTodo={this.moveBackToTodo}  />

              ))}

              
            </div>
          </div>
        )
      }
      
}

export default ToDolist