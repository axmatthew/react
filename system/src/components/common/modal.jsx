import React from 'react';
import classNames from 'classnames';

const Modal = ({ children, title, size, ...props }) => (
  <div
    className="modal fade"
    tabIndex={-1}
    role="dialog"
    {...props}
  >
    <div className={classNames({ 'modal-dialog': true, [size]: true })}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">×</span>
          </button>
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button type="button" data-dismiss="modal" className="btn btn-default">Close</button>
        </div>
      </div>
    </div>
  </div>

);

Modal.defaultPropTypes = {
  size: ''
};

Modal.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  size: React.PropTypes.oneOf(['modal-sm', 'modal-lg'])
};

export default Modal;
