import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Container, CasesCard } from '../components';
import { textColor, baseUrl } from '../config';

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
  render() {
    const mapView = useRef(null);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [forceListRerender, setForceListRerender] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState(35.8617);
    const [currentLongitude, setCurrentLongitude] = useState(104.1954);

    const { route, navigation } = this.props;

    function updateSearch(searching) {
      setSearch(searching);
    }

    useEffect(() => {
      console.log(currentLatitude);
      console.log(currentLongitude);
    }, [currentLatitude, currentLongitude]);

    // filter data
    useEffect(() => {
      let newData;

      if (search.length > 0) {
        newData = data.filter((item) => {
          if (item) {
            // return item.provinceState?.includes(search) || item.countryRegion?.includes(search);
            return item;
          }
          return item;
        });
      } else {
        console.log('new Data');
        newData = data;
      }

      setFilteredData(newData);
    }, [search, data]);

    useEffect(() => {
      setForceListRerender(!forceListRerender);
    }, [filteredData]);

    function setMapLocation(latitude, longitude) {
      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      mapView.current.animateToRegion({
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

    async function getCases() {
      const caseType = route.params.case;
      const response = await fetch(`${baseUrl}/${caseType.toLowerCase()}`);

      if (response.status === 200) {
        const result = await response.json();

        setData(result, () => {
          setForceListRerender(!forceListRerender);
        });
      }
    }

    useEffect(() => {
      getCases();
    }, []);

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
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 100,
          }}
          buttonStyle={{ backgroundColor: '#00000070', padding: 12 }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <MapView
            ref={mapView}
            style={styles.map}
            // initialRegion={{
            // latitude: 35.8617,
            // longitude: 104.1954,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            // }}
            initialCamera={{
              center: {
                latitude: 35.8617,
                longitude: 104.1954,
              },
              pitch: 1,
              heading: 0,
              zoom: 1,
            }}
          />
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
};

export default Cases;
