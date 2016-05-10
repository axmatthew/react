import React from 'react';

const ErrorBox = ({ message }) => (
  <div className="alert alert-danger">{`${message} Please refresh page.`}</div>
);

ErrorBox.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default ErrorBox;
