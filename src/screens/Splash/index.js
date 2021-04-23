import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { ILHeadPhone } from '../../assets/'
import { getData } from '../../utils/localStorage';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const data = await getData('user')
            const token = await getData('token')
            if (data) {
                dispatch({ type: 'SET_USER', payload: data })
                dispatch({ type: 'SET_TOKEN', payload: token })
                console.log(data.type, "<<< data type");
                setTimeout(() => {
                    if (data?.type === 'company') {
                        navigation.replace('CompanyApp');
                    } else if (data?.type === 'freelancer' || data?.type === 'fulltimer') {
                        navigation.replace('MainApp', { screen: 'Home' })
                    } else if (data?.type === 'internal') {
                        navigation.replace('InternalApp', { screen: 'Home' })
                    }
                }, 3000)
            } else {
                setTimeout(() => {
                    navigation.replace('SignUpOptions')
                }, 3000)
            }
        })()
    }, [])

    return (
        <View style={styles.container} >
            <ILHeadPhone />
            <View style={{ height: 50 }} />
            <Text style={styles.title}>Kerja365</Text>
            <Text style={styles.slogan}>kerja , kerja terussss..</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FF9901',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        color: '#FFFF'
    },
    slogan: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFF'
    }
});

export default SplashScreen;
