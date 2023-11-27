import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos encontramos</Text>
      <Text style={styles.textStyle}>En el centro comercial Costanera Center</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -33.4162, 
            longitude: -70.6067, 
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: -33.4162, 
              longitude: -70.6067, 
            }}
            title="Costanera Center"
            description="Centro comercial"
          />
        </MapView>
      </View>
      <Text style={styles.textStyle}>Disfrute de nuestras salas de cine.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    color: "white",
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2DCFCB",
  },
  mapContainer: {
    width: "80%",
    height: 500, 
    borderRadius: 18,
    overflow: "hidden", 
    borderColor: '#2DCFCB',
    borderWidth: 2, 
    margin: 30,
  },
  map: {
    flex: 1,
  },
});

export default SettingsScreen;