import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ILChevrontL, ILMoreVErtical, ILSkills } from '../../../assets';
import { TabView, TabBar } from 'react-native-tab-view';

const Button = ({title}) => {
    return (
        <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 7, borderWidth: 1, borderColor: '#088E6B', borderRadius: 5}} >
            <Text style={{fontFamily: 'DMSans-Regular', color: '#088E6B', fontSize: 12}} >{title}</Text>
        </TouchableOpacity>
    )
}

const ProjectDesc = ({navigation}) => {
    const skills = ['Adobe XD', 'Figma', 'HTML', 'CSS']
    return (
        <View style={{padding: 10}} >
            <View style={{padding: 10, backgroundColor: 'rgba(238,238,238, 0.3)', paddingBottom: 79}} >
                <Text style={styles.h3} >Project Description</Text>
                <Text style={{marginTop: 13, fontFamily: 'DMSans-Regular', fontSize: 13, textAlign: 'justify'}} >
                    Seiring perkembangan jaman, social media termasuk youtube tentu sudah banyak digunakan orang baik untuk mepresentasikan dirinya sendiri maupun digunakan sebagai platform untuk menunjukkan produk atau jasa sebuah brand kepada target marketnya. Keuntungannya? Selain meminimalisir biaya, Anda juga dapat berkreasi untuk memperkenalkan produk / jasa yang dimiliki dengan kreasi konten di sosial media dan youtube. Tentu, konten yang menarik akan cenderung dapat meningkatkan ketertarikan target market sehingga mereka pun dapat engaged dengan media sosial dan youtube brand kita.
                </Text>
                <Text style={styles.h3} >Skills Requirements</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, justifyContent: 'flex-start'}} >
                    {skills?.map((item, i) => {
                        return (
                            <View key={i} style={{padding: 7, marginTop: 10, borderRadius: 5, borderColor: '#FF9901', borderWidth: 1, marginRight: 5}} >
                                <Text style={{fontFamily: 'DMSans-Regular', fontSize: 12, color: '#FF9901'}} >{item}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 22, paddingBottom: 50}} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProgressReport')}
                    style={{
                        width: 355, height: 52, backgroundColor: '#FF9901', justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}
                >
                    <Text style={{color: '#ffff', fontFamily: 'DMSans-Bold'}} >Submit report</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Company = () => {
    return (
        <View style={{padding: 20}} >
            <Text>Company</Text>
        </View>
    )
}

const initialLayout = { width: Dimensions.get('window').width };

const ProjectDetail = ({navigation}) => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Descriptions' },
        { key: 'second', title: 'Company'},
    ]);

    const renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return <ProjectDesc navigation={navigation} />
            case 'second':
                return <Company/>
            default:
                return null
        }
    }

    return (
        <>
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
                <View 
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 60, paddingHorizontal: 20, marginTop: 70}}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL/>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 16}} >Project Detail</Text>
                    </View>
                    <View></View>
                </View>
                <ScrollView 
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                    style={{flex: 1}}
                >
                    <View style={{alignItems: 'center', backgroundColor: '#ffff', paddingVertical: 20}}>
                        <ILSkills/>
                        <Text style={styles.h3} >Pembuatan Website Perusahaan</Text>
                        <Text style={{marginTop: 10, fontFamily: 'DMSans-Regular', fontSize: 12}}>Rp. 12.345.678</Text>
                        <View style={styles.space}/>
                        <Button title='on progress' />
                    </View>

                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={props => <TabBar {...props}
                        style={{flex: 1, backgroundColor: '#ffff', elevation: 0, paddingBottom: 31}}
                        inactiveColor='black'
                        activeColor='black'
                        renderLabel={({route}) => (
                            <Text style={{color: 'black', paddingHorizontal: 10, fontFamily: 'DMSans-Bold'}} >{route.title}</Text>
                        )}
                        labelStyle={{fontSize: 14, fontWeight: '700'}}
                        indicatorStyle={{backgroundColor: '#FF9901', width: 70, height: 8, borderRadius: 10, marginLeft: '12%', marginBottom: 20}}
                        />}
                    />

                </ScrollView>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 70
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 24,
    },
    h3: {
        fontSize: 14,
        marginTop: 16,
        fontFamily: 'DMSans-Bold'
    },
    paragraph: {
        textAlign: 'justify'
    },
    space: {
        height: 20,
        width: 20
    },
    scene: {
        flex: 1
    }
})

export default ProjectDetail;
