import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  image: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
};

class SymptomCard extends React.PureComponent {
  render() {
    const { source, symptom } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={source} />
        <Text style={styles.text}>{symptom}</Text>
      </View>
    );
  }
}
SymptomCard.propTypes = {
  source: PropTypes.instanceOf(Object).isRequired,
  symptom: PropTypes.string.isRequired,
};

export default SymptomCard;
