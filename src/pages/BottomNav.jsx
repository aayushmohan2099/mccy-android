import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";

export function BottomNav({ activeTab, setActiveTab, onLogout, onViewDrafts }) {
    const navItems = [
        { id: "register", label: "Register/Login", icon: "👤" },
        { id: "status", label: "Status Tracker", icon: "📈", badge: "Live Status" },
        { id: "logout-menu", label: "Logout / Drafts", icon: "🚪", badge: "Menu" }
    ];

    const handleTabPress = (id) => {
        if (id === "logout-menu") {
            Alert.alert(
                "Account & Drafts Menu",
                "Choose an action below:",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "📂 View Drafts",
                        onPress: () => {
                            if (onViewDrafts) onViewDrafts();
                        }
                    },
                    {
                        text: "🚪 Logout",
                        style: "destructive",
                        onPress: () => {
                            Alert.alert(
                                "Logout Confirmation",
                                "Are you sure you want to log out?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    {
                                        text: "Yes, Logout",
                                        style: "destructive",
                                        onPress: () => {
                                            if (onLogout) onLogout();
                                        }
                                    }
                                ]
                            );
                        }
                    }
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
                            activeOpacity={0.7}
                            style={[
                                styles.navItem,
                                isActive && styles.navItemActive
                            ]}
                        >
                            <Text style={[styles.icon, isActive && styles.iconActive]}>
                                {item.icon}
                            </Text>

                            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
                                {item.label}
                            </Text>

                            {item.badge && (
                                <View style={[
                                    styles.badge,
                                    isActive ? styles.badgeActive : styles.badgeInactive
                                ]}>
                                    <Text style={[
                                        styles.badgeText,
                                        isActive ? styles.badgeTextActive : styles.badgeTextInactive
                                    ]}>
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
    navContainer: { backgroundColor: "#0f172a", borderTopWidth: 1, borderTopColor: "#1e293b", paddingHorizontal: 4, paddingVertical: 6 },
    navRow: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", maxWidth: 500, alignSelf: "center", width: "100%" },
    navItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 4, paddingHorizontal: 2, borderRadius: 12 },
    navItemActive: { backgroundColor: "rgba(245, 158, 11, 0.15)", borderWidth: 1, borderColor: "rgba(245, 158, 11, 0.3)" },
    icon: { fontSize: 18, marginBottom: 2, color: "#94a3b8" },
    iconActive: { transform: [{ scale: 1.1 }], color: "#fbbf24" },
    label: { fontSize: 10, color: "#94a3b8", letterSpacing: -0.2, textAlign: "center", width: "100%" },
    labelActive: { color: "#fbbf24", fontWeight: "600" },
    badge: { paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
    badgeInactive: { backgroundColor: "#1e293b" },
    badgeActive: { backgroundColor: "#fbbf24" },
    badgeText: { fontSize: 8, fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", textAlign: "center", lineHeight: 10 },
    badgeTextInactive: { color: "#94a3b8" },
    badgeTextActive: { color: "#030712", fontWeight: "700" }
});