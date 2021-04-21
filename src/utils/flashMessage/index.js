import React, { useState, useRef, useEffect } from 'react';
import { Animated, Text, Dimensions } from 'react-native';


export const showMessage = (props) => {
    
}

const FlashMessage = (props) => {
    const translateY = useRef(new Animated.Value(-150)).current;

    useEffect(() => {
        if (Object.keys(props).length > 0) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                Animated.timing(translateY, {
                    toValue: -150,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            }, 3000)
        }
    }, [props])

    return (
        <Animated.View
                style={{
                    position: 'absolute', zIndex:999, top:0, left: 0, backgroundColor: 'rgba(52, 152, 219,1.0)', width: Dimensions.get('screen').width, height: 110, justifyContent: 'center', transform: [{translateY: translateY}]
                }}
            >
            <Text style={{fontFamily: 'DMSans-Bold', paddingHorizontal: 50,paddingTop: 20, color: '#ffff'}} >{props.message}</Text>
        </Animated.View>
    )
}

export default FlashMessage