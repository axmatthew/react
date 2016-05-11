import React from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';
import './sidebar.css';

const Sidebar = ({ entityConfigs, userBlock }) => (
  <aside className="aside">
    <div className="aside-inner">
      <nav data-sidebar-anyclick-close className="sidebar">
        <ul className="nav">
          {userBlock}
          <li className="nav-heading">
            Main Navigation
          </li>
          {
            entityConfigs.map(entityConfig => (
              <li key={entityConfig.get('url')}>
                <Link to={`/${entityConfig.get('url')}`}>
                  <em className={`icon-${entityConfig.get('iconClass')}`} />
                  <span>
                    {entityConfig.get('label')}
                  </span>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  </aside>
);

Sidebar.propTypes = {
  entityConfigs: React.PropTypes.instanceOf(List).isRequired,
  userBlock: React.PropTypes.element.isRequired
};

export default Sidebar;
