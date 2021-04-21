import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { ILEllipse } from '../../../assets';

const DetailNews = ({navigation, route}) => {
    const { id } = route.params
    const news = useSelector(({news}) => news.News)
    const [getNewsById, setGetNewsById] = useState([]);

    useEffect(() => {
        setGetNewsById(news.filter(el => el.guid === id))
    }, [])

    const image = {uri: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'};

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#ffff'}} >
            <ImageBackground source={image} 
            style={{height: 214, resizeMode: "cover", alignItems: 'center'}}>
                <Text style={{color: '#ffff', fontFamily: 'DMSans-Regular', fontSize: 16, marginTop: 50}} >News Detail</Text>
            </ImageBackground>
            <View style={{paddingHorizontal: 20}} >
                {getNewsById && getNewsById.map((el, i) => {
                    let date = new Date(el.pubDate.split(' ')[0]).toLocaleString('id-ID', {month: 'long'})
                    return (
                        <View key={i}>
                            <Text style={{fontSize: 20, fontFamily: 'DMSans-Regular', marginTop: 15}} >{el.title}</Text>
                            <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}} >
                                <ILEllipse/>
                                <View style={{width: 9}} />
                                <Text style={{fontFamily: 'DMSans-Regular', fontSize: 12, color: '#6B6969'}} >{date}</Text>
                            </View>
                            <View style={{height: 7, marginTop: 15, backgroundColor: '#eeee', borderRadius: 50}} />
                            <View>
                                <Text style={{fontFamily: 'DMSans-Regular', marginTop: 15, fontSize: 14}} >{el.description}</Text>
                            </View>
                            <View style={{marginTop: 15, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}} >
                                <View style={{height: 1, backgroundColor: '#FF9901', flex: 1, borderRadius: 50}} />
                                <TouchableOpacity onPress={() => Linking.openURL(el.link)} >
                                    <Text style={{fontFamily: 'DMSans-Regular', color: '#FF9901'}} >Read more</Text>
                                </TouchableOpacity>
                            </View>
                                
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default DetailNews;
