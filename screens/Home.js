import * as React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Share } from 'react-native';
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  List,
  Title,
} from 'react-native-paper';
import axios from 'axios';
import GLOBAL from '../Global';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: global.email == '' ? global.deviceid : global.email,
      email: global.email,
      name: '',
      grade: '',
      medal: 0,
      rank: '',
      medalModalVisible: false,
    };
    GLOBAL.homescreen = this;
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    var response = await axios({
      method: 'get',
      baseURL:
        GLOBAL.mode == 'test' ? 'https://jsonblob.com/api/' : GLOBAL.baseURL,
      url:
        GLOBAL.mode == 'test'
          ? '/9a6f36a5-38f3-11eb-b103-87c32ba20189'
          : '/getuserinfo/' + GLOBAL.homescreen.state.uid,
    });
    console.log('user info fetched ', response.data);

    this.setState({
      medal: response.data['medal'],
      rank: response.data['rank'],
      grade: response.data['grade'],
    });
  }

  async onShare() {
    try {
      const result = await Share.share({
        message: 'Math Alchemy | Personalize your math learning',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.message);
    }
  }

  hideMedalModal = () => {
    this.setState({
      medalModalVisible: false,
    });
  };

  /*
  <Paragraph>
    uid: {this.state.uid}
    email: {this.state.email}
    name: {this.state.name}
    grade: {this.state.grade}
    medal: {this.state.medal}
    rank: {this.state.rank}
  </Paragraph>
  */

  render() {
    return (
      <Provider>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}>
          <Portal>
            <Modal
              visible={this.state.medalModalVisible}
              onDismiss={this.hideMedalModal}
              contentContainerStyle={styles.modal}>
              <Title
              style={styles.title}
              >How to earn medals. 🎖️</Title>
              <Paragraph>
                By answering each question right, you'll get +15 medals. 😃 If you
                answer it wrong, you get -5 medals, 🙁 but if you are able to
                answer right the second time, you'll get those 5 medals back! 🙂
              </Paragraph>
            </Modal>
          </Portal>

          <Card style={styles.card}>
            <Card.Cover
              source={require('../assets/study.jpg')}
              style={{
                height: 150,
              }}
            />
            <Card.Title
              title="Problems for you"
              left={(props) => <Avatar.Icon {...props} icon="lead-pencil" />}
            />
            <Card.Content>
              <Paragraph>
                Personalized problems recommended only for you that target your
                learning.
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  GLOBAL.homescreen.state.grade == null
                    ? this.props.navigation.navigate('My Grade')
                    : this.props.navigation.navigate('Do', {
                        mode: 'practice',
                        name: 'Personalized Practice',
                      });
                }}>
                Go
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title="Your medal"
              left={(props) => <Avatar.Icon {...props} icon="medal" />}
            />
            <Card.Content>
              {GLOBAL.mode == 'test' ? (
                <Paragraph>
                  uid: {this.state.uid}
                  {'\n'}
                  email: {this.state.email}
                  {'\n'}
                  name: {this.state.name}
                  {'\n'}
                  grade: {this.state.grade}
                  {'\n'}
                  medal: {this.state.medal}
                  {'\n'}
                  rank: {this.state.rank}
                </Paragraph>
              ) : null}
              <Paragraph>
                You currently have {this.state.medal} medals.{' '}
                {this.state.medal != 0 ? 'Good work!' : ''}
              </Paragraph>
              <List.Item
                left={(props) => (
                  <Avatar.Image
                    style={styles.medal}
                    size={50}
                    source={require('../assets/steel.png')}
                  />
                )}
                title="Steel (0-200)"
                description={
                  this.state.rank == 'Steel' ? 'You are currently here' : ''
                }
              />
              <List.Item
                left={(props) => (
                  <Avatar.Image
                    style={styles.medal}
                    size={50}
                    source={require('../assets/bronze.png')}
                  />
                )}
                title="Bronze (201-500)"
                description={
                  this.state.rank == 'Bronze' ? 'You are currently here' : ''
                }
              />
              <List.Item
                left={(props) => (
                  <Avatar.Image
                    style={styles.medal}
                    size={50}
                    source={require('../assets/silver.png')}
                  />
                )}
                title="Silver (501-1000)"
                description={
                  this.state.rank == 'Silver' ? 'You are currently here' : ''
                }
              />
              <List.Item
                left={(props) => (
                  <Avatar.Image
                    style={styles.medal}
                    size={50}
                    source={require('../assets/gold.png')}
                  />
                )}
                title="Gold (1001-1500)"
                description={
                  this.state.rank == 'Gold' ? 'You are currently here' : ''
                }
              />
              <List.Item
                left={(props) => (
                  <Avatar.Image
                    style={styles.medal}
                    size={50}
                    source={require('../assets/diamond.png')}
                  />
                )}
                title="Diamond (>1500)"
                description={
                  this.state.rank == 'Diamond' ? 'You are currently here' : ''
                }
              />
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  this.setState({
                    medalModalVisible: true,
                  });
                }}>
                How it works?
              </Button>
              <Button onPress={this.onShare}>Share with friends</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </Provider>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  medal: {
    backgroundColor: '#FFFFFF',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    height: 230,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
});
