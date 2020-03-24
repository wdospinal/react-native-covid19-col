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

const WINDOW_WIDTH = Dimensions.get('window').width;

class Prevention extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const data = [
      {
        backgroundImage: backImg1,
        title: 'Clean your hands often',
        child: (
          <View>
            <Bulletin title="Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing." />
            <Bulletin title="If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol. Cover all surfaces of your hands and rub them together until they feel dry." />
            <Bulletin title="Avoid touching your eyes, nose, and mouth with unwashed hands." />
          </View>
        ),
      },
      {
        backgroundImage: backImg3,
        title: 'Avoid close contact',
        child: (
          <View>
            <Bulletin title="Avoid close contact with people who are sick" />
            <Bulletin title="Put distance between yourself and other people if COVID-19 is spreading in your community. This is especially important for people who are at higher risk of getting very sick." />
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
