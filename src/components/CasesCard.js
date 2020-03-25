import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { textColor, primaryColor } from '../config';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: primaryColor,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 10,
  },
  regionText: {
    color: 'white',
    marginBottom: 5,
    fontSize: 16,
  },
  caseTypeText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
};

class CasesCard extends React.PureComponent {
  render() {
    const { case: caso, type, onPress } = this.props;
    const { provinceState: province, countryRegion: country } = caso;
    const provinceState = province || '';
    const countryRegion = country || '';

    let iconName;
    let color;

    switch (type) {
      case 'Confirmed':
        iconName = 'meho';
        color = textColor.confirmed;
        break;
      case 'Recovered':
        iconName = 'smile-circle';
        color = textColor.recovered;
        break;
      case 'Deaths':
        iconName = 'frown';
        color = textColor.deaths;
        break;
      default:
        iconName = 'frown';
        color = textColor.deaths;
        break;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[styles.container, { backgroundColor: primaryColor }]}
        >
          {/* icon change based on case type */}
          <Icon
            containerStyle={{ flex: 1 }}
            name={iconName}
            type="antdesign"
            color={color}
          />
          <View style={{ flex: 5, padding: 10 }}>
            <Text style={styles.regionText}>{`${provinceState} ${countryRegion}`}</Text>
            {/* //text color changes based on case type */}
            <Text style={[styles.caseTypeText, { color }]}>{`${type} ${caso[type.toLowerCase()]}`}</Text>
            <Text style={{ color: textColor.secondary }}>{`Ultima actualización ${(new Date(caso.lastUpdate)).toDateString()}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

CasesCard.propTypes = {
  case: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CasesCard;
