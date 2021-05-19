import React from 'react'
import ReactDOM from 'react-dom'

import App from './content/App';

ReactDOM.render(
    <App/>,
  document.getElementById('app')
);

module.hot.accept();