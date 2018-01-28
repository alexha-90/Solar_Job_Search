import React, { Component } from 'react';
import { connect } from 'react-redux';


// Page imports
import Header from './components/Header';
import Landing from './components/Landing';
import JobResults from './components/JobResults';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="">
          <BrowserRouter>
              <div>
                  <Header />
                  <Route exact path='/' component={Landing} />
                  <Route path='/jobs' component={JobResults} />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null)(App);