import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import MainScreen from "./MainScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import firebase from 'firebase';
import Config from './Config';
import StyleWrapper from './StyleWrapper';
import IntroScreen from "./IntroScreen";

firebase.initializeApp(Config.firebaseConfig);

class App extends Component {
    render() {
        return (
            <StyleWrapper>
        <AppNavigator/>
      </StyleWrapper>);
    }
}

const AppNavigator = SwitchNavigator({
    Intro: { screen: IntroScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Main: { screen: MainScreen }
}, {
    headerMode: 'none'
});

export default App;
