import React from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_CASES, GET_DAILY } from '../actions';
import {
  SummaryText, DailyCard, Container, CountryCard,
} from '../components';
import { primaryColor, textColor } from '../config';

const styles = {
  summaryCard: {
    marginTop: 20,
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
const checkColombia = (country) => country.countryRegion === 'Colombia';

const filterColombia = (array) => {
  const final = [];
  array.forEach((element) => {
    const filterDataColombia = element.filter(checkColombia);
    if (filterDataColombia.length > 0) final.push(filterDataColombia);
  });
  return final;
};

class Main extends React.PureComponent {
  componentDidMount() {
    const { getCases, getDaily } = this.props;
    getCases();
    getDaily();
  }

  render() {
    const {
      navigation, cases, dailyUpdate,
    } = this.props;
    function renderItem({ item }) {
      return (
        <DailyCard case={item} />
      );
    }
    return (
      <Container>
        <View style={styles.summaryCard}>
          <View>
            <SummaryText text={cases.confirmed} subText="Confirmed" onPress={() => navigation.navigate('Cases', { case: 'Confirmed' })} />
            <SummaryText text={cases.recovered} subText="Recovered" onPress={() => navigation.navigate('Cases', { case: 'Recovered' })} />
            <SummaryText text={cases.deceased} subText="Deceased" onPress={() => navigation.navigate('Cases', { case: 'Deaths' })} />
          </View>
        </View>
        <View style={{ marginTop: 20, paddingBottom: 100 }}>
          <CountryCard country="Colombia" />
          <Text style={styles.dailyUpdatesText}>Recent Updates</Text>

          <FlatList
            data={filterColombia(dailyUpdate).reverse()}
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
