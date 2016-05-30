import React from 'react';
import Panel from './panel';
import LoadingOrError from './loading-or-error';
import './main-content.css';

function MainContent({ children, header, loading, error }) {
  return (
    <div className="content-wrapper">
      <h3>{header}</h3>
      <Panel>
        <LoadingOrError loading={loading} error={error}>
          {children}
        </LoadingOrError>
      </Panel>
    </div>
  );
}

MainContent.propTypes = {
  children: React.PropTypes.node,
  header: React.PropTypes.node,
  loading: React.PropTypes.bool,
  error: React.PropTypes.any
};

export default MainContent;
