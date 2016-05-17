import React from 'react';

const Panel = ({ children, header, footer, type }) => (
  <div className={`panel panel-${type}`}>
    {header ? <div className="panel-heading">{header}</div> : null}
    <div className="panel-body">
      {children}
    </div>
    {footer ? <div className="panel-footer">{footer}</div> : null}
  </div>
);

Panel.defaultPropTypes = {
  type: 'default'
};

Panel.propTypes = {
  children: React.PropTypes.node,
  header: React.PropTypes.node,
  footer: React.PropTypes.node,
  type: React.PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger'])
};

export default Panel;
