import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
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

    const options = {
      weekday: 'long', year: 'long', month: 'long', day: 'numeric',
    };
    console.log(i18n.locale)
    console.log(new Date(caso.reportDate).toLocaleDateString(i18n.locale, options))
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
            {new Date(caso.reportDateString).toDateString()}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <CaseStateText
              state="Confirmed"
              value={caso.totalConfirmed ? caso.totalConfirmed : 0}
              delta={caso.deltaConfirmed ? caso.deltaConfirmed : 0}
            />
            <CaseStateText
              state="Recovered"
              value={caso.totalRecovered ? caso.totalRecovered : 0}
              delta={caso.deltaRecovered ? caso.deltaRecovered : 0}
            />
          </View>
          <Text style={styles.descriptionText}>
            {`Total ${
              caso.mainlandChina ? caso.mainlandChina : 0
            } casos in China and ${
              caso.otherLocations ? caso.otherLocations : 0
            } in other locations`}
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
