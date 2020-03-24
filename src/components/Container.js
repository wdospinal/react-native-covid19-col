import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
import { backgroundColor } from '../config';

const styles = {
  container: {
    backgroundColor,
    flex: 1,
  },
};

class Container extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <>
        <StatusBar backgroundColor={backgroundColor} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {children}
        </ScrollView>
      </>
    );
  }
}

Container.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Container;
