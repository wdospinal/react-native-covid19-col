import React from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { Container, CasesCard } from '../components';
import { textColor } from '../config';
import {
  SET_SEARCH,
  GET_EACH_CASE,
  UPDATE_SEARCH,
  SET_MAP_VIEW,
} from '../actions';
import i18n from '../translation';

const styles = {
  container: {
    height: 250,
    width: '100%',
    position: 'relative',
    top: 0,
    zIndex: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    zIndex: 90,
    backgroundColor: '#00000070',
    width: '78%',
    position: 'absolute',
    right: 10,
    top: 20,
    // backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    paddingHorizontal: 20,
    borderColor: textColor.secondary,
    borderBottomColor: textColor.secondary,
    borderTopColor: textColor.secondary,
  },
};

class Cases extends React.PureComponent {
  componentDidMount() {
    const { getCases, route } = this.props;
    const caseType = route.params.case;
    getCases(caseType);
  }

  render() {
    const {
      route,
      navigation,
      search,
      setSearch,
      data,
      forceListRerender,
      filteredData,
      updateFilteredData,
      mapView,
      setMapView,
    } = this.props;

    function updateSearch(searching) {
      setSearch(searching);
      const payload = { search, data };
      updateFilteredData(payload);
    }

    function setMapLocation(lat, long) {
      mapView.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    function renderItem({ item }) {
      return (
        <CasesCard
          case={item}
          type={route.params.case}
          onPress={() => setMapLocation(item.lat, item.long)}
        />
      );
    }

    let markerColor;
    switch (route.params.case) {
      case 'Confirmed':
        markerColor = textColor.confirmed;
        break;
      case 'Recovered':
        markerColor = textColor.recovered;
        break;
      case 'Deaths':
        markerColor = textColor.deaths;
        break;
      default:
        markerColor = textColor.deaths;
        break;
    }

    return (
      <>
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
          buttonStyle={{
            backgroundColor: '#00000070',
            padding: 12,
          }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <MapView
            ref={setMapView}
            style={styles.map}
            initialCamera={{
              center: {
                latitude: 6.2518400,
                longitude: -75.5635900,
              },
              altitude: 1,
              pitch: 1,
              heading: 0,
              zoom: 5,
            }}
          >
            {data.map((item) => (
              <Marker
                key={item.index}
                coordinate={{
                  longitude: item.long,
                  latitude: item.lat,
                }}
                pinColor={markerColor}
              />
            ))}
          </MapView>
          {/* <View style={{}}> */}
          <SearchBar
            placeholder={i18n.t('typeCity')}
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchContainer}
            inputContainerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ color: textColor.secondary }}
            placeholderTextColor={textColor.secondary}
            searchIcon={{ color: textColor.secondary }}
          />
          {/* </View> */}
        </View>
        <Container>
          <KeyboardAvoidingView>
            <View style={{ flex: 1, padding: 10 }}>
              <FlatList
                data={filteredData}
                renderItem={renderItem}
                extraData={forceListRerender}
              />
            </View>
          </KeyboardAvoidingView>
        </Container>
      </>
    );
  }
}

Cases.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  setSearch: PropTypes.func,
  search: PropTypes.string,
  data: PropTypes.instanceOf(Array),
  filteredData: PropTypes.instanceOf(Array),
  forceListRerender: PropTypes.bool,
  getCases: PropTypes.func,
  updateFilteredData: PropTypes.func,
  mapView: PropTypes.instanceOf(Object),
  setMapView: PropTypes.func,
};

Cases.defaultProps = {
  setSearch: () => {},
  search: '',
  data: [],
  filteredData: [],
  forceListRerender: false,
  getCases: () => {},
  updateFilteredData: () => {},
  mapView: {},
  setMapView: () => {},
};

const mapStateToProps = (state) => ({
  search: state.cases.search,
  data: state.cases.data,
  filteredData: state.cases.filteredData,
  forceListRerender: state.cases.forceListRerender,
  currentLatitude: state.cases.currentLatitude,
  currentLongitude: state.cases.currentLongitude,
  mapView: state.cases.mapView,
});

const mapDispatchToProps = (dispatch) => ({
  getCases: (caso) => dispatch({ type: GET_EACH_CASE, caso }),
  setSearch: (search) => dispatch({ type: SET_SEARCH, search }),
  updateFilteredData: (payload) => dispatch({ type: UPDATE_SEARCH, payload }),
  setMapView: (mapView) => dispatch({ type: SET_MAP_VIEW, mapView }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cases);
