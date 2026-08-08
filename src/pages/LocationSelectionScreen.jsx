import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../compnents/SharedUIComp/CustomButton";
import Card from "../compnents/SharedUIComp/Card";
import Button from "../compnents/SharedUIComp/Button";
// import Application from '../assets/images/application.png';
import Back from '../assets/images/back.svg';
import Back1 from '../assets/images/back1.png';


// --- Mock Cascading Data Hierarchy ---
const LOCATION_HIERARCHY = [
    {
        district: "Patna",
        blocks: [
            { name: "Phulwari", panchayats: ["Khagaul", "Danapur Nizamat", "Bairiya", "Abgil"] },
            { name: "Danapur", panchayats: ["Panapur", "Shahpur", "Maner West", "Rupaspur"] },
            { name: "Bihta", panchayats: ["Amhara", "Daudpur", "Neora", "Parei"] },
            { name: "Dinapur-cum-Khagaul", panchayats: ["Kothawan", "Patel Nagar", "Sarari", "Astawan"] }
        ]
    },
    {
        district: "Gaya",
        blocks: [
            { name: "Bodh Gaya", panchayats: ["Mastipur", "Mocharim", "Bakurpur", "Parsawan"] },
            { name: "Sherghati", panchayats: ["Kapuria", "Amethi", "Bara", "Chhotki Sherghati"] },
            { name: "Wazirganj", panchayats: ["Pachamba", "Jethian", "Uru", "Rewai"] }
        ]
    },
    {
        district: "Lucknow",
        blocks: [
            { name: "Gosainganj", panchayats: ["Beli", "Jajuar", "Kalyanpur", "Bela"] },
            { name: "Bochaha", panchayats: ["Aima", "Dahila", "Garha", "Rahuan"] },
            { name: "Kanti", panchayats: ["Patahi", "Marwan", "Kalwari", "Akhtar"] }
        ]
    },
    {
        district: "Bhagalpur",
        blocks: [
            { name: "Naugachhia", panchayats: ["Madhurapur", "Pakra", "Ismailpur", "Dhruvaganj"] },
            { name: "Sultanganj", panchayats: ["Ajgaibinath", "Abhaipur", "Kusumha", "Maheshi"] }
        ]
    },
    {
        district: "Darbhanga",
        blocks: [
            { name: "Benipur", panchayats: ["Balo", "Harpur", "Mahamadpur", "Baluha"] },
            { name: "Baheri", panchayats: ["Janghata", "Dharampur", "Bahuar", "Siswa"] }
        ]
    }
];
const translations = {
    en: {
        title: "Select Jurisdiction",
        description:
            "Choose your administrative District, Block, and Panchayat from the lists below.",

        district: "1. Select District",
        block: "2. Select Block",
        panchayat: "3. Select Panchayat",

        summaryTitle: "Selected Jurisdiction",
        summaryPrefix: "Selected:",

        proceed: "Proceed to Application Form",

        back: "Back",
    },

    hi: {
        title: "क्षेत्राधिकार चुनें",
        description:
            "नीचे दी गई सूची से अपना जिला, प्रखंड और पंचायत चुनें।",

        district: "1. जिला चुनें",
        block: "2. विकास खंड चुनें",
        panchayat: "3. पंचायत चुनें",

        summaryTitle: "चयनित क्षेत्राधिकार",
        summaryPrefix: "चयन:",

        proceed: "आवेदन फॉर्म पर जाएँ",

        back: "वापस",
    },
};



export function LocationSelectionScreen({
    language,
    initialData = {},
    onProceedToForm,
    onBackToOtp,
}) {
    const t = translations[language] || translations.en;
    // State management for cascading selections
    const [selectedDistrict, setSelectedDistrict] = useState(initialData.district || LOCATION_HIERARCHY[0].district);

    // Find blocks belonging to the selected district
    const currentDistrictObj = LOCATION_HIERARCHY.find((d) => d.district === selectedDistrict) || LOCATION_HIERARCHY[0];
    const [selectedBlock, setSelectedBlock] = useState(initialData.block || currentDistrictObj.blocks[0].name);

    // Find panchayats belonging to the selected block
    const currentBlockObj = currentDistrictObj.blocks.find((b) => b.name === selectedBlock) || currentDistrictObj.blocks[0];
    const [selectedPanchayat, setSelectedPanchayat] = useState(initialData.panchayat || currentBlockObj.panchayats[0]);

    // Handle District Change
    const handleDistrictSelect = (dist) => {
        setSelectedDistrict(dist);
        const newDistObj = LOCATION_HIERARCHY.find((d) => d.district === dist);
        const firstBlock = newDistObj.blocks[0].name;
        setSelectedBlock(firstBlock);
        setSelectedPanchayat(newDistObj.blocks[0].panchayats[0]);
    };

    // Handle Block Change
    const handleBlockSelect = (blk) => {
        setSelectedBlock(blk);
        const newBlockObj = currentDistrictObj.blocks.find((b) => b.name === blk);
        setSelectedPanchayat(newBlockObj.panchayats[0]);
    };

    const handleNext = () => {
        const locationDetails = {
            district: selectedDistrict,
            block: selectedBlock,
            panchayat: selectedPanchayat,
        };
        if (onProceedToForm) {
            onProceedToForm(locationDetails);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Navigation Row */}
                <View style={styles.topBarRow}>
                    {onBackToOtp && (
                        // <TouchableOpacity onPress={onBackToOtp} activeOpacity={0.7} style={styles.backButtonContainer}>
                        //     <Text style={styles.backArrowSymbol}>←</Text>
                        //     <Text style={styles.backButtonText}>
                        //         {t.back}
                        //     </Text>
                        // </TouchableOpacity>
                        // <Button
                        //     variant="imageAction"
                        //     title={t.back}
                        //     image={Back}
                        //     onPress={onBackToOtp}
                        //     style={{
                        //         marginTop: 10,
                        //         width: "50%",
                        //         alignSelf: "flex-start",
                        //     }}
                        // />
                        <Button
                            variant="back"
                            image={Back1}
                            onPress={onBackToOtp}
                            style={{
                                marginTop: 10,
                                alignSelf: "flex-start",
                            }}
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    )}
                </View>

                {/* Header Information */}
                <Card
                    style={{
                        alignItems: 'center',
                        padding: 30,
                    }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {t.title}
                        </Text>
                        <Text style={styles.description}>
                            {t.description}
                        </Text>
                    </View>
                </Card>

                {/* Dropdown Lists Card Container */}
                <View style={styles.card}>
                    {/* <Card
                        style={{
                            alignItems: 'center',
                            padding: 30,
                        }}> */}

                    {/* 1. District Dropdown List */}
                    <View style={styles.sectionGroup}>
                        <Text style={styles.label}>
                            {t.district}
                        </Text>
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {LOCATION_HIERARCHY.map((item) => {
                                const isSelected = selectedDistrict === item.district;
                                return (
                                    <TouchableOpacity
                                        key={item.district}
                                        activeOpacity={0.7}
                                        onPress={() => handleDistrictSelect(item.district)}
                                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                                    >
                                        <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                                            {item.district}
                                        </Text>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* 2. Block Dropdown List */}
                    <View style={styles.sectionGroup}>
                        <Text style={styles.label}>
                            {t.block} ({selectedDistrict})
                        </Text>
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {currentDistrictObj.blocks.map((blk) => {
                                const isSelected = selectedBlock === blk.name;
                                return (
                                    <TouchableOpacity
                                        key={blk.name}
                                        activeOpacity={0.7}
                                        onPress={() => handleBlockSelect(blk.name)}
                                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                                    >
                                        <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                                            {blk.name}
                                        </Text>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* 3. Panchayat Dropdown List */}
                    <View style={styles.sectionGroup}>
                        <Text style={styles.label}>
                            {t.panchayat} ({selectedBlock})
                        </Text>
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {currentBlockObj.panchayats.map((pan) => {
                                const isSelected = selectedPanchayat === pan;
                                return (
                                    <TouchableOpacity
                                        key={pan}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedPanchayat(pan)}
                                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                                    >
                                        <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
                                            {pan}
                                        </Text>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Selection Summary Pill */}
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>
                            {t.summaryTitle}
                        </Text>
                        <Text style={styles.summaryText}>
                            📍 {t.summaryPrefix} {selectedDistrict} &gt; {selectedBlock} &gt; {selectedPanchayat}
                        </Text>
                    </View>

                </View>
                {/* </Card> */}
            </ScrollView>

            {/* Footer Proceed Button */}
            <View style={styles.footerContainer}>
                <CustomButton
                    title={t.proceed}
                    onPress={handleNext}
                    rightArrow
                    style={{
                        width: "90%",
                        alignSelf: "center",
                    }}
                />
                {/* <Button
                    variant="imageAction"
                    title="Proceed to Application Form"
                    image={Application}
                    onPress={handleNext}
                    style={{ marginBottom: 14, width: "90%" }}
                    rightarrow={true}
                /> */}
            </View>
        </SafeAreaView >
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
    card: { backgroundColor: "#ffffff", padding: 20, borderRadius: 16, borderColor: "#e2e8f0", borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, gap: 20 },
    sectionGroup: { gap: 8 },
    label: { fontSize: 20, fontWeight: "700", color: "#1e293b" },
    dropdownList: { maxHeight: 140, backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 10 },
    dropdownItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
    dropdownItemSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    dropdownItemText: { fontSize: 17, color: "#334155", fontWeight: "500" },
    dropdownItemTextSelected: { color: "#047857", fontWeight: "700" },
    checkMark: { fontSize: 14, fontWeight: "bold", color: "#059669" },
    summaryBox: { backgroundColor: "#fffbeb", borderColor: "#fde68a", borderWidth: 1, padding: 12, borderRadius: 12, gap: 4 },
    summaryTitle: { fontSize: 18, fontWeight: "700", color: "#451a03", textTransform: "uppercase" },
    summaryText: { fontSize: 16, fontWeight: "600", color: "#92400e" },
    footerContainer: { padding: 16, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0", margin: -20 }
});