import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container } from '../components';
import { textColor, primaryColor } from '../config';

const headerText = {
  fontSize: 30,
  marginBottom: 30,
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    borderRadius: 5,
    elevation: 1,
    padding: 20,
  },
  text: {
    color: textColor.normal,
    marginBottom: 5,
    fontSize: 16,
  },
  headerText,
  caseTypeText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingsContainer: [headerText, { color: textColor.alternate }],
  options: { color: textColor.secondary },
};

export default function Settings() {
  return (
    <Container>
      <View style={{ padding: 20 }}>
        <Text style={styles.settingsContainer}>Settings</Text>

        <TouchableOpacity onPress={() => { console.log('press'); }}>
          <View style={[styles.container, { backgroundColor: primaryColor }]}>
            <MaterialCommunityIcons
              name="lightbulb-on"
              color="gold"
              size={40}
            />
            <View style={{ flex: 5, padding: 10 }}>
              <Text style={styles.text}>Dark Mode</Text>
              <Text style={styles.options}>Toggle between dark and light mode</Text>
            </View>
            <MaterialCommunityIcons
              name="toggle-switch"
              color="green"
              size={40}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
