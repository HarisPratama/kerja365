import React from 'react';
import { Text, View, Dimensions, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILXsvg } from '../../assets';

const SettingModal = ({ navigation, translateX, setOpacity }) => {

    const logout = () => {
        AsyncStorage.clear()
        navigation.replace('SignIn')
    }

    const closeSetting = () => {
        Animated.timing(translateX, {
            toValue: Dimensions.get('window').width,
            duration: 500,
            useNativeDriver: true
        }).start()
        setTimeout(() => {
            setOpacity(false)
        }, 400)
    }

    return (
        <View style={styles.seting} >
            <Animated.View
                style={{
                    width: Dimensions.get('screen').width - 170, backgroundColor: 'white', position: 'absolute', right: 0, flex: 1, height: '100%', transform: [{ translateX: translateX }]
                }}
            >
                <View style={{ paddingHorizontal: 40, paddingVertical: 60 }}>
                    <View>
                        <TouchableOpacity
                            onPress={closeSetting}
                            style={{
                                backgroundColor: 'rgba(238, 238, 238, 0.5)', alignSelf: 'flex-end', width: 30, height: 30, justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <ILXsvg />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={logout} >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    seting: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: Dimensions.get('screen').height,
        width: '100%',
        right: 0,
        top: 0
    }
})

export default SettingModal;
