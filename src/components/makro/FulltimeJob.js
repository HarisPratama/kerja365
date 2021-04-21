import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import { ILSearch, ILMoreVErtical, ILSliders, ILEllipse2 } from '../../assets';
import Logo from '../../assets/img/logo.png';

const JobCard = ({ navigation, ILMoreVErtical, job, applied }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { jobId: applied ? job.jobId : job._id })} >
            <View style={styles.card} >
                <View style={styles.image} >
                    <Image source={job?.company?.photo ? { uri: job.company.photo } : Logo} style={styles.logo} />
                </View>
                <View style={{ maxWidth: 225, justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.title} >{job.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: 150 }} >
                        <Text style={styles.desc} >{job.company.user_name}</Text>
                        <ILEllipse2 />
                        <View style={{ width: 5 }} />
                        <Text style={styles.desc} >{job.type}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }}>
                    <ILMoreVErtical />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const JobsList = ({ navigation, jobs, limit, search, onPress }) => {
    const [loading, setLoading] = useState(false)

    return (
        <View style={styles.container}>
            {jobs?.length > 0 && jobs.filter(el => el.title.toLowerCase().includes(search?.toLowerCase())).slice(0, limit).map(el => {
                if (loading) {
                    return (
                        <SkeletonPlaceholder key={el._id} >
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
                    <JobCard
                        navigation={navigation}
                        ILMoreVErtical={ILMoreVErtical}
                        job={el}
                        key={el._id}
                    />
                )
            })}
            {jobs?.length > limit && (
                <TouchableOpacity onPress={onPress} style={styles.btn} >
                    <Text style={styles.btnTitle} >Show More</Text>
                </TouchableOpacity>
            )}
        </View>
    )
};

const JobCategories = ({ navigation, jobs, limit, onPress }) => {
    const initialLayout = { width: Dimensions.get('window').width };
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'All' },
        { key: 'marketing', title: 'Marketing' },
        { key: 'it', title: 'IT' },
        { key: 'admin', title: 'Admin' },
        { key: 'sales', title: 'Sales' },
        { key: 'technician', title: 'Technician' }
    ]);

    const [search, setSearch] = useState('')

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'all':
                return <JobsList
                    navigation={navigation}
                    jumpTo={jumpTo}
                    jobs={jobs}
                    limit={limit}
                    onPress={onPress}
                    search={search}
                />
            case 'marketing':
                const jobsMarketing = jobs?.filter(job => job.category === 'Marketing')
                return <JobsList
                    navigation={navigation}
                    jumpTo={jumpTo}
                    jobs={jobsMarketing}
                    limit={limit}
                    onPress={onPress}
                    search={search}
                />
            case 'it':
                const jobIt = jobs?.filter(job => job.category === 'IT')
                return <JobsList
                    navigation={navigation}
                    jumpTo={jumpTo}
                    jobs={jobIt}
                    limit={limit}
                    onPress={onPress}
                    search={search}
                />
            case 'admin':
                return <JobsList navigation={navigation} jumpTo={jumpTo} />
            case 'sales':
                const jobsSales = jobs?.filter(job => job.category === 'Sales')
                return <JobsList
                    navigation={navigation}
                    jumpTo={jumpTo}
                    jobs={jobsSales}
                    limit={limit}
                    onPress={onPress}
                    search={search}
                />
            case 'technician':
                return <JobsList navigation={navigation} jumpTo={jumpTo} />
            default:
                return null
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ height: 8, backgroundColor: '#FF9901', borderRadius: 10, marginLeft: 20 }}
            style={{ backgroundColor: 'transparent' }}
            getLabelText={({ route }) => route.title}
            scrollEnabled
            renderLabel={({ route }) => (
                <Text style={{ color: 'black', paddingHorizontal: 10, fontFamily: 'DMSans-Bold' }} >{route.title}</Text>
            )}
            tabStyle={{ width: 'auto' }}
            contentContainerStyle={{ marginLeft: 20 }}
        />
    );

    const onChangeText = (val) => {
        setSearch(val)
        if (val.length > 0) {
            navigation.navigate('SearchJob', { search: val, jobs: jobs })
            setSearch('')
        }
    }

    return (
        <View>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffff', height: 50, width: 40, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                    <ILSearch />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor='#c4c4c4'
                        style={{ backgroundColor: '#ffff', color: 'black', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                        onChangeText={onChangeText}
                        value={search}
                    />
                </View>
                <View style={{ width: 10 }} />
                <TouchableOpacity style={{ height: 52, width: 52, backgroundColor: '#FF9901', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                    <ILSliders />
                </TouchableOpacity>
            </View>
            <View style={styles.space} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    underlineStyle: {
        height: 8,
        width: 53,
        backgroundColor: '#FF9901',
        borderRadius: 10,
    },
    tabStyle: {
        borderWidth: 0
    },
    scrollStyle: {
        borderWidth: 0,
        paddingLeft: 20,
    },
    space: {
        height: 15,
        width: 15
    },
    container: {
        paddingHorizontal: 20
    },
    btn: {
        marginTop: 37,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(238, 238, 238, 0.5)',
        paddingVertical: 16,
        borderRadius: 50
    },
    btnTitle: {
        color: '#FF9901',
        fontFamily: 'DMSans-Regular',
        fontSize: 14
    },
    card: {
        borderRadius: 10,
        marginTop: 8,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25
    },
    title: {
        fontSize: 14,
        fontFamily: 'DMSans-Bold'
    },
    desc: {
        fontSize: 12,
        color: '#6B6969',
        fontFamily: 'DMSans-Bold',
        paddingRight: 5
    },
    image: {
        justifyContent: 'center'
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    }
})

export default JobCategories;
