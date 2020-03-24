import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Bulletin } from './index';

class WhatToDoCard extends React.PureComponent {
  render() {
    const { points, title, image } = this.props;
    return (
      <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
        <Image source={image} style={{ height: 150, width: 150 }} />
        <Text style={{
          fontSize: 22, fontWeight: 'bold', marginVertical: 20, color: 'white', textAlign: 'center',
        }}
        >
          {title}
        </Text>
        <View>
          {points.map((item) => (
            <Bulletin title={item} />
          ))}
        </View>
      </View>
    );
  }
}

WhatToDoCard.propTypes = {
  image: PropTypes.number.isRequired,
  points: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
};

export default WhatToDoCard;
