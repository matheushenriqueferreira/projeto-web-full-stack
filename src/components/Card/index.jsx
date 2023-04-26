import React, { useState } from "react";
import './index.css';

const Card = ({ textNote }) => {  
  return(
    <div className="cardComponent">
      <p>{textNote}</p>
    </div>
  );
}

export default Card;