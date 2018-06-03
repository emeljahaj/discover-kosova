import React, { Component } from 'react';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import Config from './Config';
import firebase from 'firebase';

firebase.initializeApp(Config.firebaseConfig);

export default class Contact extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            lastName: '',
            email: ''
        };
    }

    onNameChanged(val) {
        this.setState({
            name: val
        });
    }

    onLastNameChanged(val) {
        this.setState({
            lastName: val
        });
    }

    onEmailChanged(val) {
        this.setState({
            email: val
        });
    }

    onSubmitPressed() {

        if (this.state.name.trim() == '') {
            Alert.alert("Error", "You must enter a name!");
            return;
        }

        if (this.state.lastName.trim() == '') {
            Alert.alert("Error", "You must enter a last name!");
            return;
        }

        if (this.state.email.trim() == '') {
            Alert.alert("Error", "You must enter an email!");
            return;
        }

        var rootRef = firebase.database().ref(); // Empty parameters == root reference

        var newNode = rootRef.push({
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email
        }, () => {
            // Ky funksion thirret kur push kryhet me sukses
            Alert.alert("User successfully inserted! User ID is " + newNode.getKey());

            this.resetFields();
        });

        // Saving data - https://firebase.google.com/docs/database/admin/save-data
        // =========================================================================================
        // push -> shto nyje te re ne liste me ID automatikisht te gjeneruar
        // set -> krijo nyje ne nje path te caktuar (e zevendeson komplet objektin, nese ndodhet dicka aty paraprakisht)
        // update -> update nje nyje ekzistuese pjeserisht (nuk e zevendeson komplet objektin)
        // =========================================================================================
    }

    resetFields()  {
        this.setState({
            name: '',
            lastName: '',
            email: ''
        });
    }

    render() {
        return (
            <Container>
            <Header />
            <Content>
            <Form>
                <Item stackedLabel>
                    <Label>Name</Label>
                    <Input onChangeText={this.onNameChanged.bind(this)}  value={this.state.name}/>
                </Item>
                <Item stackedLabel>
                    <Label>Last name</Label>
                    <Input onChangeText={this.onLastNameChanged.bind(this)} value={this.state.lastName} />
                </Item>
                <Item stackedLabel last>
                    <Label>Email</Label>
                    <Input onChangeText={this.onEmailChanged.bind(this)} value={this.state.email}/>
                </Item>
                <Button block onPress={this.onSubmitPressed.bind(this)} style={style.submitButton}>
                    <Text>Submit</Text>
                </Button>
            </Form>
            </Content>
        </Container>
        );
    }
}

const style = {
    submitButton: {
        margin: 15
    }
}