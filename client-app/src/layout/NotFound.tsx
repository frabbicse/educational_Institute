import React from 'react'
import { Header, Segment, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we've looked everywhere but could't find this.
            </Header>
            <Segment.Inline> 
                <Button as={Link} to='/home' primary>
                    Return to Home page 
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
export default NotFound;