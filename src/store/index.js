import { combineReducers, applyMiddleware, createStore } from 'redux';
import {
    workExperienceRedux,
    educationReducer,
    certificationReducer,
    jobAppliedReducer,
    jobBookmarkReducer,
    newsReducer,
    loadingReducer,
    jobsReducer,
    skillsReducer,
    userReducer,
    projectTarget,
    jobPostingReducer,
    applicantReducer,
    jobseekerBookmarks,
    chattingReducer,
    messageReducer,
    vibePointReducer,
    transactionReducer,
    bankAccountReducer
} from './reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    experiences: workExperienceRedux,
    educations: educationReducer,
    certifications: certificationReducer,
    applications: jobAppliedReducer,
    bookmarks: jobBookmarkReducer,
    news: newsReducer,
    loading: loadingReducer,
    jobs: jobsReducer,
    skills: skillsReducer,
    user: userReducer,
    targets: projectTarget,
    jobPosting: jobPostingReducer,
    applicants: applicantReducer,
    jobseekerBookmarks: jobseekerBookmarks,
    chattings: chattingReducer,
    messages: messageReducer,
    points: vibePointReducer,
    transactions: transactionReducer,
    bankAccounts: bankAccountReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
