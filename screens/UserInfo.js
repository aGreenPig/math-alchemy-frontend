import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Paragraph,
  RadioButton,
  Colors,
  TouchableRipple,
  useTheme,
  FAB,
  Button,
  Title,
} from 'react-native-paper';
import axios from 'axios';
import GLOBAL from '../Global';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade_chosen: GLOBAL.homescreen.state.grade,
    };
  }

  finish() {
    console.log('user has entered the grade');
    GLOBAL.homescreen.setState({
      grade: this.state.grade_chosen,
    });
    axios({
      method: 'get',
      baseURL: GLOBAL.baseURL,
      url:
        '/updategrade/' +
        String(GLOBAL.homescreen.state.uid) +
        '/' +
        String(this.state.grade_chosen),
    });
    return this.props.navigation.popToTop();
  }

  render() {
    var grades_view = [];
    var grades_list = [
      'Grade 5 or below',
      'Grade 6',
      'Grade 7',
      'Grade 8',
      'Algebra 1',
      'Algebra 2',
      'High School Geometry',
      'High School Statistics',
    ];
    for (let i = 0; i < grades_list.length; i++) {
      grades_view.push(
        <TouchableRipple
          onPress={() => this.setState({ grade_chosen: grades_list[i] })}>
          <View style={styles.row}>
            <Paragraph>{grades_list[i]}</Paragraph>
            <View pointerEvents="none">
              <RadioButton.IOS
                value={grades_list[i]}
                status={
                  this.state.grade_chosen === grades_list[i]
                    ? 'checked'
                    : 'unchecked'
                }
              />
            </View>
          </View>
        </TouchableRipple>
      );
    }

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#FFFFFF',
          },
        ]}>
        <Title style={styles.text}>What's your grade?</Title>
        {grades_view}

        <Button
          style={styles.button}
          mode="outlined"
          visible={this.state.grade_chosen != ''}
          onPress={() => this.finish()}>
          Done
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  button: {
    padding: 4,
  },
  text: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default UserInfo;
