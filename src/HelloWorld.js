import React from 'react';
import './HelloWorld.scss'

function HelloWorld(props){
  let hello = props.hello;
  return (
   <p>{hello}</p>
  )
}; 


export default HelloWorld;