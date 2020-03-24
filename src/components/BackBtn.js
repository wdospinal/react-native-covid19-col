import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';
import { textColor } from '../config';

class BackBtn extends React.PureComponent {
  render() {
    const { onPress } = this.props;

    return (
      <Button
        icon={(
          <Icon
            name="arrow-back"
            type="material"
            color={textColor.secondary}
          />
  )}
        containerStyle={{
          position: 'absolute', top: 20, left: 20, zIndex: 100,
        }}
        buttonStyle={{ backgroundColor: '#00000070', padding: 12 }}
        onPress={onPress}
      />
    );
  }
}

BackBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackBtn;
