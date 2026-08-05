import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

export function CustomButton({
    title,
    onPress,
    disabled,
    isLoading,
    loadingText,
    icon,
    rightArrow = true,
    style
}) {
    return (
        <TouchableOpacity
            style={[styles.submitButton, disabled && styles.submitButtonDisabled, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <View style={styles.buttonRow}>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text style={styles.submitButtonText}>{loadingText || "Processing..."}</Text>
                </View>
            ) : (
                <View style={styles.buttonRow}>
                    {icon ? <Text style={styles.buttonIcon}>{icon}</Text> : null}
                    <Text style={styles.submitButtonText}>{title}</Text>
                    {rightArrow ? <Text style={styles.buttonArrow}>→</Text> : null}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: "#059669",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    submitButtonDisabled: {
        backgroundColor: "#e2e8f0",
        borderColor: "#cbd5e1",
        borderWidth: 1
    },
    buttonRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        position: "relative"
    },
    submitButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700"
    },
    buttonIcon: {
        fontSize: 14
    },
    buttonArrow: {
        position: "absolute",
        right: 8,
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    }
});