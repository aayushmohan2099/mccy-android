import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    Image,
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
    image,
    imageStyle,
    svgIconProps,
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
        "imageAction",
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

        // ---------------- IMAGE ACTION ----------------
        // Dark pill button with an image/icon chip on the left,
        // bold white label, and a chevron on the right.
        // Pass `image` as either a require(...)/{ uri } source (PNG/JPG)
        // OR an imported .svg component (react-native-svg-transformer) —
        // both work through the same prop.
        imageAction: {
            button: styles.imageActionButton,
            text: styles.imageActionText,
            loader: "#ffffff",
            loadingText: "Please wait...",
        },
    };

    const current = variantStyles[buttonVariant];
    const isImageVariant = buttonVariant === "imageAction";

    // SVGs imported via react-native-svg-transformer come in as a
    // component (a function), not a source object/number like PNGs do.
    // JSX requires a capitalized reference to render a variable as a tag,
    // so we alias it here before using it below.
    const SvgComponent = typeof image === "function" ? image : null;

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
            ) : isImageVariant ? (
                <>
                    <View style={styles.imageChip}>
                        {SvgComponent ? (
                            <SvgComponent width={40} height={40} {...svgIconProps} />
                        ) : image ? (
                            <Image
                                source={image}
                                style={[styles.image, imageStyle]}
                                resizeMode="cover"
                            />
                        ) : null}
                    </View>

                    <Text
                        style={[current.text, textStyle]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>

                    <Text style={styles.chevron}>{rightIcon || "\u203A"}</Text>
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

    // ---------------- IMAGE ACTION ----------------
    imageActionButton: {
        backgroundColor: "#2C3253",
        borderRadius: 10,
        height: 52,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },

    imageActionText: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "600",
        marginLeft: 16,
        marginRight: 10,
    },

    imageChip: {
        width: 48,
        height: 52,
        backgroundColor: "#F3ECD9",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    chevron: {
        color: "#fff",
        fontSize: 40,
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