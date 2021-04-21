import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Button = ({type, title, Icon, width, height, color, onPress}) => {
    function onpress(onPress) {
        return onPress()
    }

    if (type === 'submit-form') {
        return (
            <TouchableOpacity 
                style={styles.btnSubmit} onPress={() => onpress(onPress)} 
            >
                <Text style={styles.btnSubmitTitle} >{title}</Text>
            </TouchableOpacity>
        )
    }

    if (type === 'load') {
        return (
            <TouchableOpacity style={{width: width, height: height, backgroundColor: '#FF9901', justifyContent: 'center', alignItems: 'center', borderRadius: 25}} >
                <Text style={{fontSize: 14, fontFamily: 'DMSans-Bold', color: '#ffff'}} >{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity onPress={() => onpress(onPress)} style={styles.container(type, width, height)}>
            
            {title && type !== 'edit' && (
                <Text style={styles.text(type)} >{title}</Text>
            )}

            {Icon && type !== 'edit' && (
                <Icon/>
            )}
            

            {type === 'edit' && (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5}}>
                    <Icon/>
                    <View style={{width: 7}} />
                    <Text style={styles.text(type, color)} >{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (type, width, height) =>  ({
        backgroundColor: type === 'submit' || type === 'load' ? '#FF9901' : 'transparent',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: !type || type === 'edit' ? 5 : 11,
        borderWidth: !type || type === 'edit' ? 1 : 0,
        borderColor: type === 'edit' ? '#FF9901' : '#C4C4C4',
        width: width,
        height: height,
        justifyContent: 'center', 
        alignItems: 'center'
    }),
    text: (type, color) => ({
        textAlign: 'center',
        color: type === 'submit' || type === 'load' ? 'white' : color,
        fontWeight:!type ? '400' : '700',
        fontSize:!type ? 12 : 14,
        fontFamily: 'DMSans-Regular'
    }),
    btnSubmit: {
        width: 200, 
        height: 50, 
        backgroundColor: '#FF9901', 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    btnSubmitTitle: {
        fontFamily: 'DMSans-Bold', 
        fontSize: 14, 
        color: '#ffff'
    }
});

export default Button;