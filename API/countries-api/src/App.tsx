import React, {Component} from 'react';
import GlobalStyle from './assets/styles/globalStyle';
import Header from './components/Header';
import Main from './components/home/Main';

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render(): React.ReactNode {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Main />
      </>
    );
  }
}
