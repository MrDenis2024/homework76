import React from 'react';
import {Grid, Typography} from '@mui/material';
import {IMessage} from '../../../types';
import dayjs from 'dayjs';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
  const dateNow = new Date();
  let date = (
    <Typography component='span'>{dayjs(message.datetime).format('DD.MM HH:mm')}</Typography>
  );

  if (dayjs(dateNow).get('date') - 1 === dayjs(message.datetime).get('date') && dayjs(dateNow).get('month') === dayjs(message.datetime).get('month')) {
    date = (
      <Typography component='span'>{dayjs(message.datetime).format('Вчера HH:mm')}</Typography>
    );
  }

  if (dayjs(dateNow).get('date') === dayjs(message.datetime).get('date') && dayjs(dateNow).get('month') === dayjs(message.datetime).get('month')) {
    date = (
      <Typography component='span'>{dayjs(message.datetime).format('HH:mm')}</Typography>
    );
  }

  if (dayjs(dateNow).get('year') !== dayjs(message.datetime).get('year')) {
    date = (
      <Typography component='span'>{dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}</Typography>
    );
  }

  return (
    <Grid item container direction='column' sx={{border: '1px solid gray', p: 3 , borderRadius: '10px', mb: '15px'}}>
      <Grid item container justifyContent='space-between'>
        <Typography component='span'>Author: <strong>{message.author}</strong></Typography>
        {date}
      </Grid>
      <Typography component='p'>Message: {message.message}</Typography>
    </Grid>
  );
};

export default Message;