import React, { useContext, Fragment } from 'react';
import { Segment, Container, Header, Image, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import { RootStoreContext } from '../../stores/rootStore';
import { Dashboard } from '../dashboard/Dashboard';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

export const HomePage = () => {

    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted >
                    <Image
                        size='massive'
                        src='/assets/logo-2.jpg'
                        alt='logo'
                        style={
                            { marginBottom: 12 }} />
                       Educational Institute Solution
                   </Header>
                <Header />
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome to Solution${user.displayName}`} />
                        <Route path='/dashboard' component={Dashboard} />
                    </Fragment>
                ) : (
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to Solution' />
                            <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>

                            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                             </Button>
                        </Fragment>
                    )}
            </Container>
        </Segment>
    )
}
