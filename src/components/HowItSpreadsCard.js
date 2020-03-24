import React from 'react';
import {
  View, Text, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  overlayContainer: {
    zIndex: 100,
    height: '30%',
    width: '100%',
    backgroundColor: '#00000090',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
};

class HowItSpreadsCard extends React.PureComponent {
  render() {
    const {
      children, title, description, backgroundImage,
    } = this.props;
    const WINDOW_HEIGHT = Dimensions.get('window').height;
    return (
      <View style={{
        alignItems: 'center', height: WINDOW_HEIGHT - 150, width: 330, alignSelf: 'center',
      }}
      >
        <Image
          source={backgroundImage}
          style={{
            height: '70%', width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20,
          }}
        />
        <Image
          source={backgroundImage}
          style={{
            height: '30%', width: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
          }}
          blurRadius={50}
        />
        <View style={styles.overlayContainer}>
          <Text style={{ fontSize: 18, color: 'white' }}>{title}</Text>
          <Text style={{ fontSize: 11, color: 'white' }}>{description}</Text>
          <View style={{ marginTop: 10 }}>
            {children}
          </View>
        </View>
      </View>
    );
  }
}

HowItSpreadsCard.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImage: PropTypes.instanceOf(Object).isRequired,
};

export default HowItSpreadsCard;
