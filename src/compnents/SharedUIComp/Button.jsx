
import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

export default function Button({
    variant,
    title,
    onPress,
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    style,
    textStyle,
}) {

    // Default variant if nothing or invalid is passed
    const buttonVariant = [
        "login",
        "logout",
        "primary",
        "secondary",
        "outline",
        "danger",
    ].includes(variant)
        ? variant
        : "default";

    const variantStyles = {
        default: {
            button: styles.defaultButton,
            text: styles.defaultText,
            loader: "#ffffff",
            loadingText: "Processing...",
        },

        primary: {
            button: styles.primaryButton,
            text: styles.primaryText,
            loader: "#ffffff",
            loadingText: "Please wait...",
        },

        secondary: {
            button: styles.secondaryButton,
            text: styles.secondaryText,
            loader: "#0F766E",
            loadingText: "Please wait...",
        },

        outline: {
            button: styles.outlineButton,
            text: styles.outlineText,
            loader: "#059669",
            loadingText: "Please wait...",
        },

        login: {
            button: styles.loginButton,
            text: styles.loginText,
            loader: "#ffffff",
            loadingText: "Logging In...",
        },

        logout: {
            button: styles.logoutButton,
            text: styles.logoutText,
            loader: "#ffffff",
            loadingText: "Logging Out...",
        },

        danger: {
            button: styles.dangerButton,
            text: styles.dangerText,
            loader: "#ffffff",
            loadingText: "Deleting...",
        },
    };

    const current = variantStyles[buttonVariant];

    return (
        <TouchableOpacity
            style={[
                current.button,
                disabled && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {loading ? (
                <>
                    <ActivityIndicator color={current.loader} />
                    <Text style={[current.text, textStyle]}>
                        {current.loadingText}
                    </Text>
                </>
            ) : (
                <>
                    {leftIcon && (
                        <Text style={styles.icon}>{leftIcon}</Text>
                    )}

                    <Text style={[current.text, textStyle]}>
                        {title}
                    </Text>

                    {rightIcon && (
                        <Text style={styles.icon}>{rightIcon}</Text>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // ---------------- DEFAULT ----------------
    defaultButton: {
        backgroundColor: "#64748B",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    defaultText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- PRIMARY ----------------
    primaryButton: {
        backgroundColor: "#059669",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    primaryText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- SECONDARY ----------------
    secondaryButton: {
        backgroundColor: "#F1F5F9",
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    secondaryText: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- OUTLINE ----------------
    outlineButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#059669",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    outlineText: {
        color: "#059669",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- LOGIN ----------------
    loginButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    loginText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- LOGOUT ----------------
    logoutButton: {
        backgroundColor: "#F97316",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    logoutText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- DANGER ----------------
    dangerButton: {
        backgroundColor: "#DC2626",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    dangerText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // ---------------- COMMON ----------------
    disabled: {
        opacity: 0.5,
    },

    icon: {
        fontSize: 18,
    },
});