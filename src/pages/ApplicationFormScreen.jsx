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
import Back from "../assets/images/back.svg";
import Button from "../compnents/SharedUIComp/Button";
import RefreshIcon from "../assets/images/refresh.png";
import PencilIcon from "../assets/images/pencil.png";
// import { Save } from "lucide-react-native";
import { User } from "lucide-react-native";
import { Building2 } from "lucide-react-native";
import { WalletCards } from "lucide-react-native";
import { Landmark } from "lucide-react-native";
import Card from "../compnents/SharedUIComp/Card";


const translations = {
    en: {
        back: "Back",
        title: "Loan Application Form",

        saveDraft: "Draft",
        startFresh: "Reset",

        personal: "Personal",
        voClf: "VO / CLF",
        loan: "Loan & Enterprise",
        bank: "Bank Details",

        previous: "Previous",
        next: "Next Step",
        proceed: "Proceed to Documents",

        draftSaved:
            "Draft saved successfully! You can resume anytime.",

        draftDeleted:
            "Draft deleted. Started fresh form.",

        deleteTitle: "Delete Draft",
        deleteMessage:
            "Are you sure you want to delete this draft and start a fresh form?",

        cancel: "Cancel",
        delete: "Yes, Delete"
    },

    hi: {
        back: "वापस",
        title: "ऋण आवेदन फॉर्म",

        // saveDraft: "ड्राफ्ट सहेजें",
        // startFresh: "नया प्रारम्भ करें",

        saveDraft: "ड्राफ्ट",
        startFresh: "रीसेट",

        personal: "व्यक्तिगत",
        voClf: "वीओ / सीएलएफ",
        loan: "ऋण एवं उद्यम",
        bank: "बैंक विवरण",

        previous: "पिछला",
        next: "अगला चरण",
        proceed: "दस्तावेज़ अपलोड करें",

        draftSaved:
            "ड्राफ्ट सफलतापूर्वक सहेजा गया।",

        draftDeleted:
            "ड्राफ्ट हटाकर नया आवेदन प्रारम्भ किया गया।",

        deleteTitle: "ड्राफ्ट हटाएँ",

        deleteMessage:
            "क्या आप ड्राफ्ट हटाकर नया आवेदन प्रारम्भ करना चाहते हैं?",

        cancel: "रद्द करें",

        delete: "हाँ, हटाएँ"
    }
};

export function ApplicationFormScreen({
    currentUser,
    initialDraft,
    onProceedToUpload,
    onSaveDraft,
    onDeleteDraft,
    onBackToOtp,
    language = "en"
}) {
    const t = translations[language] || translations.en;
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
            setSaveStatusMessage(t.draftSaved);
            setIsLoading(false);
        }, 600);
    };

    // Delete/Discard draft and start fresh
    const handleDeleteDraftClick = () => {
        Alert.alert(
            t.deleteTitle,
            t.deleteMessage,
            [
                { text: t.cancel, style: "cancel" },
                {
                    text: t.delete,
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
                        setSaveStatusMessage(t.draftDeleted);
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
                    <Card style={styles.headerCard}>
                        {/* Title */}
                        <Text style={styles.title}>
                            {t.title}
                        </Text>

                        {/* Save / Delete */}
                        <View style={styles.headerButtons}>
                            <Button
                                variant="imageAction"
                                title={t.saveDraft}
                                image={PencilIcon}
                                onPress={handleSaveDraftClick}
                                disabled={isLoading}
                                style={{
                                    marginBottom: 10,
                                    width: 170,
                                }}
                                imageStyle={{
                                    width: 50,
                                    height: 50,
                                }}
                            />

                            <Button
                                variant="imageAction"
                                title={t.startFresh}
                                image={RefreshIcon}
                                onPress={handleSaveDraftClick}
                                disabled={isLoading}
                                style={{
                                    marginBottom: 10,
                                    width: 170,
                                }}
                                imageStyle={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        </View>
                    </Card>

                    {/* Step Wizard Header */}
                    <View style={styles.wizardContainer}>
                        {[<User
                            size={50}
                            color="#000"
                            strokeWidth={2}
                        />,
                        <Building2
                            size={50}
                            color="#000000"
                            strokeWidth={2}
                        />,
                        <WalletCards
                            size={50}
                            color="#000000"
                            strokeWidth={2}
                        />,
                        <Landmark
                            size={50}
                            color="#000000"
                            strokeWidth={2}
                        />].map((step, index) => {
                            const stepNumber = index + 1;
                            const isActive = activeFormStep === stepNumber;
                            return (
                                <TouchableOpacity
                                    key={stepNumber}
                                    style={[styles.wizardTab, isActive && styles.wizardTabActive]}
                                    onPress={() => setActiveFormStep(stepNumber)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.stepRow}>

                                        <View
                                            style={[
                                                styles.stepCircle,
                                                isActive && styles.stepCircleActive,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.stepNumber,
                                                    isActive && styles.stepNumberActive,
                                                ]}
                                            >
                                                {stepNumber}
                                            </Text>
                                        </View>

                                        {step}

                                    </View>
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
                        {activeFormStep === 1 && (
                            <PersonalDetailsSection
                                formData={formData}
                                onChange={handleChange}
                                language={language}
                            />
                        )}
                        {activeFormStep === 2 && (
                            <VoClfDetailsSection
                                formData={formData}
                                onChange={handleChange}
                                language={language}
                            />
                        )}
                        {activeFormStep === 3 && <LoanEnterpriseDetailsSection
                            formData={formData}
                            onChange={handleChange}
                            netProfit={netProfit}
                            language={language}
                        />}
                        {activeFormStep === 4 && <BankDetailsSection formData={formData} onChange={handleChange} language={language} />}
                    </View>

                </ScrollView>

                {/* Footer Navigation Buttons */}
                <View style={styles.footerNav}>
                    <CustomButton
                        title={activeFormStep === 1 ? t.back : t.previous}
                        onPress={() => {
                            if (activeFormStep === 1) {
                                onBackToOtp();
                            } else {
                                setActiveFormStep(activeFormStep - 1);
                            }
                        }}
                        rightArrow={false}
                        style={styles.customPrevBtn}
                    />

                    <CustomButton
                        title={activeFormStep === 4 ? t.proceed : t.next}
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
    titleContainer: {
        marginTop: 10,
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#64748b",
        textTransform: "uppercase",
    },

    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    // headerTitle: { fontSize: 20, fontWeight: "600", color: "#64748b", textTransform: "uppercase" },
    saveDraftButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#ecfdf5", borderColor: "#6ee7b7", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
    saveDraftIcon: { fontSize: 15 },
    saveDraftText: { fontSize: 15, fontWeight: "600", color: "#047857" },
    deleteDraftButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#fff1f2", borderColor: "#fecdd3", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
    deleteDraftIcon: { fontSize: 15 },
    deleteDraftText: { fontSize: 15, fontWeight: "600", color: "#9f1239" },
    wizardContainer: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 16,
        borderColor: "#e2e8f0",
        borderWidth: 1,
        alignItems: "stretch",
    },

    wizardTab: {
        flex: 1,
        minWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderRadius: 12,
    },
    wizardTabActive: { backgroundColor: "#f59e0b" },
    wizardTabText: { fontSize: 15, fontWeight: "700", color: "#64748b" },
    wizardTabTextActive: { color: "#ffffff" },
    successBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#ecfdf5", borderColor: "#a7f3d0", borderWidth: 1, padding: 12, borderRadius: 12 },
    successIcon: { fontSize: 14 },
    successText: { color: "#065f46", fontSize: 12 },
    formCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1 },
    footerNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, paddingBottom: Platform.OS === "ios" ? 24 : 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0" },
    btnPrev: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#e2e8f0", borderRadius: 10 },
    btnPrevText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    customPrevBtn: {
        width: "40%",
    },
    stepRow: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#64748B",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    stepCircleActive: {
        borderColor: "#D46D15",
        backgroundColor: "#FFF8E7",
    },

    stepNumber: {
        fontSize: 14,
        fontWeight: "700",
        color: "#64748B",
    },

    stepNumberActive: {
        color: "#D46D15",
    },

    customNextBtn: {
        width: "50%",
    },
    headerCard: {
        marginBottom: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 30,
    },

    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
});