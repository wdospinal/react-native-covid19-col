import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { textColor, backgroundColor } from '../config';

const styles = {
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5,
  },
  subText: {
    fontWeight: 'bold',
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
  },
};

class SummaryText extends React.PureComponent {
  render() {
    let subTextColor;
    const { subText, onPress, text } = this.props;

    switch (subText) {
      case 'Confirmed':
        subTextColor = textColor.confirmed;
        break;
      case 'Recovered':
        subTextColor = textColor.recovered;
        break;
      case 'Deaths':
        subTextColor = textColor.deaths;
        break;
      default:
        subTextColor = textColor.confirmed;
        break;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
          <Text style={[styles.subText, { color: subTextColor }]}>{subText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SummaryText.defaultProps = {
  subText: '',
  text: 0,
  onPress: () => {},
};

SummaryText.propTypes = {
  subText: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.number,
};

export default SummaryText;
