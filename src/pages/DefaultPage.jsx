import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Platform,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MobileRegisterScreen } from './MobileRegisterScreen';
import { OtpVerifyScreen } from './OtpVerifyScreen';
import { LocationSelectionScreen } from './LocationSelectionScreen';
import { SHGAndMemberSelectionScreen } from './SHGAndMemberSelectionScreen';
import { ProfileConfirmationScreen } from './ProfileConfirmationScreen';
import { ApplicationFormScreen } from './ApplicationFormScreen';
import { DocumentUploadScreen } from './DocumentUploadScreen';
import { DraftListScreen } from './DraftListScreen';
import { BottomNav } from './BottomNav';
import { ApplicationDetailsScreen } from "./ApplicationDetailsScreen";
import Back1 from '../assets/images/back1.png';
import Button from '../compnents/SharedUIComp/Button';

import BGImage from '../assets/images/bg.png';
const translations = {
    en: {
        // Existing
        beneficiaryRegistration: "Beneficiary Registration",
        registerMobile: "Register with Mobile Number",
        registerDescription:
            "Enter your active mobile number to create your account.",
        primaryMobileNumber: "Primary Mobile Number",
        otpMessage: "OTP will be sent via SMS to this number.",
        consent:
            "I hereby consent to share my mobile data for financial verification under Mahila Credit Card Yojana guidelines.",
        sendOtp: "Send OTP",
        note: "Note",
        noteDescription:
            "Only one active applicant profile can be linked per mobile number.",

        // New
        back: "Back",
        welcomeBeneficiary: "Welcome Beneficiary",
        verifiedMobile: "Verified Mobile",
        chooseAction: "Choose an action below to proceed.",
        savedDraft: "Saved Draft Application",
        incompleteApplication: "Incomplete Application Form",
        name: "Name",
        enterprise: "Enterprise",
        notSpecified: "Not Specified",
        step: "Step",
        of: "of",
        resume: "Resume",
        fillNewApplication: "Fill New Application Form",
        fillNewApplicationDesc:
            "Start a fresh Mahila Credit Card application pipeline",
        viewApplicationStatus: "View Application Status",
        viewApplicationStatusDesc:
            "Check verification pipeline status of your submitted forms",
        liveStatusTracker: "Live Status Tracker",
        underReview: "Under BMM Review",
        application: "Application",
        district: "District",
        block: "Block",
        requestedLimit: "Requested Limit",
        submittedOn: "Submitted on",
        noForms: "No Forms Filled Yet",
        noFormsDesc:
            "Please complete mobile verification first to view your application status.",
        verificationSuccessful: "Verification Successful!",
        applicationSubmitted: "Application Submitted Successfully! 🎉",
        applicationSubmittedDesc:
            "Your Mahila Credit Card application has been locked and forwarded to BMM review.",
        viewStatus: "View Status",
        notice: "Notice",
        loginFirst:
            "Please login with your mobile number first to view drafts.",
    },

    hi: {
        // Existing
        beneficiaryRegistration: "लाभार्थी पंजीकरण",
        registerMobile: "मोबाइल नंबर से पंजीकरण करें",
        registerDescription: "अपना सक्रिय मोबाइल नंबर दर्ज करें।",
        primaryMobileNumber: "प्राथमिक मोबाइल नंबर",
        otpMessage: "इस नंबर पर एसएमएस द्वारा ओटीपी भेजा जाएगा।",
        consent:
            "मैं महिला क्रेडिट कार्ड योजना के अंतर्गत अपने मोबाइल डेटा साझा करने की सहमति देता/देती हूँ।",
        sendOtp: "ओटीपी भेजें",
        note: "नोट",
        noteDescription:
            "प्रत्येक मोबाइल नंबर पर केवल एक सक्रिय आवेदक प्रोफ़ाइल की अनुमति है।",

        // New
        back: "वापस",
        welcomeBeneficiary: "स्वागत है लाभार्थी",
        verifiedMobile: "सत्यापित मोबाइल",
        chooseAction: "आगे बढ़ने के लिए नीचे दिए गए विकल्प चुनें।",
        savedDraft: "सहेजा गया ड्राफ्ट आवेदन",
        incompleteApplication: "अधूरा आवेदन",
        name: "नाम",
        enterprise: "उद्यम",
        notSpecified: "निर्दिष्ट नहीं",
        step: "चरण",
        of: "में से",
        resume: "जारी रखें",
        fillNewApplication: "नया आवेदन भरें",
        fillNewApplicationDesc:
            "महिला क्रेडिट कार्ड योजना के लिए नया आवेदन प्रारम्भ करें।",
        viewApplicationStatus: "आवेदन की स्थिति देखें",
        viewApplicationStatusDesc:
            "अपने आवेदन की स्थिति देखें।",
        liveStatusTracker: "आवेदन स्थिति",
        underReview: "BMM समीक्षा में",
        application: "आवेदन",
        district: "जिला",
        block: "ब्लॉक",
        requestedLimit: "मांगी गई राशि",
        submittedOn: "जमा करने की तिथि",
        noForms: "कोई आवेदन उपलब्ध नहीं",
        noFormsDesc:
            "कृपया पहले मोबाइल सत्यापन पूरा करें।",
        verificationSuccessful: "सत्यापन सफल!",
        applicationSubmitted: "आवेदन सफलतापूर्वक जमा हुआ! 🎉",
        applicationSubmittedDesc:
            "आपका आवेदन BMM समीक्षा हेतु भेज दिया गया है।",
        viewStatus: "स्थिति देखें",
        notice: "सूचना",
        loginFirst:
            "ड्राफ्ट देखने के लिए पहले मोबाइल नंबर से लॉगिन करें।",
    },
};

// const FONT_FAMILY = 'NotoSansDevanagari';

export default function DefaultPage({ language }) {

    const [activeTab, setActiveTab] = useState('register');
    const [authStep, setAuthStep] = useState('mobile');
    const [registeredMobile, setRegisteredMobile] = useState('');
    const [userType, setUserType] = useState('NORMAL');
    const [locationData, setLocationData] = useState({});
    const [shgMemberData, setShgMemberData] = useState({});
    const [savedDraft, setSavedDraft] = useState(null);
    const [submittedApplications, setSubmittedApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const t = translations[language || "en"];




    const handleOtpVerified = async (data) => {
        const { mobile, userType } = data;

        setRegisteredMobile(mobile);
        setUserType(userType);

        try {
            const storedDraft = await AsyncStorage.getItem(`@draft_form_${mobile}`);

            if (storedDraft) {
                setSavedDraft(JSON.parse(storedDraft));
            } else {
                setSavedDraft(null);
            }
        } catch (e) {
            console.error('Failed to load draft from storage', e);
        }

        Alert.alert(
            'Verification Successful!',
            `Mobile ${mobile} is verified successfully.`,
        );

        if (userType === 'SPECIAL') {
            setAuthStep('location');
        } else {
            setAuthStep('action-choice');
        }
    };

    const handleOtpSent = (mobileNumber) => {
        setRegisteredMobile(mobileNumber);
        setAuthStep('otp');
    };

    const handleBackToMobile = () => {
        setAuthStep('mobile');
    };

    const handleBackToActionChoice = () => {
        setAuthStep('action-choice');
    };

    const handleBackToOtp = () => {
        setAuthStep('otp');
    };

    const handleProceedToShgMember = (selectedLocation) => {
        setLocationData(selectedLocation);
        setAuthStep('shg-member');
    };

    const handleBackToLocation = () => {
        setAuthStep('location');
    };

    const handleProceedToConfirm = (selectedDetails) => {
        setShgMemberData(selectedDetails);
        setAuthStep('profile-confirm');
    };

    const handleBackToShgMember = () => {
        setAuthStep('shg-member');
    };

    const handleProfileConfirmed = () => {
        setAuthStep('form');
    };

    const handleSaveDraft = async (formData) => {
        try {
            setSavedDraft(formData);

            if (registeredMobile) {
                await AsyncStorage.setItem(
                    `@draft_form_${registeredMobile}`,
                    JSON.stringify(formData),
                );
            }
        } catch (e) {
            console.error('Failed to save draft', e);
        }
    };

    const handleDeleteDraft = async () => {
        try {
            setSavedDraft(null);

            if (registeredMobile) {
                await AsyncStorage.removeItem(`@draft_form_${registeredMobile}`);
            }
        } catch (e) {
            console.error('Failed to delete draft', e);
        }
    };

    const handleProceedToUpload = (formData) => {
        setSavedDraft(formData);
        setAuthStep('upload');
    };

    const handleBackToForm = () => {
        setAuthStep('form');
    };

    const handleLogout = () => {
        setRegisteredMobile('');
        setAuthStep('mobile');
        setActiveTab('register');
        setLocationData({});
        setShgMemberData({});
        setSavedDraft(null);
    };

    const handleViewDraftsFromNav = () => {
        if (!registeredMobile) {
            Alert.alert(
                'Notice',
                'Please login with your mobile number first to view drafts.',
            );
            return;
        }

        setAuthStep('draft-list');
        setActiveTab('register');
    };

    const handleSubmitFinal = async (finalData) => {
        const application = {
            ...finalData,
            mobile: registeredMobile,

            district: locationData.district || "",
            block: locationData.block || "",

            submittedAt: new Date().toLocaleDateString(),

            status: "Under BMM Review",
        };

        setSubmittedApplications(prev => [...prev, application]);

        await handleDeleteDraft();

        Alert.alert(
            "Application Submitted Successfully! 🎉",
            "Your application has been forwarded to BMM review.",
            [
                {
                    text: "View Status",
                    onPress: () => {
                        setAuthStep("action-choice");
                        setActiveTab("status");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.screenContainer}>
                <ImageBackground
                    source={BGImage}
                    style={styles.screenContainer}
                    resizeMode="cover"
                >
                    {activeTab === 'register' &&
                        (authStep === 'mobile' ? (
                            // <HomeScreen />
                            <MobileRegisterScreen
                                language={language}
                                onOtpSent={handleOtpSent}
                                setRegisteredMobile={setRegisteredMobile}
                            />
                        ) : authStep === 'otp' ? (
                            <OtpVerifyScreen
                                language={language}
                                mobileNumber={registeredMobile}
                                onBackToMobile={handleBackToMobile}
                                onOtpVerified={handleOtpVerified}
                            />
                        ) : authStep === 'action-choice' ? (
                            <ActionChoiceScreen
                                language={language}
                                mobileNumber={registeredMobile}
                                savedDraft={savedDraft}
                                onFillNewApp={() => {
                                    handleDeleteDraft();
                                    setAuthStep("location");
                                }}
                                onResumeDraft={() => setAuthStep("form")}
                                onViewStatus={() => setActiveTab("status")}
                                onBackToOtp={handleBackToOtp}
                            />
                        ) : authStep === 'draft-list' ? (
                            <DraftListScreen
                                language={language}
                                savedDraft={savedDraft}
                                resumeDraft={() => setAuthStep('form')}
                                onBack={() => setAuthStep('action-choice')}
                            />
                        ) : authStep === 'location' ? (
                            <LocationSelectionScreen
                                language={language}
                                initialData={locationData}
                                onBackToOtp={handleBackToActionChoice}
                                onProceedToForm={handleProceedToShgMember}
                            />
                        ) : authStep === 'shg-member' ? (
                            <SHGAndMemberSelectionScreen
                                language={language}
                                locationData={locationData}
                                initialSelection={shgMemberData}
                                onBackToLocation={handleBackToLocation}
                                onProceedToForm={handleProceedToConfirm}
                            />
                        ) : authStep === 'profile-confirm' ? (
                            <ProfileConfirmationScreen
                                language={language}
                                profileData={{ ...locationData, ...shgMemberData }}
                                onBackToShgMember={handleBackToShgMember}
                                onConfirmCreate={handleProfileConfirmed}
                            />
                        ) : authStep === 'form' ? (
                            <ApplicationFormScreen
                                language={language}
                                currentUser={{ mobile: registeredMobile }}
                                initialDraft={savedDraft}
                                onSaveDraft={handleSaveDraft}
                                onDeleteDraft={handleDeleteDraft}
                                onProceedToUpload={handleProceedToUpload}
                                onBackToOtp={() => setAuthStep('profile-confirm')}
                            />
                        ) : authStep === "upload" ? (
                            <DocumentUploadScreen
                                language={language}
                                applicationForm={savedDraft}
                                onSubmitFinal={handleSubmitFinal}
                                onBackToForm={handleBackToForm}
                            />
                        ) : authStep === "application-details" ? (
                            <ApplicationDetailsScreen
                                application={selectedApplication}
                                onBack={() => {
                                    setActiveTab("status");
                                    setAuthStep("");
                                }}
                                onStatusChange={(updatedApplication) => {

                                    setSelectedApplication(updatedApplication);

                                    setSubmittedApplications(prev =>
                                        prev.map(item =>
                                            item.mobile === updatedApplication.mobile &&
                                                item.submittedAt === updatedApplication.submittedAt
                                                ? updatedApplication
                                                : item
                                        )
                                    );

                                }}
                            />
                        ) : null)}

                    {activeTab === "status" &&
                        (authStep === "application-details" ? (
                            <ApplicationDetailsScreen
                                application={selectedApplication}
                                onBack={() => {
                                    setActiveTab("status");
                                    setAuthStep("");
                                }}
                                onStatusChange={(updatedApplication) => {

                                    setSelectedApplication(updatedApplication);

                                    setSubmittedApplications(prev =>
                                        prev.map(item =>
                                            item.mobile === updatedApplication.mobile &&
                                                item.submittedAt === updatedApplication.submittedAt
                                                ? updatedApplication
                                                : item
                                        )
                                    );

                                }}
                            />
                        ) : (
                            <StatusTrackerScreen
                                language={language}
                                mobileNumber={registeredMobile}
                                submissions={submittedApplications}
                                setSelectedApplication={setSelectedApplication}
                                setAuthStep={setAuthStep}
                            />
                        ))
                    }
                </ImageBackground>
            </View>

            {authStep !== 'mobile' && authStep !== 'otp' && (
                <BottomNav
                    language={language}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={handleLogout}
                    onViewDrafts={handleViewDraftsFromNav}
                />
            )}
        </View>
    );
}

// --- Action Choice Screen ---
function ActionChoiceScreen({
    language,
    mobileNumber,
    savedDraft,
    onFillNewApp,
    resumeDraft,
    onViewStatus,
    onBackToOtp,
}) {
    const t = translations[language || "en"]
    return (
        <SafeAreaView style={styles.adminSafe}>
            <View style={styles.adminContainer}>
                <View style={styles.topBarRow}>
                    {onBackToOtp && (
                        // <TouchableOpacity
                        //     onPress={onBackToOtp}
                        //     activeOpacity={0.7}
                        //     style={styles.backButtonContainer}
                        // >
                        //     <Text style={styles.backArrowSymbol}>←</Text>
                        //     <Text style={styles.backButtonText}>{t.back}</Text>
                        // </TouchableOpacity>
                        <Button
                            variant="back"
                            image={Back1}
                            onPress={onBackToOtp}
                            style={{
                                marginTop: 10,
                                alignSelf: "flex-start",
                            }}
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    )}
                </View>

                <View style={styles.adminHeader}>
                    {/* <Text style={styles.adminEmoji}>🎯</Text> */}
                    <Text style={styles.adminTitle}>
                        {t.welcomeBeneficiary}
                    </Text>
                    <Text style={styles.adminSubtitle}>
                        {t.verifiedMobile}: +91 {mobileNumber || "9876543210"}.
                        {" "}
                        {t.chooseAction}
                    </Text>
                </View>

                <View style={styles.portalCardsList}>
                    {savedDraft ? (
                        <View style={styles.draftContainerBox}>
                            <Text style={styles.sectionHeaderTitle}>
                                📂 {t.savedDraft}
                            </Text>
                            <TouchableOpacity
                                style={styles.draftItemCard}
                                activeOpacity={0.8}
                                onPress={resumeDraft}
                            >
                                <View style={styles.draftTextGroup}>
                                    <Text style={styles.draftItemTitle}>
                                        {savedDraft.memberName
                                            ? `${t.name}: ${savedDraft.memberName}`
                                            : t.incompleteApplication}
                                    </Text>
                                    <Text style={styles.draftItemSub}>
                                        {t.enterprise}: {savedDraft.enterpriseName || t.notSpecified} |{" "}
                                        {t.step} {savedDraft.activeFormStep || 1} {t.of} 4
                                    </Text>
                                </View>
                                <Text style={styles.resumeButtonText}>
                                    {t.resume} →
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={styles.portalCard}
                        activeOpacity={0.8}
                        onPress={onFillNewApp}
                    >
                        <Text style={styles.portalCardIcon}>📝</Text>
                        <View style={styles.portalCardTextGroup}>
                            <Text style={styles.portalCardTitle}>
                                {t.fillNewApplication}
                            </Text>
                            <Text style={styles.portalCardDesc}>
                                {t.fillNewApplicationDesc}
                            </Text>
                        </View>
                        <Text style={styles.portalCardArrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.portalCard}
                        activeOpacity={0.8}
                        onPress={onViewStatus}
                    >
                        <Text style={styles.portalCardIcon}>📊</Text>
                        <View style={styles.portalCardTextGroup}>
                            <Text style={styles.portalCardTitle}>
                                {t.viewApplicationStatus}
                            </Text>
                            <Text style={styles.portalCardDesc}>
                                {t.viewApplicationStatusDesc}
                            </Text>
                        </View>
                        <Text style={styles.portalCardArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

function StatusTrackerScreen({
    language,
    mobileNumber,
    submissions,
    setSelectedApplication,
    setAuthStep,
}) {

    const t = translations[language || "en"];

    const userSubmissions = submissions.filter(s => s.mobile === mobileNumber);
    const hasSubmitted = userSubmissions.length > 0;

    return (
        <SafeAreaView style={styles.placeholderSafe}>
            <ImageBackground
                source={BGImage}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.statusContainer}>
                    <View style={styles.adminHeader}>
                        <Text style={styles.placeholderEmoji}>📈</Text>

                        <Text style={styles.placeholderTitle}>
                            {t.liveStatusTracker}
                        </Text>
                        <Text style={styles.placeholderSub}>
                            Verified User Mobile: +91 {mobileNumber || 'Not Verified / Guest'}
                        </Text>
                    </View>

                    {hasSubmitted ? (
                        <ScrollView
                            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {userSubmissions.map((sub, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.statusCard}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedApplication(sub);
                                        setAuthStep("application-details");
                                    }}
                                >
                                    <View style={styles.statusRowTop}>
                                        <Text style={styles.statusAppId}>
                                            MCCY {1001 + index}
                                        </Text>
                                        <Text style={styles.statusBadgeText}>
                                            {sub.status}
                                        </Text>
                                    </View>
                                    <Text style={styles.statusDetail}>
                                        🏦 Bank: {sub.selectedBankName}
                                    </Text>

                                    <Text style={styles.statusDetail}>
                                        💰 Amount: ₹{sub.requiredCapital}
                                    </Text>

                                    <Text style={styles.statusDate}>
                                        📅 Applied On: {sub.submittedAt}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.emptyStateBox}>
                            <Text style={styles.emptyEmoji}>📭</Text>
                            <Text style={styles.emptyTitle}>No Forms Filled Yet</Text>
                            <Text style={styles.emptyDesc}>
                                {mobileNumber
                                    ? `No active Mahila Credit Card applications found for +91 ${mobileNumber}.`
                                    : 'Please complete mobile verification first to view your application status.'}
                            </Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 25 : 0,
        marginBottom: Platform.OS === 'android' ? 25 : 0,
    },
    screenContainer: { flex: 1 },
    adminSafe: { flex: 1 },
    adminContainer: { flex: 1, padding: 24, justifyContent: 'center', gap: 20 },
    statusContainer: { flex: 1, padding: 20, justifyContent: 'space-between' },
    topBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    backArrowSymbol: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
    backButtonText: { fontSize: 22, fontWeight: '700', color: '#334155' },
    badge: {
        backgroundColor: '#fef3c7',
        borderColor: '#fcd34d',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: '#78350f',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    adminHeader: { alignItems: 'center', gap: 8 },
    adminEmoji: { fontSize: 40 },
    adminTitle: {
        fontSize: 35,
        fontWeight: '800',
        color: '#0f172a',
        textAlign: 'center',
    },
    // adminSubtitle: {
    //     fontSize: 20,
    //     color: '#475569',
    //     textAlign: 'center',
    //     lineHeight: 18,
    // },
    adminSubtitle: {
        fontSize: 20,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 18,
        marginTop: 10,
        // fontFamily: 'NotoSansDevanagari-Bold',

    },
    portalCardsList: { gap: 12 },
    portalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        gap: 14,
    },
    draftContainerBox: {
        backgroundColor: '#fef3c7',
        borderColor: '#fcd34d',
        borderWidth: 1,
        padding: 12,
        borderRadius: 16,
        gap: 8,
    },
    sectionHeaderTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#78350f',
        textTransform: 'uppercase',
    },
    draftItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f59e0b',
        justifyContent: 'space-between',
    },
    draftTextGroup: { flex: 1, gap: 2 },
    draftItemTitle: { fontSize: 13, fontWeight: '700', color: '#1e293b' },
    draftItemSub: { fontSize: 11, color: '#64748b' },
    resumeButtonText: { fontSize: 12, fontWeight: '800', color: '#d97706' },
    portalCardIcon: { fontSize: 24 },
    portalCardTextGroup: { flex: 1, gap: 2 },
    portalCardTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b' },
    portalCardDesc: { fontSize: 17, color: '#64748b' },
    portalCardArrow: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
    placeholderSafe: { flex: 1, backgroundColor: '#f8fafc' },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        gap: 8,
    },
    placeholderEmoji: { fontSize: 40, marginBottom: 8 },
    placeholderTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
    placeholderSub: { fontSize: 18, color: '#64748b', textAlign: 'center' },
    emptyStateBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 8,
    },
    emptyEmoji: { fontSize: 48, marginBottom: 4 },
    emptyTitle: { fontSize: 20, fontWeight: '800', color: '#1e293b' },
    emptyDesc: {
        fontSize: 20,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 18,
    },
    statusCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        gap: 6,
    },
    statusRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusAppId: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
    statusBadge: {
        backgroundColor: '#fef3c7',
        borderColor: '#fcd34d',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusBadgeText: { fontSize: 18, fontWeight: '700', color: '#b45309' },
    statusDetail: { fontSize: 18, color: '#334155' },
    statusDate: {
        fontSize: 18,
        color: '#334155',
        marginTop: 4,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    background: {
        flex: 1,
    },
});
