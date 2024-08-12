import {Container, Typography} from '@mui/material';
import MessageForm from './components/MessageForm';
import {MessageMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useState} from 'react';
import {toast} from 'react-toastify';

const Chat = () => {
  const [sendLoading, setSendLoading] = useState(false);

  const sendMessage = async (message: MessageMutation) => {
    try {
      setSendLoading(true);
      await axiosApi.post('/messages', message);
      toast.success('Message sent successfully.');
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4'>Chat:</Typography>
      <MessageForm sendMessage={sendMessage} sendLoading={sendLoading}/>
    </Container>
  );
};

export default Chat;