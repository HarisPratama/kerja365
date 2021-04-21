import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ILEllipse2 } from '../../../../assets';
import Config from 'react-native-config';

const JobDescriptions = ({ job, user, navigation }) => {
    const [location, setLocation] = useState({})

    useEffect(() => {

        if (Object.keys(job).length > 0 && job.type === 'Fulltime') {
            axios
                .get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${job.address}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${Config.MAPS_API_KEY}`)
                .then(({ data }) => {
                    setLocation(data?.candidates[0]?.geometry);
                })
                .catch(console.log)
        }

    }, [job])


    if (Object.keys(job).length > 0) return (
        <View style={{ padding: 20 }}>
            <View>
                <Text style={styles.h3}>Job Responsibility</Text>
                <Text style={{ marginTop: 13, fontFamily: 'DMSans-Regular', fontSize: 13, textAlign: 'justify' }}>{job.jobResponsibility}</Text>
            </View>
            <View style={styles.space} />
            {job.type === 'Fulltime' ? (
                <View>
                    <Text style={styles.h3} >Job Requirements</Text>
                    {job.jobRequirments?.map((item, i) => (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <ILEllipse2 />
                            <View style={{ width: 10 }} />
                            <Text style={{ fontSize: 13, color: '#6B6969' }} >{item}</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <View>
                    <Text style={styles.h3} >Skills Requirements</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, justifyContent: 'flex-start' }} >
                        {job.jobRequirments?.map((item, i) => {
                            return (
                                <View key={i} style={{ padding: 7, marginTop: 10, borderRadius: 5, borderColor: '#FF9901', borderWidth: 1, marginRight: 5 }} >
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#FF9901' }} >{item}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            )}

            {job.type === 'Fulltime' && (
                <>
                    <View style={styles.space} />
                    <View>
                        <Text style={styles.h3} >Area</Text>
                        <Text style={{ fontSize: 13, marginTop: 15, color: '#6B6969' }} >{job.area}</Text>
                    </View>
                    <View style={styles.space} />
                    <View>

                        <Text style={styles.h3} >Address</Text>
                        <Text style={{ fontSize: 13, color: '#6B6969', marginTop: 15 }} >{job.address}</Text>
                        {location && Object.keys(location).length > 0 && (
                            <MapView style={styles.map}
                                initialRegion={{
                                    latitude: location.viewport.northeast.lat,
                                    longitude: location.viewport.northeast.lng,
                                    latitudeDelta: 0.022,
                                    longitudeDelta: 0.001,
                                }}
                                showsUserLocation={true}
                                zoomControlEnabled
                            >

                                <Marker
                                    coordinate={{
                                        latitude: location.viewport.northeast.lat,
                                        longitude: location.viewport.northeast.lng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    title={job.company_name}
                                />
                            </MapView>
                        )}
                    </View>
                </>
            )}
        </View>
    )

    return null
}

const styles = StyleSheet.create({
    space: {
        height: 33,
        width: 20
    },
    map: {
        marginTop: 20,
        width: Dimensions.get('window').width - 40,
        height: 202
    },
    h3: {
        fontFamily: 'DMSans-Bold',
        fontSize: 14
    }
})

export default JobDescriptions;
