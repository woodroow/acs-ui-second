import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'shards-react';

import MainNavbar from '../components/layout/MainNavbar/MainNavbar';
import MainSidebar from '../components/layout/MainSidebar/MainSidebar';
import MainFooter from '../components/layout/MainFooter';

const DefaultLayout = ({
  children, noNavbar, noFooter, noSidebar
}) => (
  <Container fluid>
    <Row>
      {!noSidebar && <MainSidebar />}
      <Col
        className='main-content p-0'
        lg={!noSidebar ? { size: 10, offset: 2 } : null}
        md={!noSidebar ? { size: 9, offset: 3 } : null}
        sm='12'
        tag='main'
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  noSidebar: PropTypes.bool,
  children: PropTypes.node,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
