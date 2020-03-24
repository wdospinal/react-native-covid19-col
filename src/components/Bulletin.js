import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class Bulletin extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'white', marginRight: 10 }}>*</Text>
        <Text style={{ fontSize: 11, lineHeight: 20, color: 'white' }}>{title}</Text>
      </View>
    );
  }
}

Bulletin.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Bulletin;
