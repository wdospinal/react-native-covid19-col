import React from 'react';
import {
  View, Text, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  overlayContainer: {
    zIndex: 100,
    height: '50%',
    width: '100%',
    backgroundColor: '#00000090',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    paddingRight: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

class PreventionCard extends React.PureComponent {
  render() {
    const { children, title, backgroundImage } = this.props;
    return (
      <View style={{
        alignItems: 'center', height: WINDOW_HEIGHT - 150, width: 330, alignSelf: 'center',
      }}
      >
        <Image
          source={backgroundImage}
          style={{
            height: '50%', width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20,
          }}
        />
        <Image
          source={backgroundImage}
          style={{
            height: '50%', width: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
          }}
          blurRadius={50}
        />
        <View style={styles.overlayContainer}>
          <Text style={{ fontSize: 18, color: 'white' }}>{title}</Text>
          <View style={{ marginTop: 10 }}>
            {children}
          </View>
        </View>
      </View>
    );
  }
}

PreventionCard.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  backgroundImage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default PreventionCard;
