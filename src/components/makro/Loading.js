import React from 'react';
import { Text, View, ActivityIndicator, Dimensions } from 'react-native';

const Loading = () => {
    return (
        <View style={{flex: 1,zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center'}} >
            <ActivityIndicator size='large' color='white' />
            <Text style={{color: '#ffff', fontFamily: 'DMSans-Bold', letterSpacing: 10, marginTop: 30}} >Loading...</Text>
        </View>
    )
};

export default Loading;
