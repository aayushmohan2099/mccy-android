import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from "react-native";
import Button from "../compnents/SharedUIComp/Button";
import Back1 from '../assets/images/back1.png';
import BGImage from '../assets/images/bg.png';

const STATUS_FLOW = [
    "Pending At BMMU",
    "Pending At DMMU",
    "Pending At Bank",
    "Sanctioned / Approved",
    "Reverted From BMMU",
    "Reverted To BMMU",
    "Reverted To DMMU",
];

export function ApplicationDetailsScreen({
    application,
    onBack,
    onStatusChange,   // <-- add this
}) {
    if (!application) return null;
    const [applicationData, setApplicationData] = useState(application);
    const handleNextStatus = () => {
        const currentIndex = STATUS_FLOW.indexOf(applicationData.status);

        // If it reaches the last status, start again from the first
        const nextIndex =
            currentIndex === STATUS_FLOW.length - 1
                ? 0
                : currentIndex + 1;

        const updatedApplication = {
            ...applicationData,
            status: STATUS_FLOW[nextIndex],
        };

        setApplicationData(updatedApplication);

        if (onStatusChange) {
            onStatusChange(updatedApplication);
        }
    };
    const DetailRow = ({ label, value }) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value || "-"}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={BGImage}
                style={styles.background}
                resizeMode="cover"
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity> */}
                    <Button
                        variant="back"
                        image={Back1}
                        onPress={onBack}
                        style={{
                            marginTop: 10,
                            alignSelf: "flex-start",
                        }}
                        imageStyle={{
                            width: 30,
                            height: 30,
                        }}
                    />

                    <Text style={styles.title}>
                        Application Details
                    </Text>

                    {/* Personal Details */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>
                            👤 Personal Details
                        </Text>

                        <DetailRow
                            label="Status"
                            value={applicationData.status}
                        />
                        <DetailRow label="Mobile" value={applicationData.mobile} />
                        <DetailRow label="District" value={applicationData.district} />
                        <DetailRow label="Block" value={applicationData.block} />
                    </View>

                    {/* Enterprise */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>
                            🏢 Enterprise Details
                        </Text>

                        <DetailRow
                            label="Enterprise"
                            value={applicationData.enterpriseName}
                        />

                        <DetailRow
                            label="Loan Amount"
                            value={`₹${applicationData.requiredCapital}`}
                        />
                    </View>

                    {/* Bank */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>
                            🏦 Bank Details
                        </Text>

                        <DetailRow
                            label="Bank Name"
                            value={applicationData.selectedBankName}
                        />

                        <DetailRow
                            label="Branch"
                            value={applicationData.branchName}
                        />

                        <DetailRow
                            label="Account Number"
                            value={applicationData.accountNumber}
                        />

                        <DetailRow
                            label="IFSC"
                            value={applicationData.ifscCode}
                        />
                    </View>

                    {/* Status */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>
                            📋 Application Status
                        </Text>

                        <DetailRow
                            label="Status"
                            value={applicationData.status}
                        />

                        <DetailRow
                            label="Applied On"
                            value={applicationData.submittedAt}
                        />
                    </View>
                    <Button
                        title="Next Status"
                        variant="primary"
                        onPress={handleNextStatus}
                        style={{
                            marginTop: 20,
                            marginBottom: 30,
                        }}
                    />
                </ScrollView>
            </ImageBackground>
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
    background: {
        flex: 1,
    },
});