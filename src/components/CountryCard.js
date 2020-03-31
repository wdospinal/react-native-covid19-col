import React from 'react';
import { View, Text } from 'react-native';
import AnimateNumber from 'react-native-animate-number';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { textColor, primaryColor } from '../config';
import i18n from '../translation';

class CountryCard extends React.PureComponent {
  render() {
    const {
      lastUpdated, country, confirmed, deceased, recovered,
    } = this.props;
    const styles = {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingTop: 20,
        backgroundColor: primaryColor,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
      },
      descriptionText: {
        color: textColor.secondary,
        fontSize: 12,
      },
    };

    function CaseText(props) {
      let color = '';

      switch (props.case) {
        case 'Confirmed':
          color = textColor.confirmed;
          break;
        case 'Deceased':
          color = textColor.deceased;
          break;
        case 'Recovered':
          color = textColor.recovered;
          break;
        default:
          color = textColor.recovered;
          break;
      }

      return (
        <View
          style={{
            marginHorizontal: 25,
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <AnimateNumber
            style={{ color, fontSize: 20, fontWeight: 'bold' }}
            value={props.value}
            formatter={(val) => parseFloat(val).toFixed(0)}
          />
          <Text style={{ color, fontSize: 11 }}>{i18n.t(props.case)}</Text>
        </View>
      );
    }
    Moment.locale(i18n.locale);
    return (
      <View style={styles.container}>
        <Text style={{ color: textColor.normal, marginBottom: 10 }}>
          {country}
        </Text>
        <Text
          style={{ color: textColor.secondary, fontSize: 11 }}
        >
          {`${i18n.t('lastUpdate')} ${Moment(lastUpdated).format('MMMM Do YYYY')}`}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CaseText case="Confirmed" value={confirmed} />
          <CaseText case="Deceased" value={deceased} />
          <CaseText case="Recovered" value={recovered} />
        </View>
      </View>
    );
  }
}

CountryCard.propTypes = {
  lastUpdated: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  confirmed: PropTypes.number.isRequired,
  deceased: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
};

export default CountryCard;
