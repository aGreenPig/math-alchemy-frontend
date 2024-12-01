import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  List,
  FAB,
  Portal,
  Title,
  Paragraph,
  Avatar,
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import GLOBAL from '../Global';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
    };
  }

  async onPressSignIn() {
    const { email, code } = this.state;
    if (email.length <= 0 || code.length <= 0) {
      alert('Please fill out the required fields.');
      return;
    }

    await axios
      .get(
        'https://mathalchemy.wixsite.com/hello/_functions/login?email=' +
          this.state.email +
          '&code=' +
          this.state.code
      )
      .then((response) => {
        //console.log(
        //  'respons from wix in login: ',
        //  response.data,
        //);
        if (response.data['approved'] != true) {
          alert(
            'Log in failed, please try again.\nForgot your password? Head to Math Alchemy website to reset.'
          );
          AsyncStorage.removeItem('email');
          GLOBAL.homescreen.setState({
            uid: global.deviceid,
            email: '',
            name: '',
          });
        } else {
          alert('log in successful!');
          AsyncStorage.setItem('email', email);
          GLOBAL.homescreen.setState({
            uid: email,
            email: email,
            name: email,
          });
          axios({
            method: 'get',
            baseURL:
              GLOBAL.mode == 'test'
                ? 'https://jsonblob.com/api/'
                : GLOBAL.baseURL,
            url: '/linkaccounts/' + global.deviceid + '/' + email,
          });
        }
      });
    if (GLOBAL.homescreen.state.email != '') {
      return this.props.navigation.popToTop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.text}>
          Math Alchemy provides personalized Math learning experience for all
        </Title>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.InputBody}
            placeholder="Your email address"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.InputBody}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.setState({ code: text })}
            value={this.state.code}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          style={styles.signinContainer}
          mode="contained"
          onPress={() => this.onPressSignIn()}>
          Sign In
        </Button>
        <Paragraph style={styles.text}>
          Not yet a member? Visit Math Alchemy website and learn more!
        </Paragraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    alignItems: 'center',
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  signinContainer: {
    padding: 5,
    marginTop: 15,
    width: 330,
    height: 42,
  },
  InputContainer: {
    width: 330,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  InputBody: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SignIn;
