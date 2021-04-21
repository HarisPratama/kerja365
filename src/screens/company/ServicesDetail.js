import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse2, ILMoreVErtical, ILSend1, ILSkills } from '../../assets';
import { TabView, TabBar } from 'react-native-tab-view';
import Avatar from '../../assets/img/avatar.png';

const FirstRoute = ({ data, type }) => (
    <View style={{ backgroundColor: 'rgba(238,238,238, 0.3)', flex: 1, padding: 20 }} >
        <Text style={{ textAlign: 'justify', fontFamily: 'DMSans-Regular', fontSize: 13, color: '#6B6969' }} >{data?.description}</Text>
        <Text style={{ fontFamily: 'DMSans-Bold', paddingVertical: 20 }} >Ruang Lingkup Pekerjaan</Text>
        {type === 'mpo' && (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Recruitment :</Text> Perekrutan dan seleksi tenaga kerja sesuai dengan kualifikasi  yang dibutuhkan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Administration :</Text> Kontrak Kerja, Cuti, Lembur, BPJS, Penggajian, Terminasi.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Induction :</Text> Pengenalan awal pekerjaan dan perusahaan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Training & Coaching :</Text> Pelatihan dan bimbingan baik kinerja maupun perilaku kerja.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >E-payment Slip :</Text> Slip gaji secara elektronik yang mempermudah tenaga kerja.</Text>
                </View>
            </>
        )}
        {type === 'bpo' && (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Custodial Maintenance :</Text> pemeliharan semua bagian atau bidang properti secara terus menerus agar siap digunakan setiap saat.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >General Cleaning :</Text> pembersihan area kerja interior dan eksterior diluar pemeliharaan harian dengan tujuan perawatan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Garden Maintenance :</Text> pemeliharaan dan perawatan taman.</Text>
                </View>

                <View style={{ paddingVertical: 40, alignItems: 'center' }} >
                    <View style={{ width: 70, height: 8, backgroundColor: '#ff9901', borderRadius: 10 }} />
                </View>

                <View>
                    <Text style={{ fontFamily: 'DMSans-Bold' }} >Security</Text>
                    <Text style={{ textAlign: 'justify', marginTop: 15, fontFamily: 'DMSans-Regular', fontSize: 13, color: '#6B6969' }} >Jasa alih daya proses bisnis yang juga umum layanan keamanan professional. Selain membantu dalam menciptakan keamanan dan ketertiban di lingkungan perusahaan, layanan ini juga dapat memberikan perlindungan terhadap bahaya fisik yang dihadapi oleh personil maupun asset perusahaan. Oleh karena itu, satuan pengamanan dituntut untuk mampu berperan sebagai pelindung, pengayom dan pelayan Layanan keamanan professional ini dapat terwujud melalui penyediaan tenaga kerja yang handal dan tersertifikasi serta peralatan, metode dan pengawasan kerja yang baik di bawah koordinasi Kepolisian Negara Republik Indonesia.</Text>
                </View>

                <Text style={{ fontFamily: 'DMSans-Bold', paddingVertical: 20 }} >Ruang Lingkup Pekerjaan</Text>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Pengaturan : </Text>menegakkan tata tertib yang menyangkut ketertiban dan keamanan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Penjagaan :</Text> mengawasi keluar masuknya personil, kendaraan maupun keadaan atau aktivitas mencurigakan di sekitar lokasi perusahaan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Pengawalan :</Text> menghantarkan, melindungi dan mengamankan orang atau barang yang diserahkan/dipindahtangankan.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Perondaan (patroli) :</Text> mengunjungi tempat-tempat rawan untuk pengamanan secara preventif dan represif.</Text>
                </View>

                <View style={{ paddingVertical: 40, alignItems: 'center' }} >
                    <View style={{ width: 70, height: 8, backgroundColor: '#ff9901', borderRadius: 10 }} />
                </View>

                <View>
                    <Text style={{ fontFamily: 'DMSans-Bold' }} >Sales Team</Text>
                    <Text style={{ textAlign: 'justify', marginTop: 15, fontFamily: 'DMSans-Regular', fontSize: 13, color: '#6B6969' }} >Jasa alih daya proses bisnis yang paling unik dan menantang adalah mengelola tenaga penjualan. Tim penjualan yang tangguh dan produktif tentu menjadi impian setiap perusahaan. Namun seringkali kebutuhan untuk mencapai target yang ditetapkan tidak sesuai dengan alokasi waktu dan sumber daya yang dibutuhkan untuk membangun dan mengelola tim penjualan.Dalam kondisi seperti itu tentunya bantuan untuk mengelola tim penjualan sangatlah dibutuhkan. Lebih dari sekedar merekrut tenaga penjualan, kami juga mampu menyelenggarakan sistem manajemen penjualan yang mampu meningkatkan pertumbuhan penjualan sekaligus menjaga biaya penjualan dalam koridor yang bisa dipertanggungjawabkan.</Text>
                </View>

                <Text style={{ fontFamily: 'DMSans-Bold', paddingVertical: 20 }} >Ruang Lingkup Pekerjaan</Text>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Rekrutmen :</Text> tenaga kerja penjualan dengan kompensasi bersifat fixed, semi-variable, full-variable.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Manajemen Penjualan :</Text> perencanaan, organisasi, pelatihan dan bimbingan, monitoring dan evaluasi, reward & recognition.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Sistem & Fasilitas Kerja :</Text> seperti call center, sales center, mulai dari bangunan, peralatan dan sistem kerja.</Text>
                </View>
            </>
        )}
        {type === 'pa' && (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Transaksi terkait biaya tenaga kerja :</Text> pembayaran gaji, upah, honor, dan sebagainya.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >Transaksi terkait biaya aktivasi penjualan :</Text> pembayaran sewa tempat, pembelian peralatan, dan sebagainya</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, fontFamily: 'DMSans-Bold', color: '#6B6969' }} >Transaksi terkait biaya-biaya lainnya.</Text>
                </View>
            </>
        )}

        {type === 'sfo' && (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >System & Facility terkait Sales & Marketing:</Text> Sales Center, Call Center.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >IT System :</Text> Aplikasi monitoring ( Sales , Merchandiser , Absensi )</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }} >
                    <View style={{ marginTop: 5 }} >
                        <ILEllipse2 />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#6B6969', fontFamily: 'DMSans-Regular' }} ><Text style={{ fontFamily: 'DMSans-Bold' }} >System & Facility terkait Perkantoran/ Pelatihan :</Text>  Office/ Branches, Training Center</Text>
                </View>
            </>
        )}
    </View>
);

const SecondRoute = () => (
    <View style={{ backgroundColor: 'rgba(238,238,238, 0.3)', flex: 1, padding: 20 }} >
        <Text>Term</Text>
    </View>
);


const Button = ({ title, color, Icon, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                paddingVertical: 5, paddingHorizontal: 7, width: 160, height: 52, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: color, borderRadius: 5
            }}
        >
            {Icon && (
                <Icon />
            )}
            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', fontSize: 14 }} >{title}</Text>
        </TouchableOpacity>
    )
}

const initialLayout = { width: Dimensions.get('window').width };

const ServicesDetail = ({ navigation, route }) => {
    const { jobId, Icon, title, type } = route.params
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user.User)
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Descriptions' },
        { key: 'second', title: 'Terms Agreement' }
    ]);
    const loading = useSelector(({ loading }) => loading.Loading)
    useEffect(() => {
    }, [])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute
                    // data={data}
                    type={type}
                />
            case 'second':
                return <SecondRoute />
            default:
                return null
        }
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Services Detail</Text>
                    </View>
                    <View></View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false} style={{ flex: 1, backgroundColor: 'rgba(238,238,238, 0.3)', }} >
                    <View style={{ alignItems: 'center', backgroundColor: '#ffff', paddingVertical: 20 }}>
                        <Icon />
                        <Text style={styles.h3} >{title}</Text>
                    </View>
                    <View style={{ backgroundColor: '#ffff' }} >
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={props => <TabBar {...props}
                                style={{ flex: 1, backgroundColor: '#ffff', elevation: 0, paddingBottom: 31 }}
                                inactiveColor='black'
                                activeColor='black'
                                renderLabel={({ route }) => (
                                    <Text style={{ color: 'black', paddingHorizontal: 10, fontFamily: 'DMSans-Bold' }} >{route.title}</Text>
                                )}
                                labelStyle={{ fontSize: 14, fontWeight: '700' }}
                                indicatorStyle={{ backgroundColor: '#FF9901', height: 8, width: 70, borderRadius: 10, marginHorizontal: 55, marginBottom: 20 }}
                            />}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 30 }} >
                        <Button
                            title='Ask us'
                            color='#0093BA'
                            Icon={ILSend1}
                            onPress={() => navigation.navigate('AskUs')}
                        />
                        <Button
                            title='Register'
                            color='#FF9901'
                        />
                    </View>
                </ScrollView>

            </SafeAreaView>
            {loading && (
                <View style={{ flex: 1, zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' color='white' />
                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', letterSpacing: 10, marginTop: 30 }} >Loading...</Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 24,
    },
    h3: {
        fontSize: 14,
        marginTop: 16,
        fontFamily: 'DMSans-Bold'
    },
    paragraph: {
        textAlign: 'justify'
    },
    space: {
        height: 20,
        width: 20
    },
    scene: {
        flex: 1
    }
})

export default ServicesDetail;
