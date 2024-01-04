import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';
import Sidebar from 'components/Sidebar';
import cogoToast from 'cogo-toast';
import Navbar from 'components/Navbar';
import ME from 'queries/me';
import MeProvider from 'contexts/Me';
import { shape } from 'prop-types';
import Theme from 'components/Theme';
import Announcement from 'components/Announcement';
import SessionModal from 'components/SessionModal';
import ModalStatusProvider from 'contexts/ModalStatus';
import setErrorMessage from 'utils/setErrorMessage';
import tawk from 'utils/tawk';
import { StyledMain } from './styles';

import Home from './Home';
import Settings from './Settings';
import Profile from './Profile';
import Teams from './Teams';
import Credits from './Credits';
import Documents from './Documents';
import Manage from './Manage';
import Analytics from './Analytics';
import Reports from './Reports';
import Reviewers from './Reviewers';
import Requests from './Requests';
import Invoices from './Invoices';
import InvoiceRequests from './InvoiceRequests';
import IForm from './IForm';
import LiveChat from './LiveChat';
import Logins from './Logins';
import Billings from './Billings';
import Error from './Error';

const Main = ({ history, client }) => {
  const [isSidebar, setSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setSidebar(true);
  };

  const handleCloseSidebar = e => {
    if (!e.isOpen) setSidebar(false);
  };

  return (
    <StyledMain>
      <Announcement />
      <Query query={ME}>
        {({ loading, error, data = {} }) => {
          if (loading) return <div>loading...</div>;
          if (error || !data.me) {
            cogoToast.error(setErrorMessage(error));
            localStorage.removeItem('token');
            client.resetStore();
            history.push('/login');
            return null;
          }
          const { me = {} } = data;
          if (me.roles && me.roles.includes('CLIENT')) tawk();
          return (
            <MeProvider initMe={data.me}>
              <ModalStatusProvider initModalStatus={false}>
                <Theme me={data.me}>
                  <>
                    <Sidebar
                      isOpen={isSidebar}
                      pageWrapId="page-wrap"
                      outerContainerId="Main"
                      customBurgerIcon={false}
                      onStateChange={handleCloseSidebar}
                      onClickMenuItem={handleCloseSidebar}
                    />
                    <div id="page-wrap">
                      {me.permissionList.includes('CAN_VISIT_SESSION_PAGE') && (
                        <SessionModal hasCloseButton={false} />
                      )}
                      <Navbar onClickSidebar={handleOpenSidebar} />
                      <Switch>
                        <Redirect exact from="/" to="/home" />
                        {me.permissionList.includes(
                          'CAN_VISIT_PIPELINE_PAGE'
                        ) && <Route path="/home" component={Home} />}
                        {me.permissionList.includes(
                          'CAN_VISIT_SETTINGS_PAGE'
                        ) && <Route path="/settings" component={Settings} />}
                        {me.permissionList.includes('CAN_VISIT_PROFILE_PAGE') && (
                          <Route path="/profile" component={Profile} />
                        )}
                        {me.permissionList.includes('CAN_VISIT_TEAMS_PAGE') && (
                          <Route path="/teams" component={Teams} />
                        )}
                        {me.permissionList.includes('CAN_VISIT_CREDITS_PAGE') && (
                          <Route path="/credits" component={Credits} />
                        )}
                        {me.permissionList.includes(
                          'CAN_VISIT_DOCUMENTS_PAGE'
                        ) && <Route path="/documents" component={Documents} />}
                        {me.permissionList.includes(
                          'CAN_VISIT_ANALYTICS_PAGE'
                        ) && <Route path="/sales" component={Analytics} />}
                        {me.permissionList.includes('CAN_VISIT_MANAGE_PAGE') && (
                          <Route path="/manage" component={Manage} />
                        )}
                        {me.permissionList.includes('CAN_VISIT_REPORTS_PAGE') && (
                          <Route path="/reports" component={Reports} />
                        )}
                        {me.permissionList.includes(
                          'CAN_VISIT_REVIEWERS_PAGE'
                        ) && <Route path="/reviews" component={Reviewers} />}
                        {me.permissionList.includes(
                          'CAN_VISIT_REQUESTS_PAGE'
                        ) && <Route path="/requests" component={Requests} />}
                        {me.permissionList.includes(
                          'CAN_VISIT_INVOICES_PAGE'
                        ) && <Route path="/invoices" component={Invoices} />}
                        {me.permissionList.includes(
                          'CAN_VISIT_INVOICE_REQUESTS_PAGE'
                        ) && (
                            <Route
                              path="/invoice-requests"
                              component={InvoiceRequests}
                            />
                          )}
                        {me.permissionList.includes('CAN_VISIT_IFORM_PAGE') && (
                          <Route path="/iform/:pipelineId" component={IForm} />
                        )}
                        {me.permissionList.includes(
                          'CAN_VISIT_LIVE_CHAT_PAGE'
                        ) && <Route path="/live-chat" component={LiveChat} />}
                        {me.permissionList.includes('CAN_VISIT_LOGIN_PAGE') && (
                          <Route path="/logins" component={Logins} />
                        )}
                        {me.permissionList.includes('CAN_VISIT_BILLING_PAGE') && (
                          <Route path="/billing" component={Billings} />
                        )}
                        <Route component={Error} />
                      </Switch>
                    </div>
                  </>
                </Theme>
              </ModalStatusProvider>
            </MeProvider>
          );
        }}
      </Query>
    </StyledMain >
  );
};

Main.propTypes = {
  history: shape({}),
  client: shape({}),
};

Main.defaultProps = {
  history: {},
  client: {},
};

export default withRouter(withApollo(Main));
