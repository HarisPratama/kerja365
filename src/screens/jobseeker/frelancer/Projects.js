import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse2, ILMoreVErtical } from '../../../assets';

import Logo from '../../../assets/img/logo.png';
import { fetchprojects } from '../../../store/reducer/projectReducer';

const Projects = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const projects = useSelector(({ projects }) => projects.Projects)

    useEffect(() => {
        if (token) {
            dispatch(fetchprojects(token))
        }
    }, [token])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={{ paddingHorizontal: 20, paddingBottom: 60, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text>Projects</Text>
                </View>
                <View></View>
            </View>
            <ScrollView style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                <View style={{ paddingHorizontal: 20, marginTop: 17 }} >
                    {projects && projects.map(project => (
                        <TouchableOpacity
                            key={project._id}
                            onPress={() => navigation.navigate('ProgressReport', { project: JSON.stringify(project) })}
                            style={{ flexDirection: 'row', backgroundColor: '#ffff', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 10, marginTop: 18 }}
                        >
                            <Image
                                source={{ uri: project.photo }}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            />
                            <View style={{ flex: 1, maxWidth: 180 }} >
                                <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{project.title}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#6b6969' }} >{project.company_name}</Text>
                                    <ILEllipse2 style={{ marginLeft: 5 }} />
                                </View>
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default Projects;
