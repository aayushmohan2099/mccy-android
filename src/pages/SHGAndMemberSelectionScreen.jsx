import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";
import Button from "../compnents/SharedUIComp/Button";
import Back from "../assets/images/back.svg";

// --- Mock Data Mapping: Panchayat -> SHGs -> Members ---
const PANCHAYAT_SHG_MAPPING = {
    "Khagaul": [
        {
            shgName: "Maa Durga SHG",
            shgId: "SHG-PTN-0101",
            members: ["Sunita Devi", "Kusum Kumari", "Rekha Sharma", "Anita Singh"]
        },
        {
            shgName: "Saraswati SHG",
            shgId: "SHG-PTN-0102",
            members: ["Pooja Verma", "Geeta Devi", "Meena Kumari"]
        }
    ],
    "Danapur Nizamat": [
        {
            shgName: "Lakshmi SHG",
            shgId: "SHG-PTN-0201",
            members: ["Anita Devi", "Pushpa Roy", "Suman Lata"]
        },
        {
            shgName: "Ganga SHG",
            shgId: "SHG-PTN-0202",
            members: ["Nirmala Devi", "Radha Sinha", "Arti Kumari"]
        }
    ],
    "Mastipur": [
        {
            shgName: "Shanti SHG",
            shgId: "SHG-GAY-0101",
            members: ["Kiran Devi", "Pushpa Devi", "Shanti Kumari"]
        },
        {
            shgName: "Pragati SHG",
            shgId: "SHG-GAY-0102",
            members: ["Usha Devi", "Munni Khatun", "Rinku Devi"]
        }
    ]
};

const DEFAULT_SHG_LIST = [
    {
        shgName: "Ekta Mahila SHG",
        shgId: "SHG-GEN-9991",
        members: ["Applicant (Self Entry)", "Priyanka Kumari", "Anamika Roy"]
    }
];

const translations = {
    en: {
        title: "Select SHG & Member",
        description: "Selected Panchayat:",
        description2:
            "Please select your Self Help Group and Member profile.",

        shg: "1. Select Village Organisation / SHG",
        member: "2. Select Member Profile",

        mapping: "Selected Profile Mapping",
        proceed: "Proceed to Application Form",
        back: "Back",
        id: "ID",
    },

    hi: {
        title: "एसएचजी एवं सदस्य चुनें",
        description: "चयनित पंचायत:",
        description2:
            "कृपया अपना स्वयं सहायता समूह और सदस्य प्रोफ़ाइल चुनें।",

        shg: "1. ग्राम संगठन / स्वयं सहायता समूह चुनें",
        member: "2. सदस्य प्रोफ़ाइल चुनें",

        mapping: "चयनित प्रोफ़ाइल",
        proceed: "आवेदन फॉर्म पर जाएँ",
        back: "वापस",
        id: "आईडी",
    },
};

export function SHGAndMemberSelectionScreen({
    language,
    locationData = {},
    initialSelection = {},
    onProceedToForm,
    onBackToLocation,
}) {
    const t = translations[language || "en"];
    const panchayatKey = locationData.panchayat || "Khagaul";
    const availableShgs = PANCHAYAT_SHG_MAPPING[panchayatKey] || DEFAULT_SHG_LIST;

    const [selectedShg, setSelectedShg] = useState(initialSelection.shgName || availableShgs[0].shgName);

    const currentShgObj = availableShgs.find((s) => s.shgName === selectedShg) || availableShgs[0];
    const [selectedMember, setSelectedMember] = useState(initialSelection.memberName || currentShgObj.members[0]);

    const handleShgSelect = (shgName) => {
        setSelectedShg(shgName);
        const shgObj = availableShgs.find((s) => s.shgName === shgName);
        if (shgObj && shgObj.members.length > 0) {
            setSelectedMember(shgObj.members[0]);
        }
    };

    const handleNext = () => {
        const shgAndMemberDetails = {
            ...locationData,
            shgName: currentShgObj.shgName,
            shgId: currentShgObj.shgId,
            fullName: selectedMember === "Applicant (Self Entry)" ? "" : selectedMember,
            shgMembershipId: currentShgObj.shgId + "-M1",
        };

        if (onProceedToForm) {
            onProceedToForm(shgAndMemberDetails);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Navigation Row */}
                <View style={styles.topBarRow}>
                    {onBackToLocation && (
                        // <TouchableOpacity onPress={onBackToLocation} activeOpacity={0.7} style={styles.backButtonContainer}>
                        //     <Text style={styles.backArrowSymbol}>←</Text>
                        //     <Text style={styles.backButtonText}>
                        //         {t.back}
                        //     </Text>
                        // </TouchableOpacity>
                        <Button
                            variant="imageAction"
                            title={t.back}
                            image={Back}
                            onPress={onBackToLocation}
                            style={{
                                marginTop: 10,
                                width: "50%",
                            }}
                        />
                    )}
                </View>

                {/* Header Information */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {t.title}
                    </Text>
                    <Text style={styles.description}>
                        {t.description}{" "}
                        <Text style={styles.boldText}>{panchayatKey}</Text>.{" "}
                        {t.description2}
                    </Text>
                </View>

                <View style={styles.card}>

                    {/* 1. SHG Selector */}
                    <View style={styles.sectionGroup}>
                        <Text style={styles.label}>
                            {t.shg}
                        </Text>
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {availableShgs.map((shg) => {
                                const isSelected = selectedShg === shg.shgName;
                                return (
                                    <TouchableOpacity
                                        key={shg.shgId}
                                        activeOpacity={0.7}
                                        onPress={() => handleShgSelect(shg.shgName)}
                                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                                    >
                                        <View>
                                            <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                                                {shg.shgName}
                                            </Text>
                                            <Text style={styles.subCodeText}>
                                                {t.id}: {shg.shgId}
                                            </Text>
                                        </View>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* 2. Member Selector */}
                    <View style={styles.sectionGroup}>
                        <Text style={styles.label}>
                            {t.member} ({selectedShg})
                        </Text>
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {currentShgObj.members.map((mem) => {
                                const isSelected = selectedMember === mem;
                                return (
                                    <TouchableOpacity
                                        key={mem}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedMember(mem)}
                                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                                    >
                                        <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                                            👤 {mem}
                                        </Text>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Mapping Summary Pill */}
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>
                            {t.mapping}
                        </Text>
                        <Text style={styles.summaryText}>
                            🏢 {selectedShg} &gt; 👤 {selectedMember}
                        </Text>
                    </View>

                </View>
            </ScrollView>

            {/* Footer Proceed Button */}
            <View style={styles.footerContainer}>
                <CustomButton
                    title={t.proceed}
                    onPress={handleNext}
                    rightArrow={true}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scrollContent: { padding: 24, paddingBottom: 40, gap: 20 },
    topBarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    badge: { backgroundColor: "#fef3c7", borderColor: "#fcd34d", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: "#78350f", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    titleContainer: { gap: 4 },
    title: { fontSize: 30, fontWeight: "800", color: "#0f172a", letterSpacing: -0.5 },
    description: { fontSize: 17, color: "#475569", lineHeight: 18 },
    boldText: { fontWeight: "700", color: "#0f172a" },
    card: { backgroundColor: "#ffffff", padding: 20, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, gap: 20 },
    sectionGroup: { gap: 8 },
    label: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
    dropdownList: { maxHeight: 150, backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 10 },
    dropdownItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
    dropdownItemSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    dropdownItemText: { fontSize: 17, color: "#334155", fontWeight: "500" },
    dropdownItemTextSelected: { color: "#047857", fontWeight: "700" },
    subCodeText: { fontSize: 12, color: "#64748b", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    checkMark: { fontSize: 14, fontWeight: "bold", color: "#059669" },
    summaryBox: { backgroundColor: "#fffbeb", borderColor: "#fde68a", borderWidth: 1, padding: 12, borderRadius: 12, gap: 4 },
    summaryTitle: { fontSize: 17, fontWeight: "700", color: "#451a03", textTransform: "uppercase" },
    summaryText: { fontSize: 17, fontWeight: "600", color: "#92400e" },
    footerContainer: { padding: 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0" }
});