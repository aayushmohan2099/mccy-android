import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pick, types, isErrorWithCode } from "@react-native-documents/picker";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";

export function DocumentUploadScreen({ applicationForm = {}, onSubmitFinal, onBackToForm }) {
    const [docs, setDocs] = useState({
        aadhaarDoc: { name: "", size: "", uri: "", type: "", uploaded: false, verified: false },
        incomeDoc: { name: "", size: "", uri: "", type: "", uploaded: false, verified: false },
        voDoc: { name: "", size: "", uri: "", type: "", uploaded: false, verified: false },
        clfDoc: { name: "", size: "", uri: "", type: "", uploaded: false, verified: false }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePickDocument = async (docKey) => {
        try {
            const [file] = await pick({
                type: [types.pdf, types.images],
                presentationStyle: "fullScreen",
            });

            const sizeInMb = file.size
                ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
                : "Unknown";

            setDocs((prev) => ({
                ...prev,
                [docKey]: {
                    name: file.name || "Document",
                    size: sizeInMb,
                    uri: file.uri,
                    type: file.type || "",
                    uploaded: true,
                    verified: true,
                },
            }));

            setErrorMessage("");
        } catch (err) {
            if (isErrorWithCode(err)) {
                console.log("Picker cancelled or picker error:", err);
            } else {
                console.log(err);
                Alert.alert("Error", "Could not open document picker.");
            }
        }
    };

    const handleRemove = (docKey) => {
        setDocs((prev) => ({
            ...prev,
            [docKey]: { name: "", size: "", uri: "", type: "", uploaded: false, verified: false }
        }));
    };

    const allMandatoryAttached =
        docs.aadhaarDoc.uploaded &&
        docs.incomeDoc.uploaded &&
        docs.voDoc.uploaded &&
        docs.clfDoc.uploaded;

    const handleSubmit = async () => {
        if (!allMandatoryAttached) {
            setErrorMessage("Application cannot be submitted unless all 4 mandatory document copies are attached.");
            return;
        }

        setIsLoading(true);
        try {
            if (onSubmitFinal) {
                await onSubmitFinal({
                    ...applicationForm,
                    aadhaarDoc: docs.aadhaarDoc,
                    incomeDoc: docs.incomeDoc,
                    voDoc: docs.voDoc,
                    clfDoc: docs.clfDoc,
                });
            }
        } catch (e) {
            setErrorMessage("Failed to submit application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderDocCard = (key, title, badgeText, badgeStyle, badgeTextStyle) => {
        const item = docs[key];
        return (
            <View style={styles.docCard}>
                <View style={styles.docCardHeader}>
                    <View style={styles.docTitleGroup}>
                        <Text style={styles.docEmoji}>📄</Text>
                        <Text style={styles.docTitle}>{title}</Text>
                        <Text style={styles.mandatoryTag}>*Mandatory</Text>
                    </View>
                    {badgeText ? (
                        <View style={badgeStyle}>
                            <Text style={badgeTextStyle}>{badgeText}</Text>
                        </View>
                    ) : (
                        <Text style={styles.fileSizeText}>Max 2MB</Text>
                    )}
                </View>

                {item.uploaded ? (
                    <View style={styles.successUploadBox}>
                        <View style={styles.successLeft}>
                            <Text style={styles.checkEmoji}>✅</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.fileNameText} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.fileSubText}>Attached ({item.size})</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => handleRemove(key)} style={styles.trashBtn}>
                            <Text style={styles.trashEmoji}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => handlePickDocument(key)} style={styles.uploadButtonBox} activeOpacity={0.7}>
                        <Text style={styles.uploadButtonIcon}>📁</Text>
                        <Text style={styles.uploadButtonText}>Browse Phone Storage (PDF / JPG)</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Top Bar with Back Button & Stage Badge */}
                    <View style={styles.topBarRow}>
                        {onBackToForm && (
                            <TouchableOpacity onPress={onBackToForm} activeOpacity={0.7} style={styles.backButtonContainer}>
                                <Text style={styles.backArrowSymbol}>←</Text>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.headerArea}>
                        <Text style={styles.headerTitle}>Upload Verified Documents</Text>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Attach Identity Proof & VO/CLF Endorsements</Text>
                        <Text style={styles.description}>Upload certified PDF or image copies verified by Village Organisation (VO) and Cluster Level Federation (CLF).</Text>
                    </View>

                    <View style={styles.amberBanner}>
                        <Text style={styles.amberIcon}>🛡️</Text>
                        <View style={styles.amberTextGroup}>
                            <Text style={styles.amberTitle}>Hard Gate Verification Requirement:</Text>
                            <Text style={styles.amberDesc}>Per scheme process rules, application cannot proceed without VO and CLF-verified document copies.</Text>
                        </View>
                    </View>

                    <View style={styles.docListContainer}>
                        {renderDocCard("aadhaarDoc", "1. Identity Proof & PAN Proof")}
                        {renderDocCard("incomeDoc", "2. Income Proof / Self Declaration")}
                        {renderDocCard("voDoc", "3. VO Verification Copy", "VO Seal", styles.blueBadge, styles.blueBadgeText)}
                        {renderDocCard("clfDoc", "4. CLF Verification Copy", "CLF Seal", styles.purpleBadge, styles.purpleBadgeText)}
                    </View>

                    {errorMessage ? (
                        <View style={styles.errorBanner}>
                            <Text style={styles.errorIcon}>⚠️</Text>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}
                </ScrollView>

                <View style={styles.footerContainer}>
                    <CustomButton
                        title="Lock & Submit Application"
                        onPress={handleSubmit}
                        disabled={!allMandatoryAttached || isLoading}
                        isLoading={isLoading}
                        loadingText="Locking Form & Submitting..."
                        icon="🔒"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40, gap: 16 },
    topBarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    headerArea: { flexDirection: "row", alignItems: "center", gap: 8 },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    headerTitle: { fontSize: 12, fontWeight: "600", color: "#64748b", textTransform: "uppercase" },
    titleContainer: { gap: 4 },
    title: { fontSize: 20, fontWeight: "800", color: "#0f172a", letterSpacing: -0.5 },
    description: { fontSize: 12, color: "#475569", lineHeight: 18 },
    amberBanner: { flexDirection: "row", backgroundColor: "#fffbeb", borderColor: "#fcd34d", borderWidth: 1, padding: 12, borderRadius: 12, gap: 10, alignItems: "flex-start" },
    amberIcon: { fontSize: 16, marginTop: 2 },
    amberTextGroup: { flex: 1, gap: 2 },
    amberTitle: { fontSize: 12, fontWeight: "700", color: "#451a03" },
    amberDesc: { fontSize: 11, color: "#92400e", lineHeight: 16 },
    docListContainer: { gap: 12 },
    docCard: { backgroundColor: "#ffffff", padding: 14, borderRadius: 16, borderWidth: 1, borderColor: "#e2e8f0", gap: 10 },
    docCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    docTitleGroup: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
    docEmoji: { fontSize: 14 },
    docTitle: { fontSize: 12, fontWeight: "700", color: "#1e293b" },
    mandatoryTag: { fontSize: 10, fontWeight: "700", color: "#e11d48" },
    fileSizeText: { fontSize: 10, color: "#94a3b8", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    blueBadge: { backgroundColor: "#e0f2fe", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    blueBadgeText: { fontSize: 9, fontWeight: "700", color: "#0369a1" },
    purpleBadge: { backgroundColor: "#f3e8ff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    purpleBadgeText: { fontSize: 9, fontWeight: "700", color: "#7e22ce" },
    successUploadBox: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ecfdf5", borderColor: "#a7f3d0", borderWidth: 1, padding: 10, borderRadius: 10 },
    successLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
    checkEmoji: { fontSize: 14 },
    fileNameText: { fontSize: 12, fontWeight: "600", color: "#0f172a" },
    fileSubText: { fontSize: 10, color: "#047857", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    trashBtn: { padding: 4 },
    trashEmoji: { fontSize: 16 },
    uploadButtonBox: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, backgroundColor: "#f8fafc", borderWidth: 2, borderStyle: "dashed", borderColor: "#cbd5e1", paddingVertical: 12, borderRadius: 10 },
    uploadButtonIcon: { fontSize: 14 },
    uploadButtonText: { fontSize: 12, fontWeight: "600", color: "#475569" },
    errorBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff1f2", borderColor: "#fecdd3", borderWidth: 1, padding: 12, borderRadius: 12, gap: 8 },
    errorIcon: { fontSize: 14 },
    errorText: { color: "#9f1239", fontSize: 12, flex: 1 },
    footerContainer: { padding: 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0" },
});