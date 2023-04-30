import React, { useState } from "react";
import './index.css';

const Card = ({ textNote, id }) => {  
  return(
    <div className="cardComponent cardFlex">
      <div className="cardId">
        <p>Id: {id}</p>
      </div>
      <div className="cardNote">
        <p>{textNote}</p>
      </div>
    </div>
  );
}

export default Card;