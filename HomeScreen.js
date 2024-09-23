import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userLoggedIn');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword === '') {
            Alert.alert('Error', 'Please fill new password');
            return;
        }

        try {
            const response = await axios.post('https://easybites-backend.onrender.com/api/v1/user/changePassword', {
                'email': await AsyncStorage.getItem('userEmail'),
                'password': newPassword,
            });

            if (response.status === 200) {
                if (response.data === true) {
                  Alert.alert('Password Changed!!')
                  setNewPassword('');
                } else {
                    Alert.alert('Change Password Failed');
                }
            }
        } catch (error) {
            Alert.alert(error.toString());
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userLoggedIn');
                if (!token) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        checkLoginStatus();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={setNewPassword}
                value={newPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '50%',
        padding: 15,
        marginTop: 20,
        backgroundColor: '#0066cc',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});
