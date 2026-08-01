// App.jsx
import React, { useState, useEffect } from 'react';
import { HomeScreen } from './src/pages/HomeScreen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MobileRegisterScreen } from './src/pages/MobileRegisterScreen';
import { OtpVerifyScreen } from './src/pages/OtpVerifyScreen';
import { LocationSelectionScreen } from './src/pages/LocationSelectionScreen';
import { SHGAndMemberSelectionScreen } from './src/pages/SHGAndMemberSelectionScreen';
import { ProfileConfirmationScreen } from './src/pages/ProfileConfirmationScreen';
import { ApplicationFormScreen } from './src/pages/ApplicationFormScreen';
import { DocumentUploadScreen } from './src/pages/DocumentUploadScreen';
import { DraftListScreen } from './src/pages/DraftListScreen'; // <-- Imported separate DraftListScreen
import { BottomNav } from './src/pages/BottomNav';
import { CustomButton } from './src/compnents/SharedUIComp/CustomButton';

import { ImageBackground } from 'react-native';
import BGImage from './src/assets/images/bg.png';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#0f172a"
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('register');
  const [authStep, setAuthStep] = useState('mobile');
  const [registeredMobile, setRegisteredMobile] = useState('');
  const [locationData, setLocationData] = useState({});
  const [shgMemberData, setShgMemberData] = useState({});
  const [savedDraft, setSavedDraft] = useState(null);
  const [submittedApplications, setSubmittedApplications] = useState([]);

  const handleOtpVerified = async data => {
    const mobile = data.mobile;
    setRegisteredMobile(mobile);

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
    setAuthStep('action-choice');
  };

  const handleOtpSent = mobileNumber => {
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

  const handleProceedToShgMember = selectedLocation => {
    setLocationData(selectedLocation);
    setAuthStep('shg-member');
  };

  const handleBackToLocation = () => {
    setAuthStep('location');
  };

  const handleProceedToConfirm = selectedDetails => {
    setShgMemberData(selectedDetails);
    setAuthStep('profile-confirm');
  };

  const handleBackToShgMember = () => {
    setAuthStep('shg-member');
  };

  const handleProfileConfirmed = confirmedProfile => {
    setAuthStep('form');
  };

  const handleSaveDraft = async formData => {
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

  const handleProceedToUpload = formData => {
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

  const handleSubmitFinal = async finalData => {
    setSubmittedApplications(prev => [
      ...prev,
      {
        ...finalData,
        mobile: registeredMobile,
        submittedAt: new Date().toLocaleDateString(),
      },
    ]);
    await handleDeleteDraft();

    Alert.alert(
      'Application Submitted Successfully! 🎉',
      'Your Mahila Credit Card application has been locked and forwarded to BMM review.',
      [
        {
          text: 'View Status',
          onPress: () => {
            setAuthStep('action-choice');
            setActiveTab('status');
          },
        },
      ],
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
                onOtpSent={handleOtpSent}
                setRegisteredMobile={setRegisteredMobile}
              />
            ) : authStep === 'otp' ? (
              <OtpVerifyScreen
                mobileNumber={registeredMobile}
                onBackToMobile={handleBackToMobile}
                onOtpVerified={handleOtpVerified}
              />
            ) : authStep === 'action-choice' ? (
              <ActionChoiceScreen
                mobileNumber={registeredMobile}
                savedDraft={savedDraft}
                onFillNewApp={() => {
                  handleDeleteDraft();
                  setAuthStep('location');
                }}
                onResumeDraft={() => setAuthStep('form')}
                onViewStatus={() => setActiveTab('status')}
                onBackToOtp={handleBackToOtp}
              />
            ) : authStep === 'draft-list' ? (
              <DraftListScreen
                savedDraft={savedDraft}
                resumeDraft={() => setAuthStep('form')}
                onBack={() => setAuthStep('action-choice')}
              />
            ) : authStep === 'location' ? (
              <LocationSelectionScreen
                initialData={locationData}
                onBackToOtp={handleBackToActionChoice}
                onProceedToForm={handleProceedToShgMember}
              />
            ) : authStep === 'shg-member' ? (
              <SHGAndMemberSelectionScreen
                locationData={locationData}
                initialSelection={shgMemberData}
                onBackToLocation={handleBackToLocation}
                onProceedToForm={handleProceedToConfirm}
              />
            ) : authStep === 'profile-confirm' ? (
              <ProfileConfirmationScreen
                profileData={{ ...locationData, ...shgMemberData }}
                onBackToShgMember={handleBackToShgMember}
                onConfirmCreate={handleProfileConfirmed}
              />
            ) : authStep === 'form' ? (
              <ApplicationFormScreen
                currentUser={{ mobile: registeredMobile }}
                initialDraft={savedDraft}
                onSaveDraft={handleSaveDraft}
                onDeleteDraft={handleDeleteDraft}
                onProceedToUpload={handleProceedToUpload}
                onBackToOtp={() => setAuthStep('profile-confirm')}
              />
            ) : authStep === 'upload' ? (
              <DocumentUploadScreen
                applicationForm={savedDraft}
                onSubmitFinal={handleSubmitFinal}
                onBackToForm={handleBackToForm}
              />
            ) : null)}

          {activeTab === 'status' && (
            <StatusTrackerScreen
              mobileNumber={registeredMobile}
              submissions={submittedApplications}
            />
          )}
        </ImageBackground>
      </View>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onViewDrafts={handleViewDraftsFromNav}
      />
    </View>
  );
}

// --- Action Choice Screen ---
function ActionChoiceScreen({
  mobileNumber,
  savedDraft,
  onFillNewApp,
  resumeDraft,
  onViewStatus,
  onBackToOtp,
}) {
  return (
    <SafeAreaView style={styles.adminSafe}>
      <View style={styles.adminContainer}>
        <View style={styles.topBarRow}>
          {onBackToOtp && (
            <TouchableOpacity
              onPress={onBackToOtp}
              activeOpacity={0.7}
              style={styles.backButtonContainer}
            >
              <Text style={styles.backArrowSymbol}>←</Text>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.adminHeader}>
          <Text style={styles.adminEmoji}>🎯</Text>
          <Text style={styles.adminTitle}>Welcome Beneficiary</Text>
          <Text style={styles.adminSubtitle}>
            Verified Mobile: +91 {mobileNumber || '9876543210'}. Choose an
            action below to proceed.
          </Text>
        </View>

        <View style={styles.portalCardsList}>
          {savedDraft ? (
            <View style={styles.draftContainerBox}>
              <Text style={styles.sectionHeaderTitle}>
                📂 Saved Draft Application
              </Text>
              <TouchableOpacity
                style={styles.draftItemCard}
                activeOpacity={0.8}
                onPress={resumeDraft}
              >
                <View style={styles.draftTextGroup}>
                  <Text style={styles.draftItemTitle}>
                    {savedDraft.memberName
                      ? `Name: ${savedDraft.memberName}`
                      : 'Incomplete Application Form'}
                  </Text>
                  <Text style={styles.draftItemSub}>
                    Enterprise: {savedDraft.enterpriseName || 'Not Specified'} |
                    Step {savedDraft.activeFormStep || 1} of 4
                  </Text>
                </View>
                <Text style={styles.resumeButtonText}>Resume →</Text>
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
                Fill New Application Form
              </Text>
              <Text style={styles.portalCardDesc}>
                Start a fresh Mahila Credit Card application pipeline
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
                View Application Status
              </Text>
              <Text style={styles.portalCardDesc}>
                Check verification pipeline status of your submitted forms
              </Text>
            </View>
            <Text style={styles.portalCardArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatusTrackerScreen({ mobileNumber, submissions }) {
  const userSubmissions = submissions.filter(s => s.mobile === mobileNumber);
  const hasSubmitted = userSubmissions.length > 0;

  return (
    <SafeAreaView style={styles.placeholderSafe}>
      <View style={styles.statusContainer}>
        <View style={styles.adminHeader}>
          <Text style={styles.placeholderEmoji}>📈</Text>
          <Text style={styles.placeholderTitle}>Live Status Tracker</Text>
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
              <View key={index} style={styles.statusCard}>
                <View style={styles.statusRowTop}>
                  <Text style={styles.statusAppId}>
                    Application #{1001 + index}
                  </Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Under BMM Review</Text>
                  </View>
                </View>
                <Text style={styles.statusDetail}>
                  👤 Name: {sub.fullName || 'Beneficiary'}
                </Text>
                <Text style={styles.statusDetail}>
                  📍 District: {sub.district} | Block: {sub.block}
                </Text>
                <Text style={styles.statusDetail}>
                  💳 Requested Limit: ₹{sub.amountRequested || 'N/A'}
                </Text>
                <Text style={styles.statusDate}>
                  Submitted on: {sub.submittedAt}
                </Text>
              </View>
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
  adminSafe: { flex: 1, backgroundColor: '#f8fafc' },
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
  backButtonText: { fontSize: 12, fontWeight: '700', color: '#334155' },
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
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  adminHeader: { alignItems: 'center', gap: 8 },
  adminEmoji: { fontSize: 36 },
  adminTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  adminSubtitle: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
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
    fontSize: 12,
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
  portalCardTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  portalCardDesc: { fontSize: 11, color: '#64748b' },
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
  placeholderTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  placeholderSub: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  emptyStateBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 8,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 4 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: '#1e293b' },
  emptyDesc: {
    fontSize: 12,
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
  statusAppId: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  statusBadge: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeText: { fontSize: 10, fontWeight: '700', color: '#b45309' },
  statusDetail: { fontSize: 12, color: '#334155' },
  statusDate: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
