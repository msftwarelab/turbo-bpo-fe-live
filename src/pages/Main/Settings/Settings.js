import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import hasRole from 'utils/hasRole';
import { useMe } from 'contexts/Me';

import Users from './Users';
import Companies from './Companies';
import Accounts from './Accounts';
import Adjustments from './Adjustments';
import Comments from './Comments';
import Defaults from './Defaults';
import PipelineState from './PipelineState';
import Headers from './Headers';
import Announcements from './Announcements';
import PermissionGroups from './PermissionGroups';

const Settings = ({ match, client }) => {
  const { me } = useMe();
  console.log(me)
  const links = [
    {
      label: 'Companies',
      value: 'companies',
      component: Companies,
      roles: ['ADMIN'],
    },
    {
      label: 'Pipeline',
      value: 'pipeline',
      component: PipelineState,
      roles: ['ADMIN'],
    },
    {
      label: 'Accounts',
      value: 'accounts',
      component: Accounts,
      roles: ['CLIENT', 'CONTRACTOR'],
    },
    {
      label: 'Adjustments',
      value: 'adjustments',
      component: Adjustments,
      roles: ['CLIENT', 'CONTRACTOR', 'ADMIN'],
    },
    {
      label: 'Users',
      value: 'users',
      component: Users,
      roles: ['ADMIN'],
    },
    {
      label: 'Comments',
      value: 'comments',
      component: Comments,
      roles: ['CLIENT', 'CONTRACTOR'],
    },
    {
      label: 'Headers',
      value: 'headers',
      component: Headers,
      roles: ['ADMIN'],
    },
    {
      label: me.roles.includes('ADMIN') ? 'Search' : 'Defaults',
      value: 'defaults',
      component: Defaults,
      roles: ['CLIENT', 'ADMIN'],
    },
    {
      label: 'Notifications',
      value: 'notifications',
      component: Announcements,
      roles: ['ADMIN'],
    },
    {
      label: 'Permissions',
      value: 'permissionGroups',
      component: PermissionGroups,
      roles: ['ADMIN'],
    },
  ];

  const defaultLink = me.roles.includes('ADMIN')
    ? `${match.path}/companies`
    : `${match.path}/accounts`;

  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey={defaultLink}>
        {links.map((item, key) => {
          if (hasRole(me.roles, item.roles)) {
            return (
              <Nav.Item key={key}>
                <NavLink
                  className="nav-link text-dark"
                  to={`${match.path}/${item.value}`}
                >
                  {item.label}
                </NavLink>
              </Nav.Item>
            );
          }
          return null;
        })}
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <Switch>
          <Redirect from={match.path} exact to={defaultLink} />
          {links.map((item, key) => (
            <Route
              key={key}
              path={`${match.path}/${item.value}`}
              component={item.component}
            />
          ))}
        </Switch>
      </div>
    </Container>
  );
};

export default withApollo(Settings);
