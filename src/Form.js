import React from 'react';
import './Form.scss'

function Form(props){
  let hello = props.hello;
  return (
   <p>{hello}</p>
  )
}; 


export default Form;