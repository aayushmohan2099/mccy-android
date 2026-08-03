import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";

// Import broken-down sections
import { PersonalDetailsSection } from "./ApplicationForm/PersonalDetailsSection";
import { VoClfDetailsSection } from "./ApplicationForm/VoClfDetailsSection";
import { LoanEnterpriseDetailsSection } from "./ApplicationForm/LoanEnterpriseDetailsSection";
import { BankDetailsSection } from "./ApplicationForm/BankDetailsSection";

export function ApplicationFormScreen({ currentUser, initialDraft, onProceedToUpload, onSaveDraft, onDeleteDraft, onBackToOtp }) {
    // Initial state setup with draft values if available
    const [formData, setFormData] = useState({
        memberName: initialDraft?.memberName || initialDraft?.fullName || "",
        fatherOrHusbandName: initialDraft?.fatherOrHusbandName || "",
        maritalStatus: initialDraft?.maritalStatus || "Married",
        dob: initialDraft?.dob || "",
        mobile: currentUser?.mobile || initialDraft?.mobile || "",
        memberShgId: initialDraft?.memberShgId || "",
        shgId: initialDraft?.shgId || "",
        shgJoiningDate: initialDraft?.shgJoiningDate || "",
        socialCategory: initialDraft?.socialCategory || "General",
        religion: initialDraft?.religion || "Hindu",

        voName: initialDraft?.voName || "",
        clfName: initialDraft?.clfName || "",

        enterpriseName: initialDraft?.enterpriseName || "",
        natureOfEnterprise: initialDraft?.natureOfEnterprise || "New",
        enterpriseType: initialDraft?.enterpriseType || "Micro",
        sector: initialDraft?.sector || "Trading",
        businessActivity: initialDraft?.businessActivity || "",
        totalSales: initialDraft?.totalSales || "",
        totalExpenses: initialDraft?.totalExpenses || "",
        loanPurpose: initialDraft?.loanPurpose || "",
        requiredCapital: initialDraft?.requiredCapital || "",
        workPlace: initialDraft?.workPlace || "From Home",
        salesChannel: initialDraft?.salesChannel || "In the Local Village",
        udhyamRegNum: initialDraft?.udhyamRegNum || "",

        selectedBankName: initialDraft?.selectedBankName || "State Bank of India",
        branchName: initialDraft?.branchName || "",
        accountNumber: initialDraft?.accountNumber || "",
        ifscCode: initialDraft?.ifscCode || "SBIN0001234",
    });

    const [activeFormStep, setActiveFormStep] = useState(initialDraft?.activeFormStep || 1);
    const [saveStatusMessage, setSaveStatusMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (saveStatusMessage) setSaveStatusMessage("");
    };

    const netProfit = (Number(formData.totalSales) || 0) - (Number(formData.totalExpenses) || 0);

    const handleSaveDraftClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onSaveDraft) {
                onSaveDraft({
                    ...formData,
                    activeFormStep: activeFormStep,
                    netProfit: netProfit.toString()
                });
            }
            setSaveStatusMessage("Draft saved successfully! You can resume anytime.");
            setIsLoading(false);
        }, 600);
    };

    // Delete/Discard draft and start fresh
    const handleDeleteDraftClick = () => {
        Alert.alert(
            "Delete Draft",
            "Are you sure you want to delete this draft and start a fresh form?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Delete",
                    style: "destructive",
                    onPress: () => {
                        if (onDeleteDraft) onDeleteDraft();
                        // Reset form state to empty/default
                        setFormData({
                            memberName: currentUser?.fullName || "",
                            fatherOrHusbandName: "",
                            maritalStatus: "Married",
                            dob: "",
                            mobile: currentUser?.mobile || "",
                            memberShgId: "",
                            shgId: "",
                            shgJoiningDate: "",
                            socialCategory: "General",
                            religion: "Hindu",
                            voName: "",
                            clfName: "",
                            enterpriseName: "",
                            natureOfEnterprise: "New",
                            enterpriseType: "Micro",
                            sector: "Trading",
                            businessActivity: "",
                            totalSales: "",
                            totalExpenses: "",
                            loanPurpose: "",
                            requiredCapital: "",
                            workPlace: "From Home",
                            salesChannel: "In the Local Village",
                            udhyamRegNum: "",
                            selectedBankName: "State Bank of India",
                            branchName: "",
                            accountNumber: "",
                            ifscCode: "SBIN0001234",
                        });
                        setActiveFormStep(1);
                        setSaveStatusMessage("Draft deleted. Started fresh form.");
                    }
                }
            ]
        );
    };

    const handleNextClick = () => {
        if (activeFormStep < 4) {
            setActiveFormStep(activeFormStep + 1);
        } else {
            if (onProceedToUpload) {
                onProceedToUpload({
                    ...formData,
                    netProfit: netProfit.toString(),
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header Area */}
                    <View style={styles.headerArea}>
                        <View style={styles.headerLeft}>
                            {onBackToOtp && (
                                <TouchableOpacity onPress={onBackToOtp} activeOpacity={0.7} style={styles.backButtonContainer}>
                                    <Text style={styles.backArrowSymbol}>←</Text>
                                    <Text style={styles.backButtonText}>Back</Text>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.headerTitle}>UP Mahila Udhyami Credit Card</Text>
                        </View>

                        <View style={styles.headerActionButtons}>
                            <TouchableOpacity style={styles.saveDraftButton} onPress={handleSaveDraftClick} disabled={isLoading}>
                                <Text style={styles.saveDraftIcon}>💾</Text>
                                <Text style={styles.saveDraftText}>Save Draft</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.deleteDraftButton} onPress={handleDeleteDraftClick} disabled={isLoading}>
                                <Text style={styles.deleteDraftIcon}>🗑️</Text>
                                <Text style={styles.deleteDraftText}>Start Fresh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Step Wizard Header */}
                    <View style={styles.wizardContainer}>
                        {["Personal", "VO / CLF", "Loan & Enterprise", "Bank Details"].map((step, index) => {
                            const stepNumber = index + 1;
                            const isActive = activeFormStep === stepNumber;
                            return (
                                <TouchableOpacity
                                    key={step}
                                    style={[styles.wizardTab, isActive && styles.wizardTabActive]}
                                    onPress={() => setActiveFormStep(stepNumber)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.wizardTabText, isActive && styles.wizardTabTextActive]}>
                                        {stepNumber}. {step}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {saveStatusMessage ? (
                        <View style={styles.successBanner}>
                            <Text style={styles.successIcon}>✅</Text>
                            <Text style={styles.successText}>{saveStatusMessage}</Text>
                        </View>
                    ) : null}

                    {/* Form Card Container rendering sections dynamically */}
                    <View style={styles.formCard}>
                        {activeFormStep === 1 && <PersonalDetailsSection formData={formData} onChange={handleChange} />}
                        {activeFormStep === 2 && <VoClfDetailsSection formData={formData} onChange={handleChange} />}
                        {activeFormStep === 3 && <LoanEnterpriseDetailsSection formData={formData} onChange={handleChange} netProfit={netProfit} />}
                        {activeFormStep === 4 && <BankDetailsSection formData={formData} onChange={handleChange} />}
                    </View>

                </ScrollView>

                {/* Footer Navigation Buttons */}
                <View style={styles.footerNav}>
                    {activeFormStep > 1 ? (
                        <TouchableOpacity onPress={() => setActiveFormStep(activeFormStep - 1)} style={styles.btnPrev} activeOpacity={0.7}>
                            <Text style={styles.btnPrevText}>Previous</Text>
                        </TouchableOpacity>
                    ) : <View />}

                    <CustomButton
                        title={activeFormStep === 4 ? "Proceed to Documents" : "Next Step"}
                        onPress={handleNextClick}
                        rightArrow={true}
                        style={styles.customNextBtn}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40, gap: 16 },
    headerArea: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    headerActionButtons: { flexDirection: "row", gap: 6 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    headerTitle: { fontSize: 11, fontWeight: "600", color: "#64748b", textTransform: "uppercase" },
    saveDraftButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#ecfdf5", borderColor: "#6ee7b7", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
    saveDraftIcon: { fontSize: 12 },
    saveDraftText: { fontSize: 11, fontWeight: "600", color: "#047857" },
    deleteDraftButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#fff1f2", borderColor: "#fecdd3", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
    deleteDraftIcon: { fontSize: 12 },
    deleteDraftText: { fontSize: 11, fontWeight: "600", color: "#9f1239" },
    wizardContainer: { flexDirection: "row", backgroundColor: "#ffffff", padding: 6, borderRadius: 12, borderColor: "#e2e8f0", borderWidth: 1, justifyContent: "space-between" },
    wizardTab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 },
    wizardTabActive: { backgroundColor: "#f59e0b" },
    wizardTabText: { fontSize: 9, fontWeight: "700", color: "#64748b" },
    wizardTabTextActive: { color: "#ffffff" },
    successBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#ecfdf5", borderColor: "#a7f3d0", borderWidth: 1, padding: 12, borderRadius: 12 },
    successIcon: { fontSize: 14 },
    successText: { color: "#065f46", fontSize: 12 },
    formCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1 },
    footerNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, paddingBottom: Platform.OS === "ios" ? 24 : 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0" },
    btnPrev: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#e2e8f0", borderRadius: 10 },
    btnPrevText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    customNextBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 }
});