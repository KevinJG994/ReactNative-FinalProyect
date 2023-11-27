import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import app from '../components/firebaseConfig';

const CarteleraScreen = () => {
  const [cartelera, setCartelera] = useState([]);

  useEffect(() => {
    const fetchCartelera = async () => {
      try {
        const response = await fetch('https://cineasta-48ac5-default-rtdb.europe-west1.firebasedatabase.app/cartelera.json');
        const data = await response.json();
        
        if (data) {
          setCartelera(Object.values(data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCartelera();
  }, []);
  
  const peliculasActuales = cartelera.slice(0, 6);
  const proximosEstrenos = cartelera.slice(6);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Películas Disponibles</Text>
      <View style={styles.grid}>
        {peliculasActuales.map((pelicula, index) => (
               <View key={index} style={styles.gridItem}>
               <Image source={{ uri: pelicula.portada}} style={styles.image} />
               <Text style={styles.movieTitle}>{pelicula.titulo}</Text>
   
             </View>
           ))}
         </View>

      <Text style={styles.titleText}>Próximos Estrenos</Text>
      <View style={styles.grid}>
        {proximosEstrenos.map((pelicula, index) => (
              <View key={index} style={styles.gridItem}>
              <Image source={{ uri: pelicula.portada}} style={styles.image} />
              <Text style={styles.movieTitle}>{pelicula.titulo}</Text>
    
            </View>
          ))}
        </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 25,
    color: '#2DCFCB',
    marginTop: 30,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  gridItem: {
    backgroundColor: '#F0F3F4',
    width: 170,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#2DCFCB',
    padding: 5,
    borderColor: '#2DCFCB',
    borderWidth: 3,
    borderRadius: 5,
  },
  image: {
    width: 150,
    height: 250, 
  },
  movieTitle: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',

    textAlign: 'center',
  },
});

export default CarteleraScreen;