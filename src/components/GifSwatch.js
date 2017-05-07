import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import DraggableTypes from '../constants/DraggableTypes';
import { bindAll } from 'lodash'

// Decorate component with DragSource functionality
// See react-dnd docs: http://gaearon.github.io/react-dnd/docs-overview.html
@DragSource(DraggableTypes.GIF, { // implement DragSource interface
  beginDrag(props, monitor, component) {
    // return data that identifies this draggable
    const item = { id: props.id };
    console.log('Dragging', item);
    return item;
  }
}, function registerWithDnD(connect, monitor) {
  return { // These props are injected into our component
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
  };
})
export default class GifSwatch extends Component {
  static propTypes = {
    thumbnailUrl: PropTypes.string.isRequired,
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = { mouseEnter: false }
    bindAll(this, 'mouseEnter', 'mouseOut')
  }

  mouseEnter() {
    this.setState({ mouseEnter: true })
  }

  mouseOut() {
    this.setState({ mouseEnter: false })
  }

  render() {
    const { isDragging, connectDragSource, thumbnailUrl, previewUrl } = this.props;

    const draggingStyles = {
      opacity: .5,
      background: '#6B45C9',
      zIndex: 2
    };

    const styles = {
      padding: 12,
      width: '100%',
      background: '#333',
      ...(isDragging ? draggingStyles : {}),
    }

    const url = this.state.mouseEnter ? previewUrl : thumbnailUrl

    return connectDragSource(
      <div
        style={styles}
      >
        <img
          src={ url }
          style={{width: '100%'}}
          onMouseOver={this.mouseEnter}
          onMouseOut={(this.mouseOut)}
        />
      </div>
    );
  }
}
