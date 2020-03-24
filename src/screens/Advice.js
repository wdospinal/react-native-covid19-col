import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textColor } from '../config';
import { Container, AdviceCard } from '../components';

const styles = {
  container: { padding: 20, paddingBottom: 100 },
  regionInformation: { fontSize: 30, color: textColor.alternate, marginBottom: 30 },
};
class Advice extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.regionInformation}>Information Center</Text>

          <AdviceCard
            onPress={() => navigation.navigate('HowItSpreads')}
            icon={<Icon name="bug" type="entypo" color="purple" />}
            title="How it spreads"
            description="Learn how Covid-19 spreads"
          />
          <AdviceCard
            onPress={() => navigation.navigate('Symptoms')}
            icon={<Icon name="air" type="entypo" color="orange" />}
            title="Symptoms"
            description="Symptoms of Covid-19"
          />
          <AdviceCard
            onPress={() => navigation.navigate('Prevention')}
            icon={<Icon name="first-aid" type="foundation" color="#FF8080" />}
            title="Prevention and treatment"
            description="Steps taken to prevent Covid-19"
          />
          <AdviceCard
            onPress={() => navigation.navigate('WhatToDo')}
            icon={<Icon name="question" type="foundation" color="gold" />}
            title="What to do"
            description="What to do if you get the virus"
          />
        </View>
      </Container>
    );
  }
}

Advice.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Advice;
