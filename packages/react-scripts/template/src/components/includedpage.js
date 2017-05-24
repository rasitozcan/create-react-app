import React, { Component } from 'react';
import 'whatwg-fetch';

export default class IncludedPage extends Component {
  componentWillMount(props) {
    this.renderApp(this.props.app);
    this.appUrls = {
      app1: 'http://localhost:3001',
      app2: 'http://localhost:3002',
    };
  }

  fetchApp() {
    return fetch('/' + this.props.app, {
      method: 'GET',
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(body) {
        return body;
      });
  }

  renderApp() {
    this.fetchApp().then(body => {
      this.refs.includedpage.innerHTML = body;
      [].forEach.call(
        this.refs.includedpage.querySelectorAll('script'),
        nonExecutableScript => {
          var script = document.createElement('script');
          script.setAttribute(
            'src',
            this.appUrls[this.props.app] +
              nonExecutableScript.attributes.src.value
          );
          script.setAttribute('type', 'text/javascript');
          this.refs.includedpage.appendChild(script);
          nonExecutableScript.parentNode.removeChild(nonExecutableScript);
        }
      );
    });
  }

  render() {
    return <div ref="includedpage" />;
  }
}
