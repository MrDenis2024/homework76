import {CircularProgress, Container, Grid, Typography} from '@mui/material';
import MessageForm from './components/MessageForm';
import {IMessage, MessageMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useCallback, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import Message from './components/Message';

const Chat = () => {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [lastDataMessage, setLastDataMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback( async (url: string) => {
    if(url === '/messages') {
      setLoading(true);
    }
    try {
      const {data: messages} = await axiosApi.get<IMessage[] | null>(url);

      if (messages && messages.length > 0) {
        setChat((prevState) => [...messages.reverse(), ...prevState]);
        const lastMessage = messages[0];
        setLastDataMessage(lastMessage.datetime);
      }
    } catch (e) {
      console.error('Error fetching message');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMessages('/messages');
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchMessages(`/messages?datetime=${lastDataMessage}`);
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchMessages, lastDataMessage]);

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
      <Grid container justifyContent='center' sx={{mt: 3, mb: '140px'}}>
        {chat.length > 0 ? (
          <Typography variant='h4'>Chat:</Typography>
        ) : (
          <Typography variant='h4'>No messages</Typography>
        )}
        {loading && <Grid item><CircularProgress /> </Grid>}
        {chat.length > 0 && (chat.map((message) => (
          <Message key={message.id} message={message} />
        )))}
      </Grid>
      <MessageForm sendMessage={sendMessage} sendLoading={sendLoading}/>
    </Container>
  );
};

export default Chat;