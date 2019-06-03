import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { AddData } from "./components/AddData";
import { FetchData } from './components/FetchData';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/add-data' component={AddData} />
      </Layout>
    );
  }
}
