import React from 'react';

function ErrorBox({ message }) {
  return (
    <pre>
      <div className="alert alert-danger">
        Error occurred, please contact support with below message:
        {JSON.stringify(message, null, 2)}
      </div>
    </pre>
  );
}

ErrorBox.propTypes = {
  message: React.PropTypes.any.isRequired
};

export default ErrorBox;
