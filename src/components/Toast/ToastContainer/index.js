import { useState } from 'react';
import { Container } from './styles';

import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages] = useState([
    { id: Math.random(), type: 'default', text: 'Default toast' },
    { id: Math.random(), type: 'danger', text: 'Error toast' },
    { id: Math.random(), type: 'success', text: 'Success toast' },
  ]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
