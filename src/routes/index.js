import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    AddPorto,
    SearchJob,
    SplashScreen,
    SignIn,
    SignUp,
    JobSeeker,
    JobDetail,
    UserProfile,
    AppliedJobs,
    BookmarkJobs,
    WorkExperience,
    Educations,
    Certification,
    NewsScreen,
    DetailNews,
    VibePoint,
    TopUp,
    Payment,
    SignUpOptions,
    AddProfile,
    AddSkill,
    HomeCompany,
    PostJob,
    ProfileApplicant,
    Projects,
    TransferPoint,
    Withdraw,
    BankAccount,
    ProjectDetail,
    ProgressReport,
    DetailReport,
    ServicesContent,
    Applicant,
    ServicesDetail,
    ProjectTarget,
    JobPosting,
    ListProject,
    AskUs,
    DetailJobseeker,
    CompanyProfile,
    ConfirmCode,
    InterestCategory,
    BookmarkJobSeeker,
    Messages,
    Chat,
    HomeInternal,
    Epayslip,
    EpayslipDetails,
    Notifications,
    Hire,
    Bpjs,
    Loan
} from '../screens';
import { BottomNavigator } from '../components'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator initialRouteName='Home' tabBar={props => <BottomNavigator {...props} />} >
            <Tab.Screen name='Profile' component={UserProfile} />
            <Tab.Screen name='Home' component={JobSeeker} />
            <Tab.Screen name='Messages' component={Messages} />
        </Tab.Navigator>
    )
}

const CompanyApp = () => {
    return (
        <Tab.Navigator initialRouteName='Home' tabBar={props => <BottomNavigator {...props} />} >
            <Tab.Screen name='Profile' component={CompanyProfile} />
            <Tab.Screen name='Home' component={HomeCompany} />
            <Tab.Screen name='Messages' component={Messages} />
        </Tab.Navigator>
    )
}

const InternalApp = () => {
    return (
        <Tab.Navigator initialRouteName='Home' tabBar={props => <BottomNavigator {...props} />} >
            <Tab.Screen name='Epayslip' component={Epayslip} />
            <Tab.Screen name='Home' component={HomeInternal} />
            <Tab.Screen name='Messages' component={Messages} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='SplashScreen'
        >
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='ConfirmCode' component={ConfirmCode} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='SignUpOptions' component={SignUpOptions} />
            <Stack.Screen name='InterestCategory' component={InterestCategory} />

            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='SearchJob' component={SearchJob} />
            <Stack.Screen name='Notifications' component={Notifications} />

            {/* fulltime */}
            <Stack.Screen name='MainApp' component={MainApp} />
            <Stack.Screen name='JobDetail' component={JobDetail} />
            <Stack.Screen name='BookmarkJobs' component={BookmarkJobs} />
            <Stack.Screen name='AddProfile' component={AddProfile} />
            <Stack.Screen name='JobApplied' component={AppliedJobs} />
            <Stack.Screen name='WorkExperience' component={WorkExperience} />
            <Stack.Screen name='Educations' component={Educations} />
            <Stack.Screen name='Certification' component={Certification} />
            <Stack.Screen name='NewsScreen' component={NewsScreen} />
            <Stack.Screen name='DetailNews' component={DetailNews} />

            {/* freelancer */}
            <Stack.Screen name='VibePoint' component={VibePoint} />
            <Stack.Screen name='AddPorto' component={AddPorto} />
            <Stack.Screen name='TopUp' component={TopUp} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='AddSkill' component={AddSkill} />
            <Stack.Screen name='Projects' component={Projects} />
            <Stack.Screen name='TransferPoint' component={TransferPoint} />
            <Stack.Screen name='Withdraw' component={Withdraw} />
            <Stack.Screen name='BankAccount' component={BankAccount} />
            <Stack.Screen name='ProjectDetail' component={ProjectDetail} />
            <Stack.Screen name='ProgressReport' component={ProgressReport} />
            <Stack.Screen name='DetailReport' component={DetailReport} />

            {/* company */}
            <Stack.Screen name='CompanyApp' component={CompanyApp} />
            <Stack.Screen name='PostJob' component={PostJob} />
            <Stack.Screen name='ProfileApplicant' component={ProfileApplicant} />
            <Stack.Screen name='ServicesContent' component={ServicesContent} />
            <Stack.Screen name='Applicant' component={Applicant} />
            <Stack.Screen name='ServicesDetail' component={ServicesDetail} />
            <Stack.Screen name='ProjectTarget' component={ProjectTarget} />
            <Stack.Screen name='JobPosting' component={JobPosting} />
            <Stack.Screen name='ListProject' component={ListProject} />
            <Stack.Screen name='AskUs' component={AskUs} />
            <Stack.Screen name='DetailJobseeker' component={DetailJobseeker} />
            <Stack.Screen name='CompanyProfile' component={CompanyProfile} />
            <Stack.Screen name="BookmarkJobSeeker" component={BookmarkJobSeeker} />
            <Stack.Screen name="Hire" component={Hire} />

            {/* Internal */}
            <Stack.Screen name='InternalApp' component={InternalApp} />
            <Stack.Screen name='Epayslip' component={Epayslip} />
            <Stack.Screen name='EpayslipDetails' component={EpayslipDetails} />
            <Stack.Screen name='Bpjs' component={Bpjs} />
            <Stack.Screen name='Loan' component={Loan} />
        </Stack.Navigator>
    )
}

export default Router
