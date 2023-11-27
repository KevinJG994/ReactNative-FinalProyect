import { create } from 'zustand'
import { Alert } from "react-native";

const useStore = create((set) => ({
    nickname: '',
    password: '',

    handleLogin: (navigation) => {
        const { nickname, password } = useStore.getState();
        if (useStore.getState().nickname.toLowerCase() === 'user' && useStore.getState().password.toLowerCase() === 'user') {
            if (navigation && navigation.navigate) { 
                navigation.navigate("Stack");
            }
        } else if (!useStore.getState().nickname.trim() || !useStore.getState().password.trim()) {
            Alert.alert("Error", "Debes completar todos los campos para iniciar sesión.");
        } else {
            Alert.alert("Error", "Credenciales incorrectas.");
        }
    },

    setNickname: (nickname) => set({ nickname }),
    setPassword: (password) => set({ password }),
}));

export default useStore;