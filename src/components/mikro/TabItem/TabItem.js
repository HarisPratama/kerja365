import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ILHome, ILSend, ILUser } from '../../../assets';

const TabItem = ({title, isFocused, options, onPress, onLongPress}) => {

    const Icon = () => {
        if (title === 'Home') {
            return <ILHome/>
        }
        if (title === 'Profile') {
            return <ILUser/>
        }
        if (title === 'Messages') {
            return <ILSend/>
        }
        return <ILUser/>
    }

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Icon/>
        </TouchableOpacity>
    )
}

export default TabItem;
