import React from 'react';
import {
  View, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import backImg1 from '../res/background.jpg';
import backImg3 from '../res/background-3.jpg';
import {
  PreventionCard, Container, BackBtn, Bulletin,
} from '../components';
import i18n from '../translation';

const WINDOW_WIDTH = Dimensions.get('window').width;

class Prevention extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const data = [
      {
        backgroundImage: backImg1,
        title: i18n.t('prevention1'),
        child: (
          <View>
            <Bulletin title={i18n.t('prevention1Bulletin1')} />
            <Bulletin title={i18n.t('prevention1Bulletin2')} />
            <Bulletin title={i18n.t('prevention1Bulletin3')} />
          </View>
        ),
      },
      {
        backgroundImage: backImg3,
        title: i18n.t('prevention2'),
        child: (
          <View>
            <Bulletin title={i18n.t('prevention2Bulletin1')} />
            <Bulletin title={i18n.t('prevention2Bulletin2')} />
          </View>
        ),
      }];

    function renderItem({ item }) {
      return (
        <PreventionCard
          backgroundImage={item.backgroundImage}
          title={item.title}
          description={item.description}
        >
          {item.child}
        </PreventionCard>
      );
    }
    return (
      <Container>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={{ marginTop: 20 }}>
          <Carousel
            ref={(c) => this.slider1Ref === c}
            data={data}
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

Prevention.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Prevention;
