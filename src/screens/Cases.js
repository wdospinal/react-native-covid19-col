import React, { useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { Container, CasesCard } from '../components';
import { textColor } from '../config';
import {
  SET_SEARCH,
  SET_FORCE_LIST_RERENDER,
  SET_CURRENT_LATITUDE,
  SET_CURRENT_LONGITUDE,
  GET_EACH_CASE,
  UPDATE_SEARCH,
} from '../actions';

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
      setForceListRerender,
      filteredData,
      setCurrentLatitude,
      currentLatitude,
      setCurrentLongitude,
      currentLongitude,
      updateFilteredData,
    } = this.props;

    function updateSearch(searching) {
      setSearch(searching);
      const payload = { search, data };
      updateFilteredData(payload);
    }

    useEffect(() => {
      setForceListRerender(!forceListRerender);
    }, [filteredData]);

    function setMapLocation(latitude, longitude) {
      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      this.mapView.current.animateToRegion({
        latitude: currentLatitude,
        longitude: currentLongitude,
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
            ref={this.mapView}
            style={styles.map}
            initialCamera={{
              center: {
                latitude: 35.8617,
                longitude: 104.1954,
              },
              pitch: 1,
              heading: 0,
              zoom: 1,
            }}
          >
            {data.map((item) => (
              <Marker
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
            placeholder="Type City or province region"
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
  setForceListRerender: PropTypes.func,
  forceListRerender: PropTypes.bool,
  setCurrentLatitude: PropTypes.func,
  currentLatitude: PropTypes.number,
  setCurrentLongitude: PropTypes.func,
  currentLongitude: PropTypes.number,
  getCases: PropTypes.func,
  updateFilteredData: PropTypes.func,
};

Cases.defaultProps = {
  setSearch: () => {},
  search: '',
  data: [],
  filteredData: [],
  setForceListRerender: () => {},
  forceListRerender: false,
  setCurrentLatitude: () => {},
  currentLatitude: 0,
  setCurrentLongitude: () => {},
  currentLongitude: 0,
  getCases: () => {},
  updateFilteredData: () => {},
};

const mapStateToProps = (state) => ({
  search: state.cases.search,
  data: state.cases.data,
  filteredData: state.cases.filteredData,
  forceListRerender: state.cases.forceListRerender,
  currentLatitude: state.cases.currentLatitude,
  currentLongitude: state.cases.currentLongitude,
});

const mapDispatchToProps = (dispatch) => ({
  getCases: (caso) => dispatch({ type: GET_EACH_CASE, caso }),
  setSearch: (search) => dispatch({ type: SET_SEARCH, search }),
  setForceListRerender: () => dispatch({ type: SET_FORCE_LIST_RERENDER }),
  setCurrentLatitude: (lat) => dispatch({ type: SET_CURRENT_LATITUDE, lat }),
  setCurrentLongitude: (long) => dispatch({ type: SET_CURRENT_LONGITUDE, long }),
  updateFilteredData: (payload) => dispatch({ type: UPDATE_SEARCH, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cases);
