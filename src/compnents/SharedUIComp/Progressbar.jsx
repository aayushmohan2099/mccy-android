import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({
    currentStep = 2,
    totalSteps = 3,
    title,
    showPercentage = true,
}) {

    const percentage = (currentStep / totalSteps) * 100;

    return (
        <View style={styles.container}>

            {title && (
                <Text style={styles.title}>
                    {title}
                </Text>
            )}

            <View style={styles.infoRow}>
                <Text style={styles.stepText}>
                    Step {currentStep} of {totalSteps}
                </Text>

                {showPercentage && (
                    <Text style={styles.percentText}>
                        {Math.round(percentage)}%
                    </Text>
                )}
            </View>

            <View style={styles.track}>
                <View
                    style={[
                        styles.progress,
                        { width: `${percentage}%` },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 12,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    stepText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },

    percentText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#059669",
    },

    track: {
        width: "100%",
        height: 12,
        backgroundColor: "#E2E8F0",
        borderRadius: 100,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        backgroundColor: "#059669",
        borderRadius: 100,
    },
});

