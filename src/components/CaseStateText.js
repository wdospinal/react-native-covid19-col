import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textColor } from '../config';

const styles = {
  container: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
};

class CaseStateText extends React.PureComponent {
  render() {
    let color;
    const { state, value, delta } = this.props;
    switch (state) {
      case 'Confirmed':
        color = textColor.confirmed;
        break;
      case 'Recovered':
        color = textColor.recovered;
        break;
      default:
        color = textColor.recovered;
        break;
    }

    const iconName = value < delta ? 'trending-down' : 'trending-up';

    return (
      <View style={styles.container}>
        <Icon
          // trending-up or trending-down based on the delta value
          name={iconName}
          type="material"
          color={textColor.alternate}
        />
        <Text
          style={[
            styles.text,
            { color },
          ]}
        >
          {`${state}: ${value}`}
        </Text>
      </View>
    );
  }
}

CaseStateText.propTypes = {
  state: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  delta: PropTypes.number.isRequired,
};

export default CaseStateText;
