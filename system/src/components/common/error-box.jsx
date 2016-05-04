import React from 'react';

const ErrorBox = ({ message }) => (
  <div className="alert alert-danger">Error: {message}</div>
);

ErrorBox.propTypes = {
  message: React.PropTypes.any.isRequired
};

export default ErrorBox;
