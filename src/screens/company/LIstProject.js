import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse2, ILFileText, ILMoreVErtical } from '../../assets';
// import { fetchProjects } from '../../store/reducer/jobPostingReducer';

const ListProject = ({ navigation }) => {
    const dispatch = useDispatch()
    const projects = useSelector(({ jobPosting }) => jobPosting.Projects)

    useEffect(() => {
        // dispatch(fetchProjects)
    }, [])

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
                <View>
                    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50 }]}>
                        <TouchableOpacity
                            style={{ width: 50 }}
                            onPress={() => navigation.goBack()}
                        >
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 16 }} >Your Project</Text>
                        </View>
                        <View style={{ width: 50 }} />
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                    style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20 }}
                >
                    <View>
                        {projects?.length === 0 && (
                            <View style={{ padding: 20, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'DMSans-Regular', maxWidth: 250, letterSpacing: 5, color: 'black' }} >You haven't any project yet</Text>
                                <View style={{ height: 50 }} />
                                <ILFileText />
                            </View>
                        )}
                        <View style={[styles.container, { marginTop: 10 }]} >
                            {projects && projects.map(project => (
                                <TouchableOpacity
                                    key={project.id}
                                    onPress={() => navigation.navigate('JobDetail', { jobId: project.id, type: project.type })}
                                    style={{ flexDirection: 'row', backgroundColor: '#ffff', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 10, marginTop: 18 }}
                                >
                                    <Image
                                        source={project.logo ? { uri: project.logo } : Logo}
                                        style={{ width: 35, height: 35 }}
                                    />
                                    <View style={{ flex: 1, maxWidth: 180 }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold' }} >{project.title}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >
                                            <ILEllipse2 style={{ marginLeft: 5 }} />
                                            <View style={{ width: 5 }} />
                                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 12, color: '#6b6969' }} >{project.type}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 5 }} >{project.applicants?.length}</Text>
                                    </View>
                                    <View>
                                        <View style={{ alignSelf: 'flex-end' }} >
                                            <ILMoreVErtical />
                                        </View>
                                        <View style={{ borderWidth: 1, marginTop: 25, borderRadius: 5, borderColor: '#088E6B' }} >
                                            <Text style={{ padding: 5, fontFamily: 'DMSans-Regular', color: '#088E6B' }} >{project.status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    card: {
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 25,
        marginTop: 15,
    }
});

export default ListProject;
