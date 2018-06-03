import React, { Component } from "react";
import { Text, Container, Content, Button } from 'native-base';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';

class MainScreen extends Component {

    logOut() {
        firebase.auth().signOut()
        .then(this.goToLogin, function(error) { 
            console.error('Sign Out Error', error); 
        });
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>We're logged in!</Text>
                    <Button onPress={this.logOut.bind(this)}><Text>Log out</Text></Button>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(MainScreen);