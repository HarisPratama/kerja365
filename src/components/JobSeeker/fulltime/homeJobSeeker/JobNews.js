import React, { useState } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ILEllipse } from '../../../../assets';
import { useSelector } from 'react-redux';

const JobNews = ({ navigation }) => {
    const image = { uri: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' };

    const news = useSelector(({ news }) => news.News);
    const [loading, setLoading] = useState(false)


    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.text}>Career News</Text>
                <Text
                    onPress={() => navigation.navigate('NewsScreen')}
                    style={{ fontSize: 14, fontFamily: 'DMSans-Regular', color: '#FF9901' }}
                >
                    Read more
                </Text>
            </View>
            <View style={styles.space}></View>
            <View style={{ flex: 1 }} >
                {news && news?.slice(0, 3).map((item, i) => {
                    let date = new Date(item.pubDate.split(' ')[0]).toLocaleString('id-ID', { month: 'long' })
                    if (loading) {
                        return (
                            <SkeletonPlaceholder key={i} >
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 42 }}>
                                    <View style={{ width: 150, height: 98, borderRadius: 10 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                        )
                    }
                    return (
                        <View key={i} style={styles.card}>
                            <TouchableOpacity onPress={() => navigation.navigate('DetailNews', { id: item.guid })} style={styles.touch}>
                                <View style={styles.content}>
                                    <Text style={styles.news}>
                                        {((item.title).length > 50) ? (((item.title).substring(0, 50 - 3)) + '...') : item.title}
                                    </Text>
                                    <View style={{ height: 9 }} />
                                    <View style={styles.newsDate}>
                                        <ILEllipse />
                                        <View style={{ width: 5 }} />
                                        <Text style={styles.date} >{date.substring(0, 11) + new Date().getFullYear()}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
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

export default JobNews;
