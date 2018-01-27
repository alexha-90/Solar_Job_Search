import React, { Component } from 'react';


// Page imports
import Header from './components/Header';
import Landing from './components/Landing';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="">
          <BrowserRouter>
              <div>
                  <Header />
                  <Route exact path='/' component={Landing} />

              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
