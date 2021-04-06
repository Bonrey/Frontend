import React from 'react';
import TodoCreate from './todo/TodoCreate';
import TodoList from './todo/TodoList';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "learn react"
    };
  }

  render() {
    return (
      <main>
        <TodoCreate />
        <TodoList todoText={this.state.item} />
      </main>
    );
  }
}