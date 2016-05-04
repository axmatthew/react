import React from 'react';
import Loading from './loading';
import ErrorBox from './error-box';

const LoadingOrError = ({ children, loading, error }) => {
  if (loading) return <Loading />;

  if (error) return <ErrorBox message={error} />;

  return <span>{children}</span>;
};

LoadingOrError.propTypes = {
  children: React.PropTypes.node,
  loading: React.PropTypes.bool,
  error: React.PropTypes.any
};

export default LoadingOrError;
