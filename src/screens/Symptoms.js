import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Container, SymptomCard, BackBtn } from '../components';
import imgSymptoms from '../res/symptoms.png';
import imgSymptoms1 from '../res/symptoms-1.png';
import imgSymptoms2 from '../res/symptoms-2.png';

const styles = {
  warningContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFD70020',
    margin: 10,
    borderRadius: 10,
  },
};

class Symptopms extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={{ alignItems: 'center', paddingTop: 50, paddingBottom: 100 }}>
          <SymptomCard source={imgSymptoms} symptom="Fever" />
          <SymptomCard source={imgSymptoms1} symptom="Cough" />
          <SymptomCard source={imgSymptoms2} symptom="Shortness of breath" />

          <View style={styles.warningContainer}>
            <Icon
              name="warning"
              type="material"
              color="gold"
              containerStyle={{ marginRight: 20 }}
            />
            <Text style={{ flex: 4, color: 'gold' }}>
              Seek medical advice if you develop
              symptoms, and have been in close
              contact with a person known to
              have COVID-19 or if you live in or
              have recently been in an area with
              ongoing spread of COVID-19.
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

Symptopms.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Symptopms;
