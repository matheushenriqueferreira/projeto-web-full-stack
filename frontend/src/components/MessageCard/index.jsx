import { useEffect, useState } from 'react';
import './index.css';
import { io } from "socket.io-client";

const socket = io("https://localhost:3000");

const MessageCard = ({ userEmail }) => {
  const [ show, setShow ] = useState(true);
  const [ inputMessage, setInputMessage ] = useState('');
  const [ message, setMessage] = useState([]);

  const sendMessage = () => {
    const data = {
      userEmail,
      message: inputMessage, 
      type: 'send'
    }
    socket.emit("send_message", data);
    setMessage(prevState => [...prevState, data]);
    setInputMessage('');
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      data.type = 'rec';
      setMessage(prevState => [...prevState, data]);
      console.log(data)
    })
  }, [socket]);

  return(
    <div className={show ? 'messageCardContainerMin' : 'messageCardContainer'}>
      <div className='messageCardTitle' onClick={show ? () => setShow(false) : () => setShow(true)}>
        <h2>Mensagens</h2>
        <p>{userEmail}</p>
      </div>
      <div className={show ? 'mContainerHidden' : 'mContainer'}>
        <div className='messagesContent'>
          {
            message.map((data, i) => 
              <div key={i + data.message} className={data.type === 'send' ? `send` : 'receive'} >
                <div className='balloon'>
                  <p className='messageUserEmail'>{data.userEmail}</p>
                  <p className='dataMessage'>{data.message}</p>
                </div>
              </div>
            )            
          }
        </div>
        <div className='messagesInput'>
          <input type="text" value={inputMessage} onChange={(evt) => setInputMessage(evt.target.value)} />
          <button type='button' onClick={() => sendMessage()} >Enviar</button>
        </div>
      </div>
    </div>
  );
}
export default MessageCard;