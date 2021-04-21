import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { ILChevrontL, ILEllipse2, ILLayers, ILMessageCircle, ILMoreVErtical, ILPaperclip } from '../../../assets';
import Logo from '../../../assets/img/logo.png';

const Badge = ({status}) => {
    if (status === 'Approve') {
        return (
            <View
                style={{padding: 7, backgroundColor: '#088E6B', borderRadius: 5}}
            >
                <Text style={{fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12}} >{status}</Text>
            </View>
        )
    }

    if (status === 'On review') {
        return (
            <View
                style={{padding: 7, backgroundColor: '#EA2027', borderRadius: 5}}
            >
                <Text style={{fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12}} >{status}</Text>
            </View>
        )
    }

    if (status === 'Report') {
        return (
            <View
                style={{padding: 7, backgroundColor: '#FF9901', borderRadius: 5}}
            >
                <Text style={{fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12}} >{status}</Text>
            </View>
        )
    }

    return null
}

const ProgressReport = ({navigation}) => {

    const progress = [
        {id: 1, date: new Date(2021, 2, 1).toDateString(), desc: 'Pembuatan mockup design', status: 'Approve'},
        {id: 2, date: new Date(2021, 2, 2).toDateString(), desc: 'Pembuatan versi HTML', status: 'On review'},
        {id: 3, date: new Date(2021, 2, 3).toDateString(), desc: 'Testing online', status: 'Report'}
    ]

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}} >
            <View
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50, paddingHorizontal: 20, marginTop: 70}}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL/>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 16}} >Progress Report</Text>
                </View>
                <View></View>
            </View>
            <View style={{backgroundColor: '#ffff',paddingBottom: 30}} >
                    <View
                            style={{
                                borderRadius: 10, marginTop: 8, backgroundColor: '#ffff', padding: 20
                            }} 
                        >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                                <View style={{justifyContent: 'center'}} >
                                    <Image source={Logo} style={{width: 40, height: 40, borderRadius: 40 / 2}} />
                                </View>
                                <View style={{justifyContent: 'center', marginLeft: 23, flex: 1}}>
                                    <Text style={{fontSize: 14,fontFamily: 'DMSans-Bold', maxWidth: 225}} >Pembuatan Website Perusahaan</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: 150}} >
                                        <Text 
                                            style={{
                                                fontSize: 12,color: '#6B6969',fontFamily: 'DMSans-Bold',paddingRight: 5}} 
                                        >
                                            Skills.id
                                        </Text>
                                        <ILEllipse2/>
                                        <View style={{width: 5}} />
                                        <Text 
                                            style={{
                                                fontSize: 12,color: '#6B6969',fontFamily: 'DMSans-Bold',paddingRight: 5}}
                                            >Freelance</Text>
                                    </View>
                                </View>
                                <View style={{borderWidth: 1, borderColor: '#088E6B',padding: 5, borderRadius: 5 }}>
                                    <Text style={{fontFamily: 'DMSans-Regular', color: '#088E6B', fontSize: 12}} >on progress</Text>
                                </View>
                            </View>
                        </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center'}} >
                        <Text style={{fontFamily: 'DMSans-Bold'}} >History report</Text>
                        <View style={{height: 8, borderRadius: 10, width: '70%', backgroundColor: '#FF9901'}} />
                    </View>
                </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: 'rgba(238, 238, 238, 0.3)'}}
            >
                <View style={{padding: 20}} >
                    <View style={{flexDirection: 'row'}} >
                        <View style={{maxWidth: 30}} >
                            <Text style={{fontFamily: 'DMSans-Bold', fontSize: 16}} >27</Text>
                            <Text style={{fontFamily: 'DMSans-Regular', fontSize: 15}} >Feb</Text>
                            <Text style={{fontFamily: 'DMSans-Regular', fontSize: 12}} >2021</Text>
                        </View>
                        <View style={{marginLeft: 9, alignItems: 'center'}} >
                            <View style={{width: 15, height: 15, borderWidth: 3, borderColor: '#088E6B', borderRadius: 15/2}} />
                            <View style={{width: 2, flex: 1, backgroundColor: '#c4c4c4'}}  />
                        </View>
                        <View style={{flex: 1, paddingBottom: 20}} >
                            <View style={{marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20}} >
                                <Text>Project Start</Text>
                            </View>
                        </View>
                    </View>

                    {/* Progress */}
                    {progress && progress.map(item => {
                        return (
                        <View key={item.id} style={{flexDirection: 'row'}} >
                            <View style={{maxWidth: 30}} >
                                <Text style={{fontFamily: 'DMSans-Bold', fontSize: 16}} >{item.date.substring(8,11)}</Text>
                                <Text style={{fontFamily: 'DMSans-Regular', fontSize: 15}} >{item.date.substring(4,8)}</Text>
                                <Text style={{fontFamily: 'DMSans-Regular', fontSize: 12}} >{item.date.substring(11, 16)}</Text>
                            </View>
                            <View style={{marginLeft: 9, alignItems: 'center'}} >
                                <View style={{width: 15, height: 15, borderWidth: 3, borderColor: '#FF9901', borderRadius: 15/2}} />
                                <View style={{width: 2, flex: 1, backgroundColor: '#c4c4c4'}}  />
                            </View>
                            <View style={{flex: 1, paddingBottom: 20}} >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('DetailReport', {status: item.status.toLowerCase()})}
                                    style={{
                                        marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20
                                    }} 
                                >
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                                        <View>
                                            <Text style={{fontFamily: 'DMSans-Bold'}} >Staging {item.id}</Text>
                                            <Text style={{fontFamily: 'DMSans-Regular', maxWidth: 200, marginTop: 9}} >{item.desc}</Text>
                                        </View>
                                        <TouchableOpacity style={{marginTop: -10}} >
                                            <ILMoreVErtical/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40}} >
                                        <View style={{flexDirection: 'row', alignItems: 'center',}} >
                                            <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                                <ILPaperclip/>
                                                <Text style={{fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94'}} >1</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}} >
                                                <ILMessageCircle/>
                                                <Text style={{fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94'}} >1</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}} >
                                                <ILLayers/>
                                                <Text style={{fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94'}} >1</Text>
                                            </View>
                                        </View>
                                        <View>
                                        <Badge 
                                            status={item.status} 
                                        />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )})}
                    {/* End progress */}

                    {/* Project Done */}
                    <View style={{flexDirection: 'row'}} >
                        <View style={{maxWidth: 30, paddingBottom: 20}} >
                            <Text style={{fontFamily: 'DMSans-Bold', fontSize: 16}} >04</Text>
                            <Text style={{fontFamily: 'DMSans-Regular', fontSize: 15}} >Mar</Text>
                            <Text style={{fontFamily: 'DMSans-Regular', fontSize: 12}} >2021</Text>
                        </View>
                        <View style={{marginLeft: 9, alignItems: 'center'}} >
                            <View style={{width: 15, height: 15, borderWidth: 3, borderColor: '#088E6B', borderRadius: 15/2}} />
                        </View>
                        <View style={{flex: 1,}} >
                            <View style={{marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20}} >
                                <Text>Project Done</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ProgressReport;
