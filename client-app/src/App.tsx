import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps, Route, Switch, withRouter } from 'react-router-dom'
import { HomePage } from './features/home/HomePage'
import { NavBar } from './features/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite'
import './App.css';
import LoginForm from './features/user/LoginForm'
import NotFound from './layout/NotFound'
import { Dashboard } from './features/dashboard/Dashboard'
import { Contact } from './features/contact/Contact'
import { RootStoreContext } from './stores/rootStore'
import { LoadingComponent } from './layout/LoadingComponent'
import ModalContainer from './common/modals/ModalContainer'

export const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    }
    else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content='Loading ap.....' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />

      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>

                <Route exact path='/' component={HomePage} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/contact' component={Contact} />

                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));