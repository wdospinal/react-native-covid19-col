import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Container, SymptomCard, BackBtn } from '../components';
import imgSymptoms from '../res/symptoms.png';
import imgSymptoms1 from '../res/symptoms-1.png';
import imgSymptoms2 from '../res/symptoms-2.png';
import i18n from '../translation';

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
          <SymptomCard source={imgSymptoms} symptom={i18n.t('fever')} />
          <SymptomCard source={imgSymptoms1} symptom={i18n.t('cough')} />
          <SymptomCard source={imgSymptoms2} symptom={i18n.t('shortness')} />

          <View style={styles.warningContainer}>
            <Icon
              name="warning"
              type="material"
              color="gold"
              containerStyle={{ marginRight: 20 }}
            />
            <Text style={{ flex: 4, color: 'gold' }}>
              {i18n.t('seekMedical')}
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
