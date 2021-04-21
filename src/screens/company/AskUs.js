import React, { useEffect, useRef, useState } from 'react';
import { Easing } from 'react-native';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { ILChevrontL, ILChevrontR, ILMoreVErtical } from '../../assets';

const AskUs = ({navigation}) => {
    const user = useSelector(({user}) => user.User)
    const translateY = useRef(new Animated.Value(-30)).current
    const opacity = useRef(new Animated.Value(0)).current
    const rotate = useRef(new Animated.Value(0)).current

    const [press, setPress] = useState(false)

    useEffect(() => {
    }, [])

    const slideIn = () => {
        setPress(true)
        Animated.spring(translateY, {
          toValue: -15,
          useNativeDriver: true
        }).start()
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }).start()
        Animated.timing(rotate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const slideOut = () => {
        setPress(false)
        Animated.spring(translateY, {
            toValue: -30,
            useNativeDriver: true
          }).start()
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
        Animated.timing(rotate, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const rotateIcon = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })

    console.log(rotate, rotateIcon);

    return (
        <SafeAreaView style={{backgroundColor: '#ffff', flex: 1}}>
            <View>
                <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-between', marginTop: 72, paddingBottom: 50}]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL/>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 16}} >Ask Us</Text>
                    </View>
                    <View></View>
                </View>
            </View>
            <ScrollView 
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                style={{backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20}}
            >
                <View style={{padding: 20}} >

                    <TouchableOpacity 
                        onPress={!press ? slideIn : slideOut}
                        style={{backgroundColor: '#ffff', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}
                    >
                        <Text style={{fontFamily: 'DMSans-Bold', maxWidth: 270}} >Bagaimana cara menggunakan layanan ini ?</Text>
                        <Animated.View style={{transform: [{rotate: rotateIcon}]}} >
                            <ILChevrontR/>
                        </Animated.View>
                    </TouchableOpacity>
                    {press && (
                        <Animated.View style={{backgroundColor: '#ffff', borderRadius: 10, padding: 20, transform: [{translateY: translateY}], zIndex: -999, opacity: opacity}} >
                            <Text>lorenipsum lorenipsum lorenipsum lorenipsum lorenipsum lorenipsum lorenipsum lorenipsum lorenipsum</Text>
                        </Animated.View>
                    )}

                    <TouchableOpacity
                        style={{backgroundColor: '#ffff', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}
                    >
                        <Text style={{fontFamily: 'DMSans-Bold', maxWidth: 270}} >Bagaimana teknis berjalannya layanan ini ?</Text>
                        <Animated.View style={{transform: [{rotate: rotateIcon}]}} >
                            <ILChevrontR/>
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{backgroundColor: '#ffff', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}
                    >
                        <Text style={{fontFamily: 'DMSans-Bold', maxWidth: 270}} >Bagaimana teknis berjalannya layanan ini ?</Text>
                        <Animated.View style={{transform: [{rotate: rotateIcon}]}} >
                            <ILChevrontR/>
                        </Animated.View>
                    </TouchableOpacity>

                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    card: {
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 25,
        marginTop: 15,
    }
});

export default AskUs;
