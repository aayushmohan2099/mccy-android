import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";
import { CustomInput } from "../compnents/SharedUIComp/CustomInput";

export function MobileRegisterScreen({ onOtpSent, setRegisteredMobile }) {
    const [mobileNumber, setMobileNumber] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleMobileChange = (val) => {
        const cleanedVal = val.replace(/\D/g, "");
        if (cleanedVal.length <= 10) {
            setMobileNumber(cleanedVal);
            if (errorMessage) setErrorMessage("");
        }
    };

    const handleSubmit = () => {
        if (mobileNumber.length !== 10) {
            setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
            return;
        }
        if (!acceptedTerms) {
            setErrorMessage("You must accept the data consent terms & conditions.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (setRegisteredMobile) setRegisteredMobile(mobileNumber);
            if (onOtpSent) onOtpSent(mobileNumber);
        }, 500);
    };

    const isFormValid = mobileNumber.length === 10 && acceptedTerms;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View style={styles.contentSpacing}>
                        <View style={styles.headerBadgeContainer}>
                            <Text style={styles.headerSubtitle}>Beneficiary Registration</Text>
                        </View>

                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Register with Mobile Number</Text>
                            <Text style={styles.description}>Enter your 10-digit active Indian mobile number to start your Mahila Credit Card application.</Text>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.inputGroupWrapper}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Primary Mobile Number</Text>
                                    <View style={styles.linkedBadge}>
                                        <Text style={styles.linkedLockIcon}>🔒</Text>
                                        <Text style={styles.linkedBadgeText}>ID Linked</Text>
                                    </View>
                                </View>

                                <CustomInput
                                    label=""
                                    value={mobileNumber}
                                    onChangeText={handleMobileChange}
                                    placeholder="9876543210"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    editable={!isLoading}
                                    prefix="🇮🇳 +91"
                                />
                                <Text style={styles.helperText}>OTP will be sent via SMS gateway to this number.</Text>
                            </View>

                            <View style={styles.termsDivider}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => setAcceptedTerms(!acceptedTerms)} style={styles.termsRow} disabled={isLoading}>
                                    <View style={styles.checkboxIconContainer}>
                                        <Text style={[styles.checkboxSymbol, acceptedTerms ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                                            {acceptedTerms ? "☑" : "☐"}
                                        </Text>
                                    </View>
                                    <Text style={styles.termsText}>
                                        I hereby consent to share my mobile data for financial verification under <Text style={styles.termsBold}>Mahila Credit Card Yojana</Text> guidelines.
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {errorMessage ? (
                                <View style={styles.errorBanner}>
                                    <Text style={styles.errorIcon}>⚠️</Text>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}

                            <CustomButton
                                title="Send OTP"
                                onPress={handleSubmit}
                                disabled={!isFormValid || isLoading}
                                isLoading={isLoading}
                                loadingText="Sending OTP via SMS..."
                                icon="📞"
                            />
                        </View>

                        <View style={styles.infoNote}>
                            <View style={styles.infoNoteHeader}>
                                <Text style={styles.infoShieldIcon}>🛡️</Text>
                                <Text style={styles.infoNoteTitle}>Official Government Security Rule</Text>
                            </View>
                            <Text style={styles.infoNoteText}>Only one active applicant profile can be linked per Indian mobile number.</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Need help? Call Helpline <Text style={styles.footerTextBold}>1800-111-2026</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f8fafc" },
    container: { flex: 1 },
    scrollContent: { padding: 24, flexGrow: 1 },
    contentSpacing: { gap: 24 },
    headerBadgeContainer: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
    headerSubtitle: { fontSize: 14, fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: 0.5 },
    titleContainer: { gap: 6, marginBottom: 4 },
    title: { fontSize: 24, fontWeight: "800", color: "#0f172a", letterSpacing: -0.5 }, // Heading font size set to 24
    description: { fontSize: 14, color: "#334155", lineHeight: 20 },
    card: { backgroundColor: "#ffffff", padding: 22, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, gap: 20 },
    inputGroupWrapper: { gap: 8 },
    labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    label: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    linkedBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
    linkedLockIcon: { fontSize: 12 },
    linkedBadgeText: { color: "#059669", fontSize: 12, fontWeight: "700" },
    helperText: { fontSize: 13, color: "#475569" },
    termsDivider: { borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 16 },
    termsRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    checkboxIconContainer: { marginTop: 1 },
    checkboxSymbol: { fontSize: 24 },
    checkboxChecked: { color: "#059669" },
    checkboxUnchecked: { color: "#94a3b8" },
    termsText: { flex: 1, fontSize: 14, color: "#334155", lineHeight: 20 },
    termsBold: { fontWeight: "700", color: "#0f172a" },
    errorBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff1f2", borderColor: "#fecdd3", borderWidth: 1, padding: 12, borderRadius: 12, gap: 8 },
    errorIcon: { fontSize: 16 },
    errorText: { color: "#9f1239", fontSize: 13, fontWeight: "600", flex: 1 },
    infoNote: { backgroundColor: "#fffbeb", borderColor: "rgba(253, 230, 138, 0.8)", borderWidth: 1, borderRadius: 12, padding: 16, gap: 6, marginTop: 16 },
    infoNoteHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    infoShieldIcon: { fontSize: 15 },
    infoNoteTitle: { fontWeight: "700", color: "#451a03", fontSize: 14 },
    infoNoteText: { color: "#78350f", fontSize: 13, lineHeight: 18 },
    footer: { padding: 16, alignItems: "center", paddingBottom: Platform.OS === "ios" ? 0 : 16 },
    footerText: { fontSize: 13, color: "#64748b" },
    footerTextBold: { fontWeight: "700", color: "#334155" },
});