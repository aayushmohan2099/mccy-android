import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faUser,
    faChartLine,
    faRightFromBracket,
    faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

const translations = {
    en: {
        registerLogin: "Register/Login",
        status: "Status",
        account: "Account",

        accountDrafts: "Account & Drafts",
        chooseAction: "Choose an action",

        cancel: "Cancel",
        viewDrafts: "View Drafts",
        logout: "Logout",

        logoutConfirmation: "Logout Confirmation",
        logoutQuestion: "Are you sure you want to log out?",
        yesLogout: "Yes, Logout",
    },

    hi: {
        registerLogin: "पंजीकरण/लॉगिन",
        status: "स्थिति",
        account: "खाता",

        accountDrafts: "खाता एवं ड्राफ्ट",
        chooseAction: "एक विकल्प चुनें",

        cancel: "रद्द करें",
        viewDrafts: "ड्राफ्ट देखें",
        logout: "लॉगआउट",

        logoutConfirmation: "लॉगआउट की पुष्टि",
        logoutQuestion: "क्या आप वाकई लॉगआउट करना चाहते हैं?",
        yesLogout: "हाँ, लॉगआउट करें",
    },
};

export function BottomNav({
    activeTab,
    setActiveTab,
    onLogout,
    onViewDrafts,
    language,
}) {
    const t = translations[language] || translations.en;

    const navItems = [
        {
            id: "register",
            label: t.registerLogin,
            icon: faUser,
        },
        {
            id: "status",
            label: t.status,
            icon: faChartLine,
        },
        {
            id: "logout-menu",
            label: t.account,
            icon: faRightFromBracket,
        },
    ];

    const handleTabPress = (id) => {
        if (id === "logout-menu") {
            Alert.alert(
                t.accountDrafts,
                t.chooseAction,
                [
                    {
                        text: t.cancel,
                        style: "cancel",
                    },
                    {
                        text: t.viewDrafts,
                        onPress: () => {
                            if (onViewDrafts) {
                                onViewDrafts();
                            }
                        },
                    },
                    {
                        text: t.logout,
                        style: "destructive",
                        onPress: () => {
                            Alert.alert(
                                t.logoutConfirmation,
                                t.logoutQuestion,
                                [
                                    {
                                        text: t.cancel,
                                        style: "cancel",
                                    },
                                    {
                                        text: t.yesLogout,
                                        style: "destructive",
                                        onPress: () => {
                                            if (onLogout) {
                                                onLogout();
                                            }
                                        },
                                    },
                                ]
                            );
                        },
                    },
                ]
            );
        } else {
            setActiveTab(id);
        }
    };

    return (
        <View style={styles.navContainer}>
            <View style={styles.navRow}>

                {navItems.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleTabPress(item.id)}
                            activeOpacity={0.8}
                            style={[
                                styles.navItem,
                                isActive && styles.navItemActive,
                            ]}
                        >

                            {/* Icon */}
                            <View
                                style={[
                                    styles.iconContainer,
                                    isActive && styles.iconContainerActive,
                                ]}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    size={20}
                                    color={
                                        isActive
                                            ? "#fbbf24"
                                            : "#94a3b8"
                                    }
                                />
                            </View>

                            {/* Label */}
                            <Text
                                style={[
                                    styles.label,
                                    isActive && styles.labelActive,
                                ]}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>

                            {/* Badge */}
                            {item.badge && (
                                <View
                                    style={[
                                        styles.badge,
                                        isActive
                                            ? styles.badgeActive
                                            : styles.badgeInactive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.badgeText,
                                            isActive
                                                ? styles.badgeTextActive
                                                : styles.badgeTextInactive,
                                        ]}
                                    >
                                        {item.badge}
                                    </Text>
                                </View>
                            )}

                        </TouchableOpacity>
                    );
                })}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    navContainer: {
        backgroundColor: "#0f172a",
        borderTopWidth: 1,
        borderTopColor: "#1e293b",
        paddingHorizontal: 8,
        paddingVertical: 8,
    },

    navRow: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
    },

    navItem: {
        flex: 1,
        minHeight: 58,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        paddingVertical: 6,
    },

    navItemActive: {
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(245, 158, 11, 0.35)",
    },

    iconContainer: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2,
    },

    iconContainerActive: {
        transform: [{ scale: 1.05 }],
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#94a3b8",
        textAlign: "center",
    },

    labelActive: {
        color: "#fbbf24",
        fontWeight: "700",
    },

    badge: {
        minWidth: 30,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        marginTop: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    badgeInactive: {
        backgroundColor: "#1e293b",
    },

    badgeActive: {
        backgroundColor: "#fbbf24",
    },

    badgeText: {
        fontSize: 8,
        fontWeight: "600",
        textAlign: "center",
    },

    badgeTextInactive: {
        color: "#94a3b8",
    },

    badgeTextActive: {
        color: "#030712",
        fontWeight: "800",
    },
});