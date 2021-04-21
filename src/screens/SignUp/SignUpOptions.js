import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, Image, Animated, StyleSheet } from 'react-native';
import { ILFulltimer, ILFreelancer, ILCompany } from '../../assets';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ImageBackground } from 'react-native';

const SignUpOptions = ({ navigation }) => {

    const [contentOffset, setContentOffset] = useState(0);
    const datas = [
        { title: 'Fulltimer', desc: 'Find Your Dream Job', image: ILFulltimer, type: 'fulltimer' },
        { title: 'Freelancer', desc: 'Find Your Dream Job', image: ILFreelancer, type: 'freelancer' },
        { title: 'Company', desc: 'Find Your Professional Jobseekers', image: ILCompany, type: 'company' }
    ]
    const BAR_SPACE = 10

    const [contents, setContents] = useState([])
    const [bars, setBars] = useState([])

    useEffect(() => {
        showMessage({
            message: 'Have an account ?',
            backgroundColor: 'rgba(52, 152, 219,0.5)',
            duration: 3000,
        })
        let contents = []
        let barArray = []

        datas.map((data, i) => {
            const content = (
                <View key={i} style={{ width: Dimensions.get('screen').width, backgroundColor: 'rgba(238, 238, 238, 0.5)' }} >
                    <View style={{ marginTop: 70 }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 30, textAlign: 'center' }} >{data.title}</Text>
                        <Text style={{ fontFamily: 'DMSans-Regular', marginTop: 15, fontSize: 20, textAlign: 'center', color: '#6B6969' }} >{data.desc}</Text>
                    </View>
                    <ImageBackground source={data.image} style={{ resizeMode: "cover", flex: 1, width: Dimensions.get('screen').width, justifyContent: 'space-between' }} >
                        <View />
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 70 }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp', { type: data.type })}
                                style={{
                                    width: 200, height: 50, borderRadius: 25, backgroundColor: '#ff9901', justifyContent: 'center', alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold' }} >Register</Text>
                            </TouchableOpacity>
                            {i.toString() === '2' && (
                                <>
                                    <Text style={{ fontFamily: 'DMSans-Regular', zIndex: 999, position: 'absolute', bottom: -33, right: 0, color: '#6b6969' }} >Finish</Text>
                                </>
                            )}
                        </View>
                    </ImageBackground>
                </View>
            )
            contents.push(content)


            const thisBar = (
                <View key={`bar${i}`} >
                    <View
                        style={[
                            styles.track,
                            {
                                width: 10,
                                marginLeft: i === 0 ? 0 : BAR_SPACE,
                            },
                        ]}
                    >
                        {i === contentOffset && (
                            <Animated.View
                                style={[
                                    styles.bar,
                                    {
                                        width: 10,
                                    },
                                ]}
                            />
                        )}
                    </View>
                </View>
            )
            barArray.push(thisBar)
        })

        setContents(contents)
        setBars(barArray)
    }, [contentOffset])

    const getCurrentPage = (index) => {
        if (index < Dimensions.get('screen').width + 10) {
            setContentOffset(0)
        }
        if (index > 0 && index < 500) {
            setContentOffset(1)
        }
        if (index > Dimensions.get('screen').width * 2 - 10) {
            setContentOffset(2)
        }
    }

    const ButtonSignIn = () => (
        <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
                padding: 10, width: 100, backgroundColor: '#ff9901', alignSelf: 'flex-end'
            }}
        >
            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 12, color: '#ffff', textAlign: 'center' }} >Login Here</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <FlashMessage titleStyle={{ fontSize: 16, alignSelf: 'flex-end', fontFamily: 'DMSans-Bold' }} position='top' renderCustomContent={() => <ButtonSignIn />} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={10}
                onScroll={e => getCurrentPage(e.nativeEvent.contentOffset.x)}
            >
                {contents}

            </ScrollView>
            <View style={styles.barContainer} >
                {bars}
            </View>
        </SafeAreaView>
    )
};

export default SignUpOptions;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        bottom: 40,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    track: {
        backgroundColor: '#ccc',
        //   overflow: 'hidden',
        height: 10,
        width: 10,
        borderRadius: 10 / 2
    },
    bar: {
        backgroundColor: '#ff9901',
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        position: 'absolute',
        left: 0,
        bottom: 0,
    }
})
