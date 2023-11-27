import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import useStore from "../../src/components/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { nickname, password, handleLogin, setNickname, setPassword } = useStore();

  useEffect(() => {
    // Cargar los datos del usuario y contraseña almacenados al iniciar la pantalla
    loadStoredCredentials();
  }, []);

  const loadStoredCredentials = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('nickname');
      const savedPassword = await AsyncStorage.getItem('password');

      if (savedNickname !== null && savedPassword !== null) {
        setNickname(savedNickname);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.error("Error loading stored credentials", error);
    }
  };

  const handleLoginPress = () => {
    if (handleLogin) {
      handleLogin(navigation); // Asegúrate de que `handleLogin` esté definido
      // Guardar los datos del usuario y contraseña al iniciar sesión exitosamente
      saveCredentials();
    }
  };

  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('nickname', nickname);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.error("Error saving credentials", error);
    }
  };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>CineAsta</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={require('../../assets/images/cine.png')} 
                />
            </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Usuario</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setNickname(text)}
                            value={nickname}
                        />
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                    </View>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#25292e',
    },
   
    title: {
        fontSize: 24,
        marginVertical: 20,
        color: "white",
    },
    inputContainer: {
        width: "80%",
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#2DCFCB',    
    },
    input: {
        height: 40,
        borderColor: '#2DCFCB',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: "100%",
        color: "white",
    },
    button: {
        backgroundColor: '#2DCFCB',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    imageContainer: {
        margin: 30,
      },
      image: {
        width: 400,
        height: 240,
        borderRadius: 18,
        borderColor: '#2DCFCB',
        borderWidth: 2, 
    },
});
export default HomeScreen;
