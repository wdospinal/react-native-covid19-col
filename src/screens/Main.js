import React from 'react';
import {
  View, Text, Image, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
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
    const chartConfig = {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    };
    /*
    const [cases, setCases] = useState({
      Confirmed: 0,
      Recovered: 0,
      Deaths: 0,
    });
    const [dailyUpdate, setDailyUpdate] = useState([]);
    */

    /*
    useEffect(() => {
      fetchCases();
      fetchDaily();
    }, []);
  */

    const data = [
      {
        name: 'Confirmed',
        population: cases.Confirmed ? cases.Confirmed : 0,
        color: textColor.confirmed,

      },
      {
        name: 'Recovered',
        population: cases.Recovered ? cases.Recovered : 0,
        color: textColor.recovered,
      },
      {
        name: 'Deaths',
        population: cases.Deaths ? cases.Deaths : 0,
        color: textColor.deaths,
      },
    ];

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
          <View>
            <PieChart
              data={data}
              width={300}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              hasLegend={false}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.dailyUpdatesText}>Daily Updates</Text>

          <FlatList
            data={dailyUpdate}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
            // extraData={forceListRerender}
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
