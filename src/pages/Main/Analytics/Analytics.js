import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { useMe } from 'contexts/Me';

import Orders from './Orders';
import Sales from './Sales';
import { StyledTableWrap } from './styles';

const Analytics = ({ match }) => {
  const { me } = useMe();

  const links = [
    {
      label: 'Chart',
      value: 'chart',
      component: Sales,
      roles: ['ADMIN'],
    },
    {
      label: 'Grid',
      value: 'grid',
      component: Orders,
      roles: ['ADMIN'],
    },
  ];

  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey={`${match.path}/sales`}>
        {links.map((item, key) => {
          if (item.roles.every(e => me.roles.includes(e))) {
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
      <StyledTableWrap className="border-top-0 border p-3 bg-white">
        <Switch>
          <Redirect from={match.path} exact to={`${match.path}/grid`} />
          {links.map((item, key) => (
            <Route
              key={key}
              path={`${match.path}/${item.value}`}
              component={item.component}
            />
          ))}
        </Switch>
      </StyledTableWrap>
    </Container>
  );
};

export default Analytics;
