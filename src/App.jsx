import React from 'react';
import { useState, useReducer } from 'react';
import Todo from './Todo';
import './App.css'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete_todo',
  EDIT_TODO: 'edit_todo'
}

function reducer(todos, action) {
  switch (action.type) {
    //add list
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    // toggle
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      //edit 
    case ACTIONS.EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
     //delete
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
      default:
        return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  function addTask(e) {
    e.preventDefault();
    // not to add empty list
    if(name.trim()!==''){
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  }
}

  return (
    <>
      <h3>ToDo-List</h3>
    
        <input
          type='text'
          placeholder='Enter a list ...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className='add-button' onClick={addTask}>
          Add
        </button>
     
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>;
      })}
    </>
  );
}
