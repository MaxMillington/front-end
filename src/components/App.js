import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { bindAll } from 'lodash'
import request from 'superagent';

import urls from '../constants/urls';
import GifSwatch from './GifSwatch';
import GifDropzoneContainer from './GifDropzoneContainer';

import './App.scss';

@DragDropContext(HTML5Backend)
export class App extends Component {

  constructor() {
    super();
    this.state = { data: null };
    this.timeout = null;
    bindAll(this, 'handleChange');
  }

  handleChange(input) {
    clearTimeout(this.timeout)

    const url = `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=dc6zaTOxFJmzC`;

    this.timeout = setTimeout(() => {
      request.get(url, ((err, res) => {
        this.setState({ data: res.body.data })
      }));
    }, 300);
  }

  renderSwatch(r) {
    const props = {
      key: r.id,
      id: r.id,
      thumbnailUrl: r.images.fixed_height_small_still.url,
      previewUrl: r.images.preview_gif.url
    };
    return (<GifSwatch {...props} />);
  }

  render() {
    let logoUrl = require('../../static/images/logo.svg');

    let resultSwatches;
    if (this.state.data) {
      resultSwatches = this.state.data.map(::this.renderSwatch);
    }
    return (
      <div className="App">
        <header className="masthead">
          <h1>
            <a href="/">
              <img src={logoUrl} height={36} />
              &nbsp;
              <span>Gifs</span>
            </a>
          </h1>
        </header>
        <div className="content-container">
          <main className="main">
            <GifDropzoneContainer src="https://media.giphy.com/media/13p77tfexyLtx6/giphy.gif" />
            <GifDropzoneContainer src="https://media.giphy.com/media/iLqpYAbKGOrqU/giphy.gif" />
            <GifDropzoneContainer src="https://media.giphy.com/media/8ytDUrlW9JbG0/giphy.gif" />
            <GifDropzoneContainer src="https://media.giphy.com/media/PekRU0CYIpXS8/giphy.gif" />
          </main>
          <aside className="sidebar">
            <input
              className="search-input"
              name="search"
              placeholder="Search"
              onChange={(e) => this.handleChange(e.target.value)}
            />
            { resultSwatches }
          </aside>
        </div>
        <footer className="footer">
          {<a href={urls.claraHomepage} target="_blank">About Clara</a>}
          {' | '}
          {<a href={urls.claraCareers} target="_blank">Work at Clara</a>}
        </footer>
      </div>
    );
  }
}
