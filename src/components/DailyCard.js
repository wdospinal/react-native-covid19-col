import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import CaseStateText from './CaseStateText';
import { primaryColor, textColor } from '../config';
import i18n from '../translation';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 1,
    backgroundColor: primaryColor,
  },
  descriptionText: {
    color: textColor.secondary,
    fontSize: 12,
  },
};

class DailyCard extends React.PureComponent {
  render() {
    const { case: caso } = this.props;
    const {
      active, confirmed, recovered, deaths, lastUpdate,
    } = caso[0];
    Moment.locale(i18n.locale);
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Icon
            containerStyle={{ marginBottom: 0, padding: 0, margin: 0 }}
            name="timelapse"
            type="material"
            color={textColor.alternate}
          />
          <View
            style={{
              backgroundColor: 'transparent',
              width: '50%',
              height: 50,
              borderRightWidth: 0.8,
              borderRightColor: textColor.alternate,
            }}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text style={{ color: textColor.normal }}>
            {Moment(lastUpdate).format('MMMM Do YYYY')}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <CaseStateText
              state="Confirmed"
              value={parseInt(confirmed, 10) || 0}
              delta={parseInt(confirmed, 10) || 0}
            />
            <CaseStateText
              state="Recovered"
              value={parseInt(recovered, 10) || 0}
              delta={parseInt(recovered, 10) || 0}
            />
          </View>
          <Text style={styles.descriptionText}>
            {`${i18n.t('total')} ${
              active || 0
            } ${i18n.t('casesInColombia')} ${
              deaths || 0
            } ${i18n.t('sadlyDeceased')}`}
          </Text>
        </View>
      </View>
    );
  }
}

DailyCard.propTypes = {
  case: PropTypes.instanceOf(Object).isRequired,
};

export default DailyCard;
