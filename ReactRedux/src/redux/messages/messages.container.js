import addMessage from "./messages.actions";
import DisplayMessages from '../../components/DisplayMessages';
import { connect } from "react-redux";

export const mapStateToProps = state => {
  return {
    messages: state
  }
};

export const mapDispatchToProps = dispatch => {
  return {
    submitNewMessage: message => {
      dispatch(addMessage(message));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMessages);
