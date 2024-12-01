import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  Paragraph,
  RadioButton,
  Colors,
  TouchableRipple,
  FAB,
  List,
  Divider,
  Text,
  Card,
  Avatar,
} from 'react-native-paper';
import axios from 'axios';

import { NotPlus } from '../components/NotPlus';
import GLOBAL from '../Global';

class Analysis extends React.Component {
  state = { data: null };

  componentDidMount() {
    this.getLearningAnalysisData();
  }

  async getLearningAnalysisData() {
    var response = await axios({
      method: 'get',
      baseURL:
        GLOBAL.mode == 'test' ? 'https://jsonblob.com/api/' : GLOBAL.baseURL,
      url:
        GLOBAL.mode == 'test'
          ? '/16f5fa5a-5935-11eb-836c-5f2568232105'
          : '/getuserinfo/' + GLOBAL.homescreen.state.uid,
    });
    console.log('analysis data fetched: ', response.data);

    this.setState({
      data: response.data,
    });
  }

  render() {
    var data = this.state.data;
    if (data == null) {
      return <ActivityIndicator />;
    } else if ('plus_only' in data) {
      return (
        <NotPlus
          message={'This feature is for Plus member only. '}
          onPress={() => {}}
        />
      );
    } else {
      var breakdown = data['breakdown'];
      var topic_list = [];
      for (const topic in breakdown) {
        var skill_list = [];
        for (const skill in breakdown[topic]) {
          if (skill != 'topicscore') {
            skill_list.push(
              <List.Item title={breakdown[topic][skill]['skillscore']} />
            );
          }
        }
        topic_list.push(
          <List.Section title="section">
            <List.Accordion
              left={(props) => <List.Icon {...props} icon="folder" />}
              title={topic}>
              {skill_list}
            </List.Accordion>
          </List.Section>
        );
      }

      return (
        <ScrollView>
          <Card style={styles.card}>
            <Card.Title
              title="Your overall score"
              left={(props) => <Avatar.Icon {...props} icon="city" />}
            />
            <Card.Content>
              <Paragraph>{data['latest_score']}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title
              title="Score breakdowns"
              left={(props) => <Avatar.Icon {...props} icon="city" />}
            />
            <Card.Content>{topic_list}</Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
});

export default Analysis;
