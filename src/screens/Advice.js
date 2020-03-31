import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textColor } from '../config';
import { Container, AdviceCard } from '../components';
import i18n from '../translation';

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
          <Text style={styles.regionInformation}>{i18n.t('informationCenter')}</Text>

          <AdviceCard
            onPress={() => navigation.navigate('HowItSpreads')}
            icon={<Icon name="bug" type="entypo" color="purple" />}
            title={i18n.t('howItSpreads')}
            description={i18n.t('learnHowItSpreads')}
          />
          <AdviceCard
            onPress={() => navigation.navigate('Symptoms')}
            icon={<Icon name="air" type="entypo" color="orange" />}
            title={i18n.t('symptoms')}
            description={i18n.t('learnSymptoms')}
          />
          <AdviceCard
            onPress={() => navigation.navigate('Prevention')}
            icon={<Icon name="first-aid" type="foundation" color="#FF8080" />}
            title={i18n.t('prevention')}
            description={i18n.t('learnPrevention')}
          />
          <AdviceCard
            onPress={() => navigation.navigate('WhatToDo')}
            icon={<Icon name="question" type="foundation" color="gold" />}
            title={i18n.t('whatToDO')}
            description={i18n.t('learnWhatToDO')}
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
