import React from 'react';
import {
  View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import backImg1 from '../res/background-1.jpg';
import backImg2 from '../res/background-2.jpg';
import { HowItSpreadsCard, Container, BackBtn } from '../components';
import i18n from '../translation';

const WINDOW_WIDTH = Dimensions.get('window').width;

class HowItSpreads extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const chhild = (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginRight: 10 }}>*</Text>
          <Text style={{ fontSize: 11, color: 'white' }}>{i18n.t('howItSpreads1Bulletin1')}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginRight: 10 }}>*</Text>
          <Text style={{ fontSize: 11, color: 'white' }}>{i18n.t('howItSpreads1Bulletin2')}</Text>
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
                title: i18n.t('howItSpreads1'),
                description: i18n.t('howItSpreads1Description'),
                child: chhild,
              },
              {
                backgroundImage: backImg2,
                title: i18n.t('howItSpreads2'),
                description: i18n.t('howItSpreads2Description'),
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
