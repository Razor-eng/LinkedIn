import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, []);


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);