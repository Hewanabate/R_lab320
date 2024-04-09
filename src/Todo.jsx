import React from 'react';
import { ACTIONS } from './App.jsx';

export default function Todo({ todo, dispatch }) {
  return (
    <div className='todo'>
     {/* toggle when marked complete  */}
     
      <input
        type='checkbox'
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
        }
      ></input>
      <span style={{ color: todo.complete ? '#AAA' : '#000' }}>
        {todo.name}
      </span>
      <button className='edit-button' onClick={() =>
          dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: todo.id } })}>Edit</button>
      <button className='delete-button' onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}> Delete </button>
    </div>
  );
}
