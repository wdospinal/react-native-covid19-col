import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import CaseStateText from './CaseStateText';
import { primaryColor, textColor } from '../config';

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

    return (
      <View style={styles.container}>
        <Icon
          containerStyle={{ flex: 1 }}
          name="timelapse"
          type="material"
          color={textColor.alternate}
        />
        <View style={{ flex: 6 }}>
          <Text style={{ color: 'white' }}>{(new Date(caso.reportDateString)).toDateString()}</Text>
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
            {`Total ${caso.mainlandChina ? caso.mainlandChina : 0} cases in China and ${caso.otherLocation ? caso.otherLocation : 0} in other locations`}
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
