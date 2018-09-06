import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SignupForm from './SignupForm';
import './Signup.scss';
import TableInfo from './table';
import FooterDetail from '../FooterDetail/FooterDetail';
import ShopYesorNo from '../ShopYesorNo/ShopYesorNo';

/* eslint-disable react/prop-types */
const SignupPage = ({ location }) => {
    const { pathname } = location;
    return (
        <Fragment>
            <div className="bgStyle">
                <Grid>
                    <Row>
                        <h1 className="bannerTitle_1"> Discover the one-stop shop that works for you. </h1>

                        <Col lg={6} md={6} sm={12} className="bnrFormOutWrap">
                            { pathname && pathname === '/signup' && <SignupForm />}
                            { pathname && pathname === '/shop-yesno' && <ShopYesorNo />}
                        </Col>

                        <Col lg={6} md={6} sm={12} className="bnrFormOutWrap">
                            <TableInfo/>
                        </Col>
                    </Row>
                </Grid>
            </div>
            <FooterDetail />
        </Fragment>
    );
};

// SignupPage.propTypes = {
//     location: PropTypes.string.isRequired,
// };

export default SignupPage;
