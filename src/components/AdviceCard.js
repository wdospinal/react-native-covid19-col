import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textColor, primaryColor } from '../config';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    borderRadius: 5,
    elevation: 1,
    padding: 20,
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

class AdviceCard extends React.PureComponent {
  render() {
    const {
      onPress, icon, title, description,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, { backgroundColor: primaryColor }]}>
          {/* icon change based on case type */}
          {icon}
          <View style={{ flex: 5, padding: 10 }}>
            <Text style={styles.regionText}>{title}</Text>
            {/* //text color changes based on case type */}
            <Text style={{ color: textColor.secondary }}>{description}</Text>
          </View>
          <Icon name="ios-arrow-forward" type="ionicon" size={30} />
        </View>
      </TouchableOpacity>
    );
  }
}

AdviceCard.propTypes = {
  icon: PropTypes.instanceOf(Object).isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AdviceCard;
