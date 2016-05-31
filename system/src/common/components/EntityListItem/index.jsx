import React, { Component } from 'react';
import { List, Map } from 'immutable';
import { getFromValOrFunc } from '../../../modules/entity-config-loader';
import './style.css';

class EntityListItem extends Component {

  static propTypes = {
    settings: React.PropTypes.instanceOf(Map).isRequired,
    fieldConfigs: React.PropTypes.instanceOf(List).isRequired,
    cssClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    entity: React.PropTypes.instanceOf(Map).isRequired,
    handleContextMenu: React.PropTypes.func,
    handleEditItem: React.PropTypes.func,
    handleRemoveItem: React.PropTypes.func
  };

  // Default tansforms for field values
  static DEFAULT_TRANSFORMS = {
    bool: value => (value ? 'Yes' : 'No')
  };

  constructor() {
    super();

    this.onTrContextMenu = this.onTrContextMenu.bind(this);
  }

  onTrContextMenu(event) {
    // return native menu if pressing control
    if (event.ctrlKey) return;

    event.preventDefault();

    if (this.props.handleContextMenu) {
      this.props.handleContextMenu(event.clientX, event.clientY, this.props.entity);
    }
  }

  render() {
    return (
      <tr
        className={getFromValOrFunc(this.props.cssClass, this.props.entity)}
        onContextMenu={this.onTrContextMenu}
      >
        {
          this.props.fieldConfigs.map(field => (
            <td key={field.get('name')}>{(() => {
              let value = this.props.entity.get(field.get('name'));

              // perform any transformation on the value
              let transform = field.get('transform');

              // If no transform function, use the default transformations
              if (!transform) {
                transform = EntityListItem.DEFAULT_TRANSFORMS[field.get('type')];
              }

              if (transform) {
                value = transform(value, this.props.entity, this.props.settings);
              }

              return value;
            })()}</td>
          ))
        }
        <td className="text-center">
          {
            this.props.handleEditItem
            ? <button
              className="btn btn-default btn-xs"
              onClick={() => this.props.handleEditItem(this.props.entity)}
            >
              <span className="fa fa-pencil"></span>
              &nbsp;
              <span className="hidden-xs">Edit</span>
            </button>
            : null
          }
          &nbsp;
          {
            this.props.handleRemoveItem
            ? <button
              className="btn btn-danger btn-xs"
              onClick={() => this.props.handleRemoveItem(this.props.entity)}
            >
              <span className="fa fa-trash"></span>
              &nbsp;
              <span className="hidden-xs">Delete</span>
            </button>
            : null
          }
        </td>
      </tr>
    );
  }

}

export default EntityListItem;
