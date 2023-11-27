import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StackScreen = () => {
  const navigation = useNavigation();
  const [cartelera, setCartelera] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

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

  useEffect(() => {
    const loadLikedMovies = async () => {
      try {
        const storedLikedMovies = await AsyncStorage.getItem('likedMovies');
        if (storedLikedMovies) {
          setLikedMovies(JSON.parse(storedLikedMovies));
        }
      } catch (error) {
        console.error('Error loading liked movies:', error);
      }
    };

    loadLikedMovies();
  }, []);

  useEffect(() => {
    const loadSelectedMovies = async () => {
      try {
        const storedSelectedMovies = await AsyncStorage.getItem('selectedMovies');
        if (storedSelectedMovies) {
          setSelectedMovies(JSON.parse(storedSelectedMovies));
        }
      } catch (error) {
        console.error('Error loading selected movies:', error);
      }
    };

    loadSelectedMovies();
  }, []);

  const handleLike = async (index) => {
    try {
      let movies = [...likedMovies];
      if (!movies[index]) {
        movies[index] = true;
      } else {
        movies[index] = !movies[index];
      }
      await AsyncStorage.setItem('likedMovies', JSON.stringify(movies));
      setLikedMovies(movies);
    } catch (error) {
      console.error('Error saving liked movie:', error);
    }
  };

  const handleSelect = async (index) => {
    try {
      let movies = [...selectedMovies];
      if (!movies[index]) {
        movies[index] = true;
      } else {
        movies[index] = !movies[index];
      }
      await AsyncStorage.setItem('selectedMovies', JSON.stringify(movies));
      setSelectedMovies(movies);
    } catch (error) {
      console.error('Error saving selected movie:', error);
    }
  };

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  const peliculasActuales = cartelera.slice(0, 6);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Películas Disponibles</Text>
      <View style={styles.grid}>
        {peliculasActuales.map((pelicula, index) => (
          <View key={index} style={styles.gridItem}>
            <View style={styles.movieContainer}>
              <Image source={{ uri: pelicula.portada }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{pelicula.titulo}</Text>
                <Text style={styles.movieDescription}>{pelicula.descripcion}</Text>
                <View style={styles.buttonsContainer}>
                   <TouchableOpacity
                    style={[styles.button, selectedMovies[index] && styles.selectedButton]}
                    onPress={() => handleSelect(index)}
                  >
                    <Text style={[styles.buttonText, selectedMovies[index] && styles.selectedButtonText]}>Seleccionar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, likedMovies[index] && styles.likedButton]}
                    onPress={() => handleLike(index)}
                  >
                    <Icon
                      name={likedMovies[index] ? 'heart' : 'heart-o'}
                      size={20}
                      color={likedMovies[index] ? 'red' : '#fff'}
                    />
                  </TouchableOpacity>
                 
                </View>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.finalText}>¡Disfrute nuestra selección de películas!</Text>
        <TouchableOpacity style={styles.buttonLogOut} onPress={goToHomeScreen}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    margin: 50,
    alignItems: 'center',
  },
  gridItem: {
    backgroundColor: '#F0F3F4',
    width: 350,
    marginBottom: 50,
    alignItems: 'center',
    borderColor: '#2DCFCB',
    padding: 5,
    borderColor: '#2DCFCB',
    borderWidth: 3,
  },
  image: {
    width: 320,
    height: 520, 
    margin: 5,
  },

  movieTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieDescription: {
    fontSize: 14,
    textAlign: 'justify',
    color: 'black',
    margin: 10,
  },  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2DCFCB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'none',
  },
  likedButton: {
    backgroundColor: '#2DCFCB',
  },
  selectedButton: {
    backgroundColor: 'gray',
  },
  selectedButtonText: {
    textDecorationLine: 'line-through',
  },
  finalText: {
    marginVertical: 30,
    fontSize: 17,
    textAlign: 'center',
    color: '#2DCFCB',
  },
  buttonLogOut: {
    backgroundColor: '#2DCFCB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});
  
export default StackScreen;