import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ILHexagon } from '../../assets';

const VibePointsButton = ({ navigation, points }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('VibePoint')}
            style={{
                flexDirection: 'row', padding: 10, paddingVertical: 20, backgroundColor: '#FF9901', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5
            }}
        >
            <ILHexagon />
            <Text
                style={{
                    flex: 1, marginLeft: 11, color: '#ffff', fontFamily: 'DMSans-Bold', fontSize: 16
                }}
            >
                Vibe Points
            </Text>
            <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', fontSize: 16 }} >{Object.keys(points).length > 0 ? points.points : '0'}</Text>
        </TouchableOpacity>
    )
};

export default VibePointsButton;
