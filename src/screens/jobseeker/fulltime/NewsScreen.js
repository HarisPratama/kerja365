import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ILChevrontL, ILEllipse } from '../../../assets';
import { useSelector } from 'react-redux';


const NewsScreen = ({navigation}) => {
    const news = useSelector(({news}) => news.News);

    const image = {uri: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'};

    return (
        <SafeAreaView style={{backgroundColor: '#FFFF', flex: 1}} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFF', marginTop: 72, paddingBottom: 50, paddingHorizontal: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL/>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 16}} >Career News</Text>
                </View>
                <View></View>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{paddingHorizontal: 20, backgroundColor: 'rgba(238, 238, 238, 0.3)'}}
            >
                <View>
                {news && news?.map((item, i) =>  {
                    let date = new Date(item.pubDate.split(' ')[0]).toLocaleString('id-ID', {month: 'long'})

                    return (
                        <View key={i} style={styles.card}>
                            <TouchableOpacity onPress={() => navigation.navigate('DetailNews', {id: item.guid})} style={styles.touch}>
                                <View>
                                    <Image style={styles.img} source={image}/>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.news}>
                                        { ((item.title).length > 50) ? (((item.title).substring(0,50-3)) + '...') : item.title }
                                    </Text>
                                    <View style={{height: 9}} />
                                    <View style={styles.newsDate}>
                                        <ILEllipse/>
                                        <View style={{width: 5}} />
                                        <Text style={styles.date} >{date.substring(0, 11) + new Date().getFullYear()}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 42
    },
    space: {
        height: 17
    },
    text: {
        fontFamily: 'DMSans-Bold',
        fontSize: 14
    },
    card: {
        paddingVertical: 8, 
        borderRadius: 10, 
        paddingHorizontal: 7, 
        backgroundColor: '#ffff',
        marginTop: 17
    },
    touch: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img: {
        width: 150, 
        height: 98, 
        borderRadius: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 11
    },
    news: {
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        maxWidth: 200
    },
    newsDate: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    date: {
        fontSize: 10,
        color: '#6B6969',
        fontFamily: 'DMSans-Regular'
    }
})

export default NewsScreen;
