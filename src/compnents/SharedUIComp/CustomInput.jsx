import React from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

export function CustomInput({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    maxLength,
    editable,
    prefix,
    secureTextEntry
}) {
    return (
        <View style={styles.inputGroup}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <View style={[styles.inputContainer, value && value.length > 0 && styles.inputContainerActive]}>
                {prefix ? (
                    <View style={styles.prefixContainer}>
                        <Text style={styles.prefixText}>{prefix}</Text>
                    </View>
                ) : null}
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    keyboardType={keyboardType || "default"}
                    maxLength={maxLength}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: {
        gap: 8
    },
    label: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1e293b"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
        borderWidth: 1,
        borderRadius: 12,
        overflow: "hidden"
    },
    inputContainerActive: {
        backgroundColor: "#ffffff",
        borderColor: "#059669"
    },
    prefixContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        borderRightWidth: 1,
        borderRightColor: "#e2e8f0",
        height: "100%",
        gap: 4
    },
    prefixText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748b"
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace"
    }
});