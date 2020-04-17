import React from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import {
  Container, CountryCard,
} from '../components';
import { primaryColor, textColor } from '../config';
import i18n from '../translation';

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

class World extends React.PureComponent {
  render() {
    const latinAmericaCountriesList = [
      {
        country: 'Argentina',
      },
      {
        country: 'Chile',
      },
      {
        country: 'Colombia',
      },
      {
        country: 'Ecuador',
      },
      {
        country: 'Mexico',
      },
      {
        country: 'Peru',
      },
    ];
    function renderItem({ item }) {
      return (
        <CountryCard country={item.country} />
      );
    }
    return (
      <Container>
        <View style={{ marginTop: 20, paddingBottom: 100 }}>
          <Text style={styles.dailyUpdatesText}>{i18n.t('latinAmerica')}</Text>
          <FlatList
            data={latinAmericaCountriesList}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
          />
        </View>
      </Container>
    );
  }
}

export default World;
