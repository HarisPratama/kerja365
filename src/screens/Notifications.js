import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse, ILMoreVErtical } from '../assets';

const Notifications = ({ navigation }) => {

    const notifications = useSelector(({ messages }) => messages.Notifications)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ffff' }}
        >
            <View style={{ paddingHorizontal: 20 }} >
                <View
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 40
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 50 }}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Notifications</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
                <View style={{ paddingBottom: 20 }} >
                    <TouchableOpacity>
                        <Text style={{ color: '#2ecc71', alignSelf: 'flex-end' }} >Mark all as read</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView style={{ padding: 20, flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                <View>
                    {notifications?.length > 0 && notifications.map(notification => (
                        <View
                            key={notification.id}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 11, backgroundColor: '#ffff' }}
                        >
                            <ILEllipse />
                            <Text>{notification.title}</Text>
                            <TouchableOpacity
                                style={{ padding: 7, borderRadius: 5, backgroundColor: '#2ecc71' }}
                            >
                                <Text style={{ fontSize: 10, color: '#ffff' }} >Mark as read</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Notifications;
