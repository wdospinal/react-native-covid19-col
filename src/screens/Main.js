import React from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_CASES, GET_DAILY } from '../actions/main';
import { SummaryText, DailyCard, Container } from '../components';
import { primaryColor, textColor } from '../config';

const styles = {
  summaryCard: {
    height: 300,
    width: '92%',
    backgroundColor: primaryColor,
    alignSelf: 'center',
    borderRadius: 7,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  dailyUpdatesText: {
    color: textColor.alternate,
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 30,
  },
};

class Main extends React.PureComponent {
  componentDidMount() {
    const { getCases, getDaily } = this.props;
    getCases();
    getDaily();
  }

  render() {
    const { navigation, cases, dailyUpdate } = this.props;

    function renderItem({ item }) {
      return (
        <DailyCard case={item} />
      );
    }
    return (
      <Container>
        <View style={styles.summaryCard}>
          <View>
            <SummaryText text={cases.Confirmed} subText="Confirmed" onPress={() => navigation.navigate('Cases', { case: 'Confirmed' })} />
            <SummaryText text={cases.Recovered} subText="Recovered" onPress={() => navigation.navigate('Cases', { case: 'Recovered' })} />
            <SummaryText text={cases.Deaths} subText="Deaths" onPress={() => navigation.navigate('Cases', { case: 'Deaths' })} />
          </View>
        </View>
        <View style={{ marginTop: 20, paddingBottom: 100 }}>

          <Text style={styles.dailyUpdatesText}>Recent Updates</Text>

          <FlatList
            data={dailyUpdate.reverse().slice(0, 3)}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
            inverted
          />
        </View>
      </Container>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  cases: PropTypes.instanceOf(Object),
  dailyUpdate: PropTypes.instanceOf(Object),
  getCases: PropTypes.func,
  getDaily: PropTypes.func,
};

Main.defaultProps = {
  cases: {},
  dailyUpdate: {},
  getCases: () => {},
  getDaily: () => {},
};

const mapStateToProps = (state) => ({
  cases: state.main.cases,
  dailyUpdate: state.main.dailyUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  getCases: () => dispatch({ type: GET_CASES }),
  getDaily: () => dispatch({ type: GET_DAILY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
