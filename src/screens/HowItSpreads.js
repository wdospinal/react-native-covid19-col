import React from 'react';
import {
  View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import backImg1 from '../res/background-1.jpg';
import backImg2 from '../res/background-2.jpg';
import { HowItSpreadsCard, Container, BackBtn } from '../components';

const WINDOW_WIDTH = Dimensions.get('window').width;

class HowItSpreads extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const chhild = (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginRight: 10 }}>*</Text>
          <Text style={{ fontSize: 11, color: 'white' }}>Between people who are in close contact with one another (within about 6 feet</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginRight: 10 }}>*</Text>
          <Text style={{ fontSize: 11, color: 'white' }}>Through respiratory droplets produced when an infected person coughs or sneezes.</Text>
        </View>
      </View>
    );
    function renderItem({ item }) {
      return (
        <HowItSpreadsCard
          backgroundImage={item.backgroundImage}
          title={item.title}
          description={item.description}
        >
          {item.child}
        </HowItSpreadsCard>
      );
    }

    return (
      <Container>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={{ marginTop: 20 }}>
          <Carousel
            ref={(c) => this.slider1Ref === c}
            data={[
              {
                backgroundImage: backImg1,
                title: 'Person-to-person spread',
                description: 'The virus is thought to spread mainly from person-to-person',
                child: chhild,
              },
              {
                backgroundImage: backImg2,
                title: 'Spread from contact with contaminated surfaces or objects',
                description: 'It may be possible that a person can get COVID-19 by touching a surface or object that has the virus on it and then touching their own mouth, nose, or possibly their eyes, but this is not thought to be the main way the virus spreads.',
              }]}
            renderItem={renderItem}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH}
            loop
            autoplay
            lockScrollWhileSnapping
            autoplayInterval={7000}
          />
        </View>
      </Container>
    );
  }
}

HowItSpreads.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default HowItSpreads;
