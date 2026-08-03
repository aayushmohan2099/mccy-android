import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";

export function ProfileConfirmationScreen({ profileData = {}, onConfirmCreate, onBackToShgMember }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (onConfirmCreate) {
                onConfirmCreate(profileData);
            }
        }, 600);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Navigation Row with Back Button */}
                <View style={styles.topBarRow}>
                    {onBackToShgMember && (
                        <TouchableOpacity onPress={onBackToShgMember} activeOpacity={0.7} style={styles.backButtonContainer}>
                            <Text style={styles.backArrowSymbol}>←</Text>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    )}
                    {/* <View style={styles.badge}><Text style={styles.badgeText}>Stage 1.3.7</Text></View> */}
                </View>

                {/* Header Information */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Confirm Profile Creation</Text>
                    <Text style={styles.description}>
                        Please review your selected jurisdictional and member mapping details before creating your profile.
                    </Text>
                </View>

                {/* Profile Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderIcon}>📋</Text>
                        <Text style={styles.cardHeaderText}>Mapped Profile Summary</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>District:</Text>
                        <Text style={styles.detailValue}>{profileData.district || "Patna"}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Block / Unit:</Text>
                        <Text style={styles.detailValue}>{profileData.block || "Phulwari"}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Panchayat:</Text>
                        <Text style={styles.detailValue}>{profileData.panchayat || "Khagaul"}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>SHG Name:</Text>
                        <Text style={styles.detailValue}>{profileData.shgName || "Maa Durga SHG"}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>SHG ID:</Text>
                        <Text style={[styles.detailValue, styles.fontMono]}>{profileData.shgId || "SHG-PTN-0101"}</Text>
                    </View>

                    <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                        <Text style={styles.detailLabel}>Member Name:</Text>
                        <Text style={[styles.detailValue, styles.boldText]}>👤 {profileData.fullName || profileData.memberName || "Sunita Devi"}</Text>
                    </View>
                </View>

                {/* Info Note
                <View style={styles.infoBanner}>
                    <Text style={styles.infoBannerText}>
                        <Text style={styles.boldText}>Note:</Text> Once confirmed, your primary profile will be registered, and you can proceed to track live status or submit fresh applications.
                    </Text>
                </View> */}

            </ScrollView>

            {/* Footer Confirm Button */}
            <View style={styles.footerContainer}>
                <CustomButton
                    title="Confirm & Create Profile"
                    onPress={handleConfirm}
                    isLoading={isLoading}
                    loadingText="Creating Profile..."
                    rightArrow={true}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scrollContent: { padding: 24, paddingBottom: 40, gap: 20 },
    topBarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    titleContainer: { gap: 4 },
    title: { fontSize: 30, fontWeight: "800", color: "#0f172a", letterSpacing: -0.5 },
    description: { fontSize: 17, color: "#000000", lineHeight: 18 },
    card: { backgroundColor: "#ffffff", padding: 20, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, gap: 14 },
    cardHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 10, marginBottom: 4 },
    cardHeaderIcon: { fontSize: 18 },
    cardHeaderText: { fontSize: 21, fontWeight: "700", color: "#1e293b", textTransform: "uppercase" },
    detailRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#f8fafc" },
    detailLabel: { fontSize: 18, color: "#64748b", fontWeight: "600" },
    detailValue: { fontSize: 18, color: "#0f172a", fontWeight: "700" },
    fontMono: { fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    boldText: { fontWeight: "800", color: "#059669" },
    infoBanner: { backgroundColor: "#fffbeb", borderColor: "#fde68a", borderWidth: 1, padding: 12, borderRadius: 12 },
    infoBannerText: { fontSize: 11, color: "#78350f", lineHeight: 16 },
    footerContainer: { padding: 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0" }
});