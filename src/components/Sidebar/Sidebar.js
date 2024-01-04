import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withApollo } from 'react-apollo';
import { func, shape } from 'prop-types';
import { useMe } from 'contexts/Me';
import {
  faUser,
  faFolder,
  faMoneyCheckAlt,
  faTasks,
  faSignOutAlt,
  faHome,
  faCog,
  faChartBar,
  faUserFriends,
  faChartLine,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import Session from 'components/Session';
import SessionManager from 'components/SessionManager';
import Calculator from 'components/Calculator';
import Services from 'components/Services';
import { StyledSidebar } from './styles';

const Sidebar = ({ onClickMenuItem, history, client, ...props }) => {
  const { me } = useMe();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isSessionInitiated');
    client.resetStore();
    history.push('/login');
  };

  return (
    <StyledSidebar {...props}>
      <ul>
        {me.permissionList.includes('CAN_VISIT_PIPELINE_PAGE') && (
          <li>
            <Link className="menu-item" to="/home" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faHome} />
              <span className="title">Pipeline</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_SERVICES_PAGE') && (
          <li>
            <Services />
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_PROFILE_PAGE') && (
          <li>
            <Link className="menu-item" to="/profile" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faUser} />
              <span className="title">Profile</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_CREDITS_PAGE') && (
          <li>
            <Link className="menu-item" to="/credits" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faFolder} />
              <span className="title">Credits</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_BILLING_PAGE') && (
          <li>
            <Link className="menu-item" to="/billing" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} />
              <span className="title">Billing</span>
            </Link>
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_REPORTS_PAGE') && (
          <li>
            <Link className="menu-item" to="/reports" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faChartLine} />
              <span className="title">Reports</span>
            </Link>
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_INSTRUCTIONS_PAGE') && (
          <li>
            <a className="menu-item" href="#/instructions">
              <FontAwesomeIcon icon={faTasks} />
              <span className="title">Instructions</span>
            </a>
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_TEAMS_PAGE') && (
          <li>
            <Link className="menu-item" onClick={onClickMenuItem} to="/teams">
              <FontAwesomeIcon icon={faUserFriends} />
              <span className="title">Teams</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_DOCUMENTS_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/documents"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Documents</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_REQUESTS_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/requests"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Requests</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_ANALYTICS_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/sales"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faChartBar} />
              <span className="title">Analytics</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_MANAGE_PAGE') && (
          <li>
            <Link className="menu-item" to="/manage" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Manage</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_REVIEWERS_PAGE') && (
          <li>
            <Link className="menu-item" to="/reviews" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Reviews</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_INVOICES_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/invoices"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Invoices</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_INVOICE_REQUESTS_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/invoice-requests"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Invoice Requests</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_SESSION_MANAGER_PAGE') && (
          <li>
            <SessionManager />
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_SESSION_PAGE') && (
          <li>
            <Session />
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_CALCULATOR_PAGE') && (
          <li>
            <Calculator />
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_LOGIN_PAGE') && (
          <li>
            <Link className="menu-item" to="/logins" onClick={onClickMenuItem}>
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Logins</span>
            </Link>
          </li>
        )}
        {me.permissionList.includes('CAN_VISIT_LIVE_CHAT_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/live-chat"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faComment} />
              <span className="title">Live chat</span>
            </Link>
          </li>
        )}

        {me.permissionList.includes('CAN_VISIT_SETTINGS_PAGE') && (
          <li>
            <Link
              className="menu-item"
              to="/settings"
              onClick={onClickMenuItem}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="title">Settings</span>
            </Link>
          </li>
        )}

        <li>
          <Link className="menu-item" to="#/logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="title">Logout</span>
          </Link>
        </li>
      </ul>
    </StyledSidebar>
  );
};

Sidebar.propTypes = {
  onClickMenuItem: func,
  history: shape({}),
  client: shape({}),
};

Sidebar.defaultProps = {
  onClickMenuItem: e => e,
  history: {},
  client: {},
};

export default withRouter(withApollo(Sidebar));
