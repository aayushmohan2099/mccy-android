import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export function ApplicationDetailsScreen({
    application,
    onBack,
}) {
    if (!application) return null;

    const DetailRow = ({ label, value }) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value || "-"}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Application Details
                </Text>

                {/* Personal Details */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        👤 Personal Details
                    </Text>

                    <DetailRow label="Name" value={application.memberName} />
                    <DetailRow label="Mobile" value={application.mobile} />
                    <DetailRow label="District" value={application.district} />
                    <DetailRow label="Block" value={application.block} />
                </View>

                {/* Enterprise */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        🏢 Enterprise Details
                    </Text>

                    <DetailRow
                        label="Enterprise"
                        value={application.enterpriseName}
                    />

                    <DetailRow
                        label="Loan Amount"
                        value={`₹${application.requiredCapital}`}
                    />
                </View>

                {/* Bank */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        🏦 Bank Details
                    </Text>

                    <DetailRow
                        label="Bank Name"
                        value={application.selectedBankName}
                    />

                    <DetailRow
                        label="Branch"
                        value={application.branchName}
                    />

                    <DetailRow
                        label="Account Number"
                        value={application.accountNumber}
                    />

                    <DetailRow
                        label="IFSC"
                        value={application.ifscCode}
                    />
                </View>

                {/* Status */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        📋 Application Status
                    </Text>

                    <DetailRow
                        label="Status"
                        value={application.status}
                    />

                    <DetailRow
                        label="Applied On"
                        value={application.submittedAt}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    backButton: {
        alignSelf: "flex-start",
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20,
    },

    backText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#334155",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 20,
        textAlign: "center",
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2563eb",
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        paddingVertical: 10,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#475569",
    },

    value: {
        flex: 1,
        textAlign: "right",
        fontSize: 16,
        color: "#0f172a",
        fontWeight: "500",
        marginLeft: 10,
    },
});