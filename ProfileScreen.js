import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Image, Text, Switch, Linking, Alert, Share, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useEffect, useState} from 'react';
import * as MailComposer from 'expo-mail-composer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const toggleFingerprintSwitch = () => {
        setIsFingerprintEnabled(previousState => !previousState);
        AsyncStorage.setItem('fingerprint', JSON.stringify(!isFingerprintEnabled));
    }
    const toggleNotificationSwitch = () => {
        setIsNotificationEnabled(previousState => !previousState);
        AsyncStorage.setItem('notification', JSON.stringify(!isNotificationEnabled));
    }

    const [user, setUser] = useState();
    const userId = "UXQ4Lp1K1bbFSljIoNrmjpg4gpL2";

    useEffect(() => {
        AsyncStorage.getItem('fingerprint').then(value => {
                setIsFingerprintEnabled(value === 'true');
            }
        );
        AsyncStorage.getItem('notification').then(value => {
                setIsNotificationEnabled(value === 'true');
            }
        );

        const subscriber = firestore()
            .collection('Users')
            .doc(userId)
            .onSnapshot(documentSnapshot => {
                setUser(documentSnapshot.data());
            });

        return () => subscriber();
    }, []);

    const sendSupportEmail = async () => {
        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (isAvailable) {
                MailComposer.composeAsync({
                    recipients: ['lakshaybomotra00@gmail.com'],
                    subject: 'Support Request',
                    body: 'Hello, I am facing some issues with the app. Please help me out.',
                });
            } else {
                Alert.alert('Error', 'Mail client is not available');
            }
        } catch (e) {
            Alert.alert('Error', e.message);
        }
    };

    const shareApp = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this app! https://landing.flycricket.io/bazinga/9de78df1-c2a3-4b60-a033-cd6cab92cc6b/',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const openTerms = () => {
        const url = 'https://doc-hosting.flycricket.io/bazinga-privacy-policy/977c683e-5457-4457-8539-3c311e501e34/privacy';
        Linking.openURL(url).catch(err => Alert.alert('Error', err.message));
    };

    const logout = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#FBADB4","#EB6A9F"]}
                    style={styles.profile} >
                    <Image
                        source={{uri: user?.image ? user.image : 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login'}}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileText}>{user?.name}</Text>
                    <Text style={styles.profileText}>{user?.email}</Text>
                </LinearGradient>
                <Text style={styles.text}>General</Text>
                <View style={styles.generalItem}>
                    <Text style={styles.itemText}>Fingerprint</Text>
                    <Switch
                        trackColor={{false: '#CF414B', true: '#81b0ff'}}
                        thumbColor={isFingerprintEnabled ? '#4CAF50' : '#ffffff'}
                        onValueChange={toggleFingerprintSwitch}
                        value={isFingerprintEnabled}
                    />
                </View>
                <View style={styles.line}></View>
                <View style={styles.generalItem}>
                    <Text style={styles.itemText}>Change Passcode</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.generalItem}>
                    <Text style={styles.itemText}>Notifications</Text>
                    <Switch
                        trackColor={{false: '#CF414B', true: '#81b0ff'}}
                        thumbColor={isNotificationEnabled ? '#4CAF50' : '#ffffff'}
                        onValueChange={toggleNotificationSwitch}
                        value={isNotificationEnabled}
                    />
                </View>
            </View>
            <View style={styles.others}>
                <Text style={styles.text}>Others</Text>
                <View style={styles.generalItem} >
                    <Text style={styles.itemText}>Rate the app</Text>
                    <Image
                        source={require('./assets/ic_rating.png')}
                        style={styles.itemImage}
                    />
                </View>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.generalItem} onPress={sendSupportEmail}>
                    <Text style={styles.itemText}>Support</Text>
                    <Image
                        source={require('./assets/ic_support.png')}
                        style={styles.itemImage}
                    />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.generalItem} onPress={shareApp}>
                    <Text style={styles.itemText}>Share</Text>
                    <Image
                        source={require('./assets/ic_share.png')}
                        style={styles.itemImage}
                    />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.generalItem} onPress={openTerms}>
                    <Text style={styles.itemText}>Terms and Policy</Text>
                    <Image
                        source={require('./assets/ic_policy.png')}
                        style={styles.itemImage}
                    />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.generalItem} onPress={logout}>
                    <Text style={styles.itemText}>Logout</Text>
                    <Image
                        source={require('./assets/ic_logout.png')}
                        style={styles.itemImage}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#F7F8FE',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 60
    },
    header: {
        elevation: 4,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    profile: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 500
    },
    profileText: {
        marginTop: 4,
        fontSize: 18,
        color: "#fff"
    },
    text: {
        padding: 4,
        justifyContent: 'center'
    },
    generalItem: {
        height: 50,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 22
    },
    line: {
        height: 1,
        backgroundColor: "#CBCBCB",
        marginHorizontal: 8
    },
    others: {
        elevation: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 10
    },
    itemImage: {
        width: 30,
        height: 30,
    }
});
