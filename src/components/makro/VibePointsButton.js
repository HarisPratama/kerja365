import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ILHexagon } from '../../assets';
import NumberFormat from 'react-number-format';

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
            {Object.keys(points).length > 0 ? (
                <NumberFormat
                    value={points.points}
                    thousandSeparator={true}
                    displayType={'text'}
                    renderText={val => (
                        <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', fontSize: 16 }} >{val}</Text>
                    )}
                />
            ) : (
                <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', fontSize: 16 }} >0</Text>
            )}
        </TouchableOpacity>
    )
};

export default VibePointsButton;
