import * as React from 'react';
import { View, StyleSheet, ScrollView, Linking, Modal } from 'react-native';
import {
  Paragraph,
  RadioButton,
  Colors,
  TouchableRipple,
  useTheme,
  FAB,
  List,
  Divider,
  Avatar,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import GLOBAL from '../Global';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    GLOBAL.userscreen = this;
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.forceUpdate();
    });
  }

  signOut = () => {
    console.log('logging out');
    GLOBAL.homescreen.setState({
      uid: global.deviceid,
      email: "",
      name: "",
    });
    this.forceUpdate();
  };

  render() {
    return (
      <ScrollView style={styles.container} >
        <Avatar.Icon style={styles.avatar} icon="account-circle" size={85} />
        <Paragraph style={styles.hellotext}>Hello {GLOBAL.homescreen.state.email}</Paragraph>
        <List.Section>
          <List.Subheader></List.Subheader>
          {GLOBAL.homescreen.state.email == "" ? (
            <List.Item
              left={(props) => <List.Icon {...props} icon="login" />}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              title={'Sign In'}
              onPress={() => {
                this.props.navigation.navigate('Sign In');
              }}
            />
          ) : (
            <List.Item
              left={(props) => <List.Icon {...props} icon="logout" />}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              title={'Sign Out'}
              onPress={() => this.signOut()}
            />
          )}
          <List.Item
            left={(props) => <List.Icon {...props} icon="calendar" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
            title="Change My Grade"
            onPress={() => {
              this.props.navigation.navigate('My Grade');
            }}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Subheader></List.Subheader>
          <List.Item
            title="About Math Alchemy"
            left={(props) => <List.Icon {...props} icon="coffee-to-go" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
            onPress={() => {
              Linking.openURL('https://mathalchemy.com/');
            }}
          />
          <List.Item
            title="Like Math Alchemy on Instagram"
            left={(props) => <List.Icon {...props} icon="thumb-up" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
            onPress={() => {
              Linking.openURL('https://instagram.com/mathalchemy');
            }}
          />
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  avatar: {
    marginTop: 15,
    alignSelf: 'center',
  },
  hellotext: {
    textAlign: 'center',
    marginTop: 15,
  },
});

export default UserPage;
