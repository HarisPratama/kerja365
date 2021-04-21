import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ILBookmark, ILStar, ILUser, ILUsers } from '../../assets';

const GroupButton = ({ navigation, user }) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 10, flex: 1, justifyContent: 'space-between', borderRadius: 100, paddingHorizontal: 45, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}>
            {user.type === 'company' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('CompanyProfile')}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILUser />
                        </View>
                        <Text style={styles.title} >Profile</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'fulltimer' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('MainApp', { screen: 'Profile' })}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILUser />
                        </View>
                        <Text style={styles.title} >Profile</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'freelancer' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('MainApp', { screen: 'Profile' })}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILUser />
                        </View>
                        <Text style={styles.title} >Profile</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'company' && (
                <TouchableOpacity onPress={() => navigation.navigate('Applicant')} >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILUsers />
                        </View>
                        <Text style={styles.title} >Applicant</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'fulltimer' && (
                <TouchableOpacity onPress={() => navigation.navigate('JobApplied')} >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILStar />
                        </View>
                        <Text style={styles.title} >Applied</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'freelancer' && (
                <TouchableOpacity onPress={() => navigation.navigate('Projects')} >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILStar />
                        </View>
                        <Text style={styles.title} >Project</Text>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'company' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('BookmarkJobSeeker')}
                >
                    <View style={{ alignItems: 'center' }}>
                        <>
                            <View style={{ height: 15 }}>
                                <ILBookmark />
                            </View>
                            <Text style={styles.title} >Bookmark</Text>
                        </>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'fulltimer' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('BookmarkJobs')}
                >
                    <View style={{ alignItems: 'center' }}>
                        <>
                            <View style={{ height: 15 }}>
                                <ILBookmark />
                            </View>
                            <Text style={styles.title} >Bookmark</Text>
                        </>
                    </View>
                </TouchableOpacity>
            )}
            {user.type === 'freelancer' && (
                <TouchableOpacity onPress={() => navigation.navigate('JobApplied')} >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <ILBookmark />
                        </View>
                        <Text style={styles.title} >Job Apply</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: 'DMSans-Bold',
        marginTop: 15
    }
})

export default GroupButton;
