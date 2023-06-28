import { useState } from 'react';
import './index.css';

const MessageCard = () => {
  const [ show, setShow ] = useState(true);

  return(
    <div className={show ? 'messageCardContainerMin' : 'messageCardContainer'}>
      <div className='messageCardTitle' onClick={show ? () => setShow(false) : () => setShow(true)}>
        <h2>Mensagens</h2>
      </div>
      <div className={show ? 'mContainerHidden' : 'mContainer'}>
        <div className='messagesContent'>
          <p>asdf</p>
          <p>asdf</p>
        </div>
        <div className='messagesInput'>
          <input type="text" />
          <button type='button'>Enviar</button>
        </div>
      </div>
    </div>
  );
}
export default MessageCard;