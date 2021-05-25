import { ADD } from './messages.types';

const addMessage = message => ({
  type: ADD,
  message
});

export default addMessage;
