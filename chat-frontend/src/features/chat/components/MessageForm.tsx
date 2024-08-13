import React, {useState} from 'react';
import { Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {LoadingButton} from '@mui/lab';
import {MessageMutation} from '../../../types';

interface Props {
  sendMessage: (message: MessageMutation) => void;
  sendLoading: boolean;
}

const MessageForm: React.FC<Props> = ({sendMessage, sendLoading}) => {
  const [state, setState] = useState<MessageMutation>({
    author: '',
    message: '',
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage({...state});
    setState({
      author: '',
      message: '',
    });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid item sx={{width: '100%', position: 'fixed', left: 0, bottom: 0, borderTop: '1px solid gray', backgroundColor: '#efecec'}}>
      <Grid container item component='form' justifyContent='space-between' alignItems='center' sx={{padding: '20px'}} onSubmit={submitFormHandler}>
        <Grid item>
          <TextField label='Name' name='author' id='author' required onChange={inputChangeHandler} value={state.author} sx={{backgroundColor: 'white'}} />
        </Grid>
        <Grid item>
          <TextField multiline minRows={3} label='Message' name='message' id='message' required  sx={{width: '600px', backgroundColor: 'white'}} onChange={inputChangeHandler} value={state.message} />
        </Grid>
        <Grid item>
          <LoadingButton
            type='submit'
            loading={sendLoading}
            loadingPosition="start"
            startIcon={<SendIcon />}
            variant="contained"
          >
            <span>Send message</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageForm;