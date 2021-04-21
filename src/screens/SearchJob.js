import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ILChevrontL, ILMoreVErtical, ILSearch, ILSliders } from '../assets';
import { JobCard } from '../components';

const SearchJob = ({ navigation, route }) => {
    let { search, jobs } = route.params

    const [newSearch, setSearch] = useState('')

    useEffect(() => {
        if (newSearch.length > 1) {
            setSearch(newSearch)
            search = ''
        }

        setSearch(search)
    }, [])

    return (
        <SafeAreaView
            style={{ backgroundColor: '#ffff', flex: 1 }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16 }} >Search Jobs</Text>
                </View>
                <View></View>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffff', height: 50, width: 40, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                    <ILSearch />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='#c4c4c4'
                        style={{ backgroundColor: '#ffff', color: 'black', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                        onChangeText={val => setSearch(val)}
                        value={newSearch}
                    />
                </View>
                <View style={{ width: 10 }} />
                <TouchableOpacity style={{ height: 52, width: 52, backgroundColor: '#FF9901', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                    <ILSliders />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 20, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
            >
                <View
                    style={{ padding: 20 }}
                >
                    {jobs && jobs.filter(el => el.title.toLowerCase().includes(newSearch?.toLowerCase())).map(job => (
                        <JobCard
                            key={job._id}
                            navigation={navigation}
                            ILMoreVErtical={ILMoreVErtical}
                            job={job}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default SearchJob;
