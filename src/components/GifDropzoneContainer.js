import React, {Component, PropTypes} from 'react';
import GifDropzone from './GifDropzone'
import { bindAll } from 'lodash'

export default class GifDropzoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {src: this.props.src}
    bindAll(this, 'dropped')
  }

  dropped(id) {
    this.setState({ src: `https://media.giphy.com/media/${id}/giphy.gif` })
  }

  render() {
    return(
      <GifDropzone src={this.state.src} dropped={this.dropped} />
    )
  }
}