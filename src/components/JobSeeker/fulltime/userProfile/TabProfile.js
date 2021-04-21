import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ILAward, ILBook, ILEdit, ILFileText, ILLoader, ILMoreVErtical } from '../../../../assets';
import { useSelector } from 'react-redux';

const Button = ({ title, onPress, type }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.button(type)} >
            {!type && (
                <Text style={styles.buttonTitle(type)} >{title}</Text>
            )}

            {type === 'edit' && (
                <ILEdit />
            )}
        </TouchableOpacity>
    )

}

const TabProfile = ({ navigation, user }) => {
    const experiences = useSelector(({ experiences }) => experiences.WorkExperinces)
    const educations = useSelector(({ educations }) => educations.Educations)
    const skills = useSelector(({ skills }) => skills.Skills)
    const certifications = useSelector(({ certifications }) => certifications.Certifications)

    const WorkExperienceList = ({ item, i, navigation }) => (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'DMSans-Bold' }} >{item.position}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{item.company}</Text>
                    <Text style={{ fontSize: 11, fontFamily: 'DMSans-Regular' }} >{item.startDate} - {item.endDate}</Text>
                </View>
                <View>
                    <Button
                        title={'Edit'}
                        type='edit'
                        onPress={() => navigation.navigate('WorkExperience', { edit: true, id: item._id })}
                    />
                </View>
            </View>
            {i < experiences?.length - 1 && (
                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEE', marginTop: 21 }} >
                </View>
            )}
        </View>
    );

    const EducationList = ({ item, i }) => (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'DMSans-Bold' }} >{item.school}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{item.major}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{item.faculty}</Text>
                    <Text style={{ fontSize: 11, fontFamily: 'DMSans-Regular' }} >{item.startDate} - {item.endDate}</Text>
                </View>
                <View>
                    <Button
                        title={'Edit'}
                        type='edit'
                        onPress={() => navigation.navigate('Educations', { edit: true, id: item._id })}
                    />
                </View>
            </View>
            {i < educations?.length - 1 && (
                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEE', marginTop: 21 }} ></View>
            )}
        </View>
    )

    const CertificationList = (({ item, navigation }) => (
        <View
            style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <View>
                <Text style={{ fontSize: 14, fontFamily: 'DMSans-Bold' }} >{item.title}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{item.institution}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{item.dateCertification}</Text>
            </View>
            <View>
                <Button
                    title={'Edit'}
                    type='edit'
                    onPress={() => navigation.navigate('Certification', { id: item._id, edit: true })}
                />
            </View>
        </View>
    ))

    return (
        <View style={{ flex: 1, padding: 20 }} >
            <View style={{ backgroundColor: '#ffff', marginTop: 14, borderRadius: 10 }}>
                <View style={styles.card} >
                    <ILFileText />
                    <Text style={styles.title} >Your Profile</Text>
                    <Button
                        title={'Add'}
                        onPress={() => navigation.navigate('AddProfile')}
                    />
                </View>
            </View>
            <View style={{ backgroundColor: '#ffff', marginTop: 14, borderRadius: 10 }}>
                <View style={styles.card}>
                    <ILLoader />
                    {user.type === 'fulltimer' ? (
                        <Text style={styles.title} >Work Experiences</Text>
                    ) : (
                        <Text style={styles.title} >Portofolio</Text>
                    )}
                    <Button
                        title={'Add'}
                        onPress={() => navigation.push('WorkExperience', { edit: false, id: null })}
                    />
                </View>
                <View>
                    {user.type === 'fulltimer' && experiences && experiences?.map((experience, i) => (
                        <WorkExperienceList
                            item={experience}
                            key={experience._id}
                            i={i}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </View>
            <View style={{ backgroundColor: '#ffff', marginTop: 14, borderRadius: 10 }}>
                <View style={styles.card} >
                    <ILBook />
                    <Text style={styles.title} >Educations</Text>
                    <Button
                        title={'Add'}
                        onPress={() => navigation.navigate('Educations', { edit: false, id: null })}
                    />
                </View>
                <View>
                    {educations && educations?.map((education, i) => (
                        <EducationList
                            item={education}
                            key={education._id}
                            i={i}
                        />
                    ))}
                </View>
            </View>
            <View style={{ backgroundColor: '#ffff', marginTop: 14, borderRadius: 10 }}>
                <View style={styles.card} >
                    <ILBook />
                    <Text style={styles.title} >Skills</Text>
                    <Button
                        title={'Add'}
                        onPress={() => navigation.navigate('AddSkill')}
                    />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, paddingHorizontal: 15 }} >
                        {skills?.length > 0 && skills.map((item) => (
                            <View key={item._id} style={{ borderWidth: 1, marginLeft: 5, marginTop: 10, borderColor: '#FF9901', borderRadius: 5, padding: 3 }} >
                                <Text style={{ fontFamily: 'DMSans-Regular', color: '#FF9901' }} >{item.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: '#ffff', marginTop: 14, borderRadius: 10 }}>
                <View style={styles.card} >
                    <ILAward />
                    <Text style={styles.title} >Certification</Text>
                    <Button
                        title={'Add'}
                        onPress={() => navigation.navigate('Certification', { id: null })}
                    />
                </View>
                <View>
                    {certifications && certifications?.map((certification) => (
                        <CertificationList
                            item={certification}
                            navigation={navigation}
                            key={certification._id}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
        paddingHorizontal: 25
    },
    button: (type) => ({
        borderWidth: 1,
        borderColor: '#FF9901',
        height: 25,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }),
    buttonTitle: (type) => ({
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        color: type === 'edit' ? '#eeee' : '#FF9901'
    })
})

export default TabProfile;
