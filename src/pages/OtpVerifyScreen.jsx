import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CustomButton } from '../compnents/SharedUIComp/CustomButton';

export function OtpVerifyScreen({
  mobileNumber,
  onOtpVerified,
  onBackToMobile,
}) {
  const [otpValues, setOtpValues] = useState(['1', '2', '3', '4']);
  const [coolDownTimer, setCoolDownTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let timer;
    if (coolDownTimer > 0) {
      timer = setInterval(() => {
        setCoolDownTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [coolDownTimer]);

  const handleChangeText = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    if (errorMessage) setErrorMessage('');
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length !== 4) {
      setErrorMessage('Please enter complete 4-digit OTP code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (
        enteredOtp === '1234' ||
        enteredOtp === '0000' ||
        enteredOtp.length === 4
      ) {
        if (onOtpVerified) {
          onOtpVerified({
            mobile: mobileNumber || '9876543210',
            verifiedAt: new Date().toISOString(),
          });
        }
      } else {
        setErrorMessage('Invalid OTP code. Please use demo code: 1234');
      }
    }, 600);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCoolDownTimer(30);
    setCanResend(false);
    setErrorMessage('');
    setOtpValues(['1', '2', '3', '4']);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentSpacing}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enter OTP Code</Text>
              <Text style={styles.description}>
                4-digit verification code sent to{' '}
                <Text style={styles.descriptionBold}>
                  +91 {mobileNumber || '9876543210'}
                </Text>
              </Text>
            </View>

            <View style={styles.demoBanner}>
              <View style={styles.demoBannerLeft}>
                <Text style={styles.sparkleIcon}>✨</Text>
                <Text style={styles.demoBannerText}>
                  Demo Test OTP: <Text style={styles.demoCodeText}>1234</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setOtpValues(['1', '2', '3', '4'])}
                style={styles.autoFillButton}
                activeOpacity={0.7}
              >
                <Text style={styles.autoFillButtonText}>Auto-fill</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Enter 4-Digit One Time Password
                </Text>
                <View style={styles.otpContainer}>
                  {otpValues.map((digit, idx) => (
                    <TextInput
                      key={idx}
                      ref={inputRefs[idx]}
                      value={digit}
                      onChangeText={val => handleChangeText(idx, val)}
                      onKeyPress={e => handleKeyPress(idx, e)}
                      keyboardType="numeric"
                      maxLength={1}
                      selectTextOnFocus
                      style={[
                        styles.otpInput,
                        digit ? styles.otpInputActive : null,
                      ]}
                    />
                  ))}
                </View>
              </View>

              {errorMessage ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              <View style={styles.resendRow}>
                <Text style={styles.resendLabel}>Didn't receive code?</Text>
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={!canResend}
                  style={styles.resendButtonContainer}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.refreshIcon,
                      canResend
                        ? styles.refreshIconActive
                        : styles.refreshIconDisabled,
                    ]}
                  >
                    ↻
                  </Text>
                  <Text
                    style={[
                      styles.resendButtonText,
                      !canResend && styles.resendButtonTextDisabled,
                    ]}
                  >
                    {canResend ? 'Resend OTP' : `Resend in ${coolDownTimer}s`}
                  </Text>
                </TouchableOpacity>
              </View>

              <CustomButton
                title="Verify & Login"
                onPress={handleVerify}
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Validating Security Token..."
                icon="🔑"
              />
              <TouchableOpacity
                onPress={onBackToMobile}
                activeOpacity={0.7}
                style={styles.backButtonContainer}
              >
                <Text style={styles.backArrowSymbol}>←</Text>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Session token will be issued for REST API security headers.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1 },
  scrollContent: { padding: 24, flexGrow: 1 },
  contentSpacing: { gap: 24 },
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
  titleContainer: { gap: 4, marginBottom: 8 },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  description: { fontSize: 12, color: '#475569', lineHeight: 18 },
  descriptionBold: { fontWeight: '700', color: '#0f172a' },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fef3c7',
    borderColor: 'rgba(251, 191, 36, 0.4)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  demoBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sparkleIcon: { fontSize: 14 },
  demoBannerText: { fontSize: 12, color: '#1e293b' },
  demoCodeText: {
    fontWeight: '700',
    color: '#b45309',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 14,
  },
  autoFillButton: {
    backgroundColor: '#fde68a',
    borderColor: '#fcd34d',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  autoFillButtonText: { fontSize: 11, fontWeight: '700', color: '#92400e' },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    gap: 24,
  },
  inputGroup: { gap: 12 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  otpInput: {
    width: 48,
    height: 56,
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderWidth: 2,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  otpInputActive: { backgroundColor: '#ffffff', borderColor: '#059669' },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  errorIcon: { fontSize: 14 },
  errorText: { color: '#9f1239', fontSize: 12, flex: 1 },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  resendLabel: { fontSize: 12, color: '#64748b' },
  resendButtonContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  refreshIcon: { fontSize: 16, fontWeight: 'bold' },
  refreshIconActive: { color: '#047857' },
  refreshIconDisabled: { color: '#94a3b8' },
  resendButtonText: { fontSize: 12, fontWeight: '600', color: '#047857' },
  resendButtonTextDisabled: { color: '#94a3b8' },
  footer: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  footerText: { fontSize: 11, color: '#94a3b8' },
});
