import React from 'react';
import {
  View, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SET_ACTIVE_SLIDE } from '../actions';
import { Container, BackBtn } from '../components';
import imgSymptoms1 from '../res/symptoms-1.png';
import imgSymptoms4 from '../res/symptoms-4.png';
import imgSymptoms5 from '../res/symptoms-5.png';
import imgSymptoms6 from '../res/symptoms-6.png';
import imgSymptoms7 from '../res/symptoms-7.png';
import imgSymptoms8 from '../res/symptoms-8.png';
import imgSymptoms9 from '../res/symptoms-9.png';
import imgSymptoms10 from '../res/symptoms-10.png';
import imgSymptoms11 from '../res/symptoms-11.png';
import WhatToDoCard from '../components/WhatToDoCard';
import i18n from '../translation';

const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = {
  pagination: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
};
// TODO: ADD reducer to manage activeSlide
class WhatToDo extends React.PureComponent {
  render() {
    const { navigation, activeSlide, setActiveSlide } = this.props;

    const data = [
      {
        image: imgSymptoms1,
        title: i18n.t('whatToDO1'),
        points: [
          i18n.t('whatToDO1point1'),
          i18n.t('whatToDO1point2'),
        ],
      },
      {
        image: imgSymptoms4,
        title: i18n.t('whatToDO2'),
        points: [
          i18n.t('whatToDO2point1'),
          i18n.t('whatToDO2point2'),
        ],
      },
      {
        image: imgSymptoms5,
        title: i18n.t('whatToDO3'),
        points: [
          i18n.t('whatToDO3point1'),
        ],
      },
      {
        image: imgSymptoms6,
        title: i18n.t('whatToDO4'),
        points: [
          i18n.t('whatToDO4point1'),
          i18n.t('whatToDO4point2'),
        ],
      },
      {
        image: imgSymptoms7,
        title: i18n.t('whatToDO5'),
        points: [
          i18n.t('whatToDO5point1'),
          i18n.t('whatToDO5point2'),
          i18n.t('whatToDO5point3'),
        ],
      },
      {
        image: imgSymptoms8,
        title: i18n.t('whatToDO6'),
        points: [
          i18n.t('whatToDO6point1'),
          i18n.t('whatToDO6point2'),
          i18n.t('whatToDO6point3'),
          i18n.t('whatToDO6point4'),
        ],
      },
      {
        image: imgSymptoms9,
        title: i18n.t('whatToDO7'),
        points: [
          i18n.t('whatToDO7point1'),
          i18n.t('whatToDO7point2'),
        ],
      },
      {
        image: imgSymptoms10,
        title: i18n.t('whatToDO8'),
        points: [
          i18n.t('whatToDO8point1'),
          i18n.t('whatToDO8point2'),
          i18n.t('whatToDO8point3'),
        ],
      },
      {
        image: imgSymptoms11,
        title: i18n.t('whatToDO9'),
        points: [
          i18n.t('whatToDO9point1'),
          i18n.t('whatToDO9point2'),
          i18n.t('whatToDO9point3'),
        ],
      },
    ];

    function pagination() {
      return (
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={styles.pagination}
          inactiveDotStyle={{}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    }

    function renderItem({ item, index }) {
      return (
        <WhatToDoCard
          image={item.image}
          title={item.title}
          points={item.points}
          key={index}
        >
          {item.child}
        </WhatToDoCard>
      );
    }

    return (
      <Container>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={{ marginTop: 15 }}>
          {pagination()}

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
            onSnapToItem={(index) => setActiveSlide(index)}
          />
        </View>
      </Container>
    );
  }
}

WhatToDo.defaultProps = {
  activeSlide: 0,
  setActiveSlide: () => {},
};

WhatToDo.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  setActiveSlide: PropTypes.func,
  activeSlide: PropTypes.number,
};

const mapStateToProps = (state) => ({
  activeSlide: state.whatToDo.activeSlide,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveSlide: (index) => dispatch({ type: SET_ACTIVE_SLIDE, index }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhatToDo);
