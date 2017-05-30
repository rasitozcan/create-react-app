import React, { Component } from 'react';

export default class IncludedPage extends Component {
  componentWillMount(props) {
    this.instanceID = Math.floor(Math.random() * 1000);
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

  removeRoot() {
    this.refs.includedpage.childNodes.forEach(node => {
      if (node.id === 'root') {
        this.refs.includedpage.removeChild(node);
      }
    });
  }

  prepareDOM(body) {
    const includedPage = this.refs.includedpage;
    const mountEl = document.createElement('DIV');
    mountEl.setAttribute('id', this.instanceID);

    includedPage.innerHTML = body;
    includedPage.appendChild(mountEl);
    this.removeRoot();
  }

  renderApp() {
    this.fetchApp().then(body => {
      this.prepareDOM(body);
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
          script.setAttribute('data-instanceid', this.instanceID);
          document.appendChild(script);
          nonExecutableScript.parentNode.removeChild(nonExecutableScript);
        }
      );
    });
  }

  render() {
    return <div className="included-page" ref="includedpage" />;
  }
}
