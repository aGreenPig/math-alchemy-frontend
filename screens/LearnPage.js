import * as React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import {
  Paragraph,
  RadioButton,
  Colors,
  TouchableRipple,
  FAB,
  List,
  Divider,
  Text,
} from 'react-native-paper';
import GLOBAL from '../Global';

class LearnPage extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Item
            left={(props) => <List.Icon {...props} icon="lead-pencil" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
            title="Keep practicing"
            description="Personalized problems chosen for you."
            onPress={() => {
              GLOBAL.homescreen.state.grade == null
                ? this.props.navigation.navigate('My Grade')
                : this.props.navigation.navigate('Do', {
                    mode: 'practice',
                    name: 'Personalized Practice',
                  });
            }}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Item
            left={(props) => <List.Icon {...props} icon="not-equal-variant" />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
            title="Missed Questions"
            description="It's always good to review what you've missed."
            onPress={() =>
              this.props.navigation.navigate('Do', {
                mode: 'wrong',
                name: 'Questions you have Missed',
              })
            }
          />
        </List.Section>
        <Divider />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
  },
});

export default LearnPage;
