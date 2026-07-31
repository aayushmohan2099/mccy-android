import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from "react-native";

export function DraftListScreen({ savedDraft, resumeDraft, onBack }) {
    return (
        <SafeAreaView style={styles.adminSafe}>
            <View style={styles.adminContainer}>
                <View style={styles.topBarRow}>
                    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButtonContainer}>
                        <Text style={styles.backArrowSymbol}>←</Text>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.badge}><Text style={styles.badgeText}>Drafts Manager</Text></View>
                </View>

                <View style={styles.adminHeader}>
                    <Text style={styles.adminEmoji}>📂</Text>
                    <Text style={styles.adminTitle}>Your Saved Drafts</Text>
                    <Text style={styles.adminSubtitle}>
                        Click on the draft below to resume filling your form right from where you left off.
                    </Text>
                </View>

                {savedDraft ? (
                    <View style={styles.portalCardsList}>
                        <TouchableOpacity
                            style={styles.draftItemCard}
                            activeOpacity={0.8}
                            onPress={resumeDraft}
                        >
                            <View style={styles.draftTextGroup}>
                                <Text style={styles.draftItemTitle}>
                                    {savedDraft.memberName ? `Name: ${savedDraft.memberName}` : "Incomplete Application"}
                                </Text>
                                <Text style={styles.draftItemSub}>
                                    Enterprise: {savedDraft.enterpriseName || "Not Specified"} | Last saved at Step {savedDraft.activeFormStep || 1} of 4
                                </Text>
                            </View>
                            <Text style={styles.resumeButtonText}>Resume →</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.emptyStateBox}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.emptyTitle}>No Drafts Available</Text>
                        <Text style={styles.emptyDesc}>You do not have any saved draft forms right now.</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    adminSafe: { flex: 1, backgroundColor: "#f8fafc" },
    adminContainer: { flex: 1, padding: 24, justifyContent: "center", gap: 20 },
    topBarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    adminHeader: { alignItems: "center", gap: 8 },
    adminEmoji: { fontSize: 36 },
    adminTitle: { fontSize: 22, fontWeight: "800", color: "#0f172a", textAlign: "center" },
    adminSubtitle: { fontSize: 12, color: "#475569", textAlign: "center", lineHeight: 18 },
    portalCardsList: { gap: 12 },
    draftItemCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#f59e0b", justifyContent: "space-between" },
    draftTextGroup: { flex: 1, gap: 2 },
    draftItemTitle: { fontSize: 13, fontWeight: "700", color: "#1e293b" },
    draftItemSub: { fontSize: 11, color: "#64748b" },
    resumeButtonText: { fontSize: 12, fontWeight: "800", color: "#d97706" },
    emptyStateBox: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 8 },
    emptyEmoji: { fontSize: 48, marginBottom: 4 },
    emptyTitle: { fontSize: 16, fontWeight: "800", color: "#1e293b" },
    emptyDesc: { fontSize: 12, color: "#64748b", textAlign: "center", lineHeight: 18 },
});