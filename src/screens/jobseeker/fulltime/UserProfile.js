import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Profile } from '../../../components';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TabProfile } from '../../../components';
import { ILXsvg } from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkExperiences } from '../../../store/reducer/workExperienceRedux';
import { fetchEducations } from '../../../store/reducer/educationReducer';
import { fetchCertifications } from '../../../store/reducer/certificationReducer';
import { fetchSkills } from '../../../store/reducer/skillsReducer';

const SecondRoute = () => (
    <View style={{ backgroundColor: '#EEEE', flex: 1, padding: 20 }} >
        <Text>TAb 2</Text>
    </View>
);


const initialLayout = { width: Dimensions.get('window').width };

const UserProfile = ({ navigation }) => {
    const dispatch = useDispatch()

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Profile' },
        { key: 'second', title: 'Activity' },
    ]);
    const [opacity, setOpacity] = useState(false)

    const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current

    useEffect(() => {
        if (token) {
            dispatch(fetchWorkExperiences(token))
            dispatch(fetchEducations(token))
            dispatch(fetchCertifications(token))
            dispatch(fetchSkills(token))
        }
    }, [dispatch, token])

    const renderScene = SceneMap({
        first: () => <TabProfile
            navigation={navigation}
            user={user}
        />,
        second: SecondRoute
    });

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
        <>
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }} >
                <FlashMessage position='top' />
                <ScrollView
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                    style={{ backgroundColor: 'rgba(238,238,238,0.3)', flex: 1 }}
                >
                    <Profile
                        styles={styles}
                        navigation={navigation}
                        translateX={translateX}
                        user={user}
                        setOpacity={setOpacity}
                    />
                    <View>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={props => <TabBar {...props}
                                style={{ backgroundColor: '#ffff', elevation: 0 }}
                                inactiveColor='black'
                                activeColor='black'
                                indicatorStyle={{ backgroundColor: '#FF9901', width: 70, height: 8, borderRadius: 10, marginLeft: '12%' }}
                                labelStyle={{ fontSize: 14, fontWeight: '700' }}
                                renderLabel={({ route }) => (
                                    <Text style={{ color: 'black', paddingHorizontal: 10, fontFamily: 'DMSans-Bold' }} >{route.title}</Text>
                                )}
                            />}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            {opacity && (
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
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 14
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
        paddingHorizontal: 25
    },
    button: {
        borderWidth: 2,
        borderColor: '#FF9901',
        height: 25,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FF9901'
    },
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

export default UserProfile;
