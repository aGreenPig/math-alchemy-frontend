import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import {
  Button,
  List,
  FAB,
  Surface,
  Divider,
  Paragraph,
  Portal,
  Modal,
  Provider,
  Card,
  Avatar,
  Title,
} from 'react-native-paper';
import { WebView } from 'react-native-webview';

import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { NotPlus } from '../components/NotPlus';
import GLOBAL from '../Global';

const screen = Dimensions.get('window');
const surface_width_proportion = screen.width * 0.95;
const choice_width_proportion = screen.width / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  scroll: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 70,
  },
  choiceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  choice: {
    margin: 8,
    width: choice_width_proportion,
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: 60,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  confirmnext: {
    backgroundColor: '#FF9800',
    margin: 4,
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
  calculator: {
    margin: 4,
    bottom: 3,
    left: 3,
    position: 'absolute',
  },
  modal: {
    backgroundColor: 'white',
    padding: 70,
    margin: 33,
  },
  card: {
    margin: 4,
  },
});

class Do extends React.Component {
  state = {
    correctCount: 0,
    curIndex: 0,
    answered: false,
    answerCorrect: false,
    selection: -1,
    questions: [],
    toolopened: false,
    mode: this.props.route.params.mode,
    medalModalVisible: false,
  };

  select = (id) => {
    if (this.state.answered == true) {
      return;
    }
    this.setState((state) => {
      const nextState = { selection: id };
      return nextState;
    });
  };

  confirm() {
    if (this.state.selection == null) {
      alert('Please make a selection.');
      return;
    }
    this.putHistoryState();
    this.setState((state) => {
      const nextState = { answered: true };
      var cur_question = this.state.questions[this.state.curIndex];
      if (this.state.selection == cur_question.answer) {
        nextState.correctCount = state.correctCount + 1;
        nextState.answerCorrect = true;
      } else {
        nextState.answerCorrect = false;
      }
      return nextState;
    });
  }

  async putHistoryState() {
    var uid = GLOBAL.homescreen.state.uid;
    var cur_question = this.state.questions[this.state.curIndex];
    var qid = cur_question.qid;
    var st = 0;
    if (this.state.selection == cur_question.answer) {
      st = 1;
    }
    var update_usage = 1;
    if (this.state.mode == 'wrong') {
      update_usage = 0;
    }

    var response = await axios({
      method: 'get',
      baseURL:
        GLOBAL.mode == 'test' ? 'https://jsonblob.com/api/' : GLOBAL.baseURL,
      url:
        GLOBAL.mode == 'test'
          ? '/79de9b52-5390-11eb-a1f3-23cf1d30e6e6'
          : '/updatehistory/' + uid + '/' + qid + '/' + st + '/' + update_usage,
    });
    console.log('after put history for current question: ', response.data);
    var new_medal = response.data['newmedal'];
    var new_rank = response.data['newrank'];
    var rank_upgraded = response.data['rankupgraded'];
    GLOBAL.homescreen.setState({
      medal: new_medal,
      rank: new_rank,
    });
    if (rank_upgraded == true) {
      this.setState({
        // medalModalVisible: true,
      });
    }
  }

  next = () => {
    if (this.state.curIndex + 1 >= this.state.questions.length) {
      this.fetchQuestions();
    } else {
      this.setState((state) => {
        return {
          curIndex: state.curIndex + 1,
          answered: false,
          answerCorrect: false,
          selection: null,
        };
      });
    }
  };

  async fetchQuestions() {
    if (this.state.mode == 'practice') {
      var response = await axios({
        method: 'get',
        baseURL:
          GLOBAL.mode == 'test' ? 'https://jsonblob.com/api/' : GLOBAL.baseURL,
        url:
          GLOBAL.mode == 'test'
            ? '/e30bc0ad-377d-11eb-9cc1-038ae0ba4403'
            : '/getquestions/' + GLOBAL.homescreen.state.uid,
      });
    } else if (this.state.mode == 'wrong') {
      var response = await axios({
        method: 'get',
        baseURL:
          GLOBAL.mode == 'test' ? 'https://jsonblob.com/api/' : GLOBAL.baseURL,
        url:
          GLOBAL.mode == 'test'
            ? '/e30bc0ad-377d-11eb-9cc1-038ae0ba4403'
            : '/getwrongquestions/' + GLOBAL.homescreen.state.uid,
      });
    }

    console.log('Got more questions ...', response.data.length);
    this.setState({
      questions: response.data['questions'],
      curIndex: 0,
      answered: false,
      answerCorrect: false,
      selection: null,
    });
  }

  hideMedalModal = () => {
    this.setState({
      medalModalVisible: false,
    });
  };

  render() {
    if (this.state.questions.length === 0) {
      this.fetchQuestions();
    }
    var cur_question = this.state.questions[this.state.curIndex];

    if (this.state.questions.length == 0) {
      return <ActivityIndicator />;
    } else if ('exceeded_question_quota' in this.state.questions[0]) {
      return (
        <NotPlus
          message={"You've reached your daily practice limit. "}
          onPress={() => {
          }}
        />
      );
    } else {
      return (
        <Provider>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
              <Portal>
                <Modal
                  visible={this.state.medalModalVisible}
                  onDismiss={this.hideMedalModal}
                  contentContainerStyle={styles.modal}>
                  <Text>
                    Congrats on reaching {GLOBAL.homescreen.state.rank}!
                  </Text>
                  <Button>Show</Button>
                </Modal>
              </Portal>

              <Card style={styles.card}>
                <Card.Title title="" />
                <Card.Content>
                  <Title>{cur_question.question}</Title>
                </Card.Content>
              </Card>
              <Divider />

              <View style={styles.choiceContainer}>
                {cur_question.options.map((option, index) => (
                  <Button
                    style={styles.choice}
                    key={index}
                    mode="contained"
                    color={
                      (this.state.selection == index) & !this.state.answered
                        ? '#aa00ff'
                        : (index == cur_question.answer) & this.state.answered
                        ? '#00c853'
                        : !this.state.answerCorrect &
                          (index === this.state.selection) &
                          this.state.answered
                        ? '#d50000'
                        : '#FFFFFF'
                    }
                    onPress={() => this.select(index)}>
                    {option}
                  </Button>
                ))}
              </View>

              <Divider />

              {this.state.answered == true ? (
                <View>
                  <Card style={styles.card}>
                    <Card.Title
                      title="Answer"
                      left={(props) => (
                        <Avatar.Icon
                          size={32}
                          icon={this.state.answerCorrect ? 'check' : 'close'}
                        />
                      )}
                    />
                    <Card.Content>
                      <Paragraph>
                        {this.state.answerCorrect
                          ? 'Bravo!'
                          : 'This is wrong. The correct answer is ' +
                            String.fromCharCode(65 + cur_question.answer) +
                            '.'}
                      </Paragraph>
                    </Card.Content>
                  </Card>

                  <Card style={styles.card}>
                    <Card.Title
                      title="Explanation"
                      left={(props) => <Avatar.Icon size={32} icon="tag" />}
                    />
                    <Card.Content>
                      <Paragraph>{cur_question.explanation}</Paragraph>
                    </Card.Content>
                  </Card>

                  <Card style={styles.card}>
                    <Card.Title
                      title="Learn"
                      left={(props) => (
                        <Avatar.Icon size={32} icon="lightbulb" />
                      )}
                    />
                    <Card.Content>
                      <Paragraph>
                        The question is about: {cur_question.knowledges[0]}
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      <Button
                        onPress={() => {
                          Linking.openURL(cur_question.knowledgeslink[0]);
                        }}>
                        More details
                      </Button>
                    </Card.Actions>
                  </Card>

                  <View>
                    {cur_question.videos.slice(0, 1).map((video, index) => (
                      <WebView
                        originWhitelist={['*']}
                        visible={this.state.answered}
                        style={{
                          height: this.state.answered ? 250 : 0,
                          width: surface_width_proportion,
                          padding: 10,
                        }}
                        source={{
                          uri: video,
                        }}
                      />
                    ))}
                  </View>
                </View>
              ) : null}
            </ScrollView>

            <View style={styles.bottomView}>
              <FAB
                icon="calculator"
                style={styles.calculator}
                onPress={() => {
                  this.props.navigation.navigate('Calculator');
                }}
              />
              <Button
                style={styles.confirmnext}
                mode="outlined"
                onPress={
                  !this.state.answered
                    ? () => this.confirm()
                    : () => this.next()
                }>
                {!this.state.answered ? 'confirm' : 'Next'}
              </Button>
            </View>
          </View>
        </Provider>
      );
    }
  }
}

export default withNavigation(Do);
