import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";





const ChipSelect = ({ options, selectedValue, onSelect }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipContainer}>
        {options.map((opt) => {
            const isSelected = selectedValue === opt;
            return (
                <TouchableOpacity
                    key={opt}
                    activeOpacity={0.7}
                    onPress={() => onSelect(opt)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{opt}</Text>
                </TouchableOpacity>
            );
        })}
    </ScrollView>
);

const translations = {
    en: {
        back: "Back",
        personalDetails: "Personal Details",

        memberName: "Name of Member",
        memberPlaceholder: "Enter full name",

        guardianName: "Father / Husband Name",
        guardianPlaceholder: "Enter guardian name",

        maritalStatus: "Marital Status",

        dob: "Date of Birth",
        dobPlaceholder: "YYYY-MM-DD",

        mobile: "Mobile Number",

        memberShgId: "Member SHG ID",
        memberShgIdPlaceholder: "Enter Member SHG ID",

        shgId: "SHG ID",
        shgIdPlaceholder: "Enter SHG ID",

        joiningDate: "SHG Joining Date",
        joiningDatePlaceholder: "YYYY-MM-DD",

        socialCategory: "Social Category",
        religion: "Religion",

        socialOptions: ["General", "OBC", "SC", "ST"],
        religionOptions: ["Hindu", "Muslim", "Christian", "Others"],
        maritalOptions: ["Married", "Unmarried"],
    },

    hi: {
        back: "वापस",
        personalDetails: "व्यक्तिगत विवरण",

        memberName: "सदस्य का नाम",
        memberPlaceholder: "पूरा नाम दर्ज करें",

        guardianName: "पिता / पति का नाम",
        guardianPlaceholder: "पिता या पति का नाम दर्ज करें",

        maritalStatus: "वैवाहिक स्थिति",

        dob: "जन्म तिथि",
        dobPlaceholder: "YYYY-MM-DD",

        mobile: "मोबाइल नंबर",

        memberShgId: "सदस्य एसएचजी आईडी",
        memberShgIdPlaceholder: "सदस्य एसएचजी आईडी दर्ज करें",

        shgId: "एसएचजी आईडी",
        shgIdPlaceholder: "एसएचजी आईडी दर्ज करें",

        joiningDate: "एसएचजी में शामिल होने की तिथि",
        joiningDatePlaceholder: "YYYY-MM-DD",

        socialCategory: "सामाजिक वर्ग",
        religion: "धर्म",

        socialOptions: ["सामान्य", "ओबीसी", "एससी", "एसटी"],
        religionOptions: ["हिन्दू", "मुस्लिम", "ईसाई", "अन्य"],
        maritalOptions: ["विवाहित", "अविवाहित"],
    },
};

export function PersonalDetailsSection({
    formData,
    onChange,
    onBack,
    language = "en"
}) {
    const t = translations[language] || translations.en;
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [showJoiningPicker, setShowJoiningPicker] = useState(false);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    return (

        <View style={styles.stepContainer}>
            {/* Top Header Row with Back Button */}
            <View style={styles.topBarRow}>
                {onBack && (
                    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButtonContainer}>
                        <Text style={styles.backArrowSymbol}>←</Text>
                        <Text style={styles.backButtonText}>{t.back}</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.stepHeader}>
                    <Text style={styles.stepHeaderIcon}>👤</Text>
                    <Text style={styles.stepHeaderText}>{t.personalDetails}</Text>
                </View>
            </View>

            <CustomInput
                label={t.memberName}
                value={formData.memberName}
                onChangeText={(val) => onChange("memberName", val)}
                placeholder={t.memberPlaceholder}
            />

            <CustomInput
                label={t.guardianName}
                value={formData.fatherOrHusbandName}
                onChangeText={(val) => onChange("fatherOrHusbandName", val)}
                placeholder={t.guardianPlaceholder}
            />

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.maritalStatus}</Text>

                <ChipSelect
                    options={t.maritalOptions}
                    selectedValue={formData.maritalStatus}
                    onSelect={(val) => onChange("maritalStatus", val)}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <View style={styles.flex1}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShowDobPicker(true)}
                        >

                            <CustomInput
                                label={t.dob}
                                value={formData.dob}
                                placeholder="DD/MM/YYYY"
                                editable={false}
                            />

                        </TouchableOpacity>

                        {showDobPicker && (

                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                maximumDate={new Date()}
                                onChange={(event, selectedDate) => {

                                    setShowDobPicker(false);

                                    if (selectedDate) {

                                        onChange("dob", formatDate(selectedDate));

                                    }

                                }}
                            />

                        )}

                    </View>
                </View>
                <View style={styles.flex1}>
                    <CustomInput
                        label={t.mobile}
                        value={formData.mobile}
                        editable={false}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <CustomInput
                        label={t.memberShgId}
                        value={formData.memberShgId}
                        onChangeText={(val) => onChange("memberShgId", val)}
                        placeholder={t.memberShgIdPlaceholder}
                    />
                </View>
                <View style={styles.flex1}>
                    <CustomInput
                        label={t.shgId}
                        value={formData.shgId}
                        onChangeText={(val) => onChange("shgId", val)}
                        placeholder={t.shgIdPlaceholder}
                    />
                </View>
            </View>

            <View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowJoiningPicker(true)}
                >

                    <CustomInput
                        label={t.joiningDate}
                        value={formData.shgJoiningDate}
                        placeholder="DD/MM/YYYY"
                        editable={false}
                    />

                </TouchableOpacity>

                {showJoiningPicker && (

                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {

                            setShowJoiningPicker(false);

                            if (selectedDate) {

                                onChange(
                                    "shgJoiningDate",
                                    formatDate(selectedDate)
                                );

                            }

                        }}
                    />

                )}

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.socialCategory}</Text>

                <ChipSelect
                    options={t.socialOptions}
                    selectedValue={formData.socialCategory}
                    onSelect={(val) => onChange("socialCategory", val)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.religion}</Text>

                <ChipSelect
                    options={t.religionOptions}
                    selectedValue={formData.religion}
                    onSelect={(val) => onChange("religion", val)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: { gap: 16 },
    topBarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 8 },
    backButtonContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
    backArrowSymbol: { fontSize: 12, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    stepHeaderIcon: { fontSize: 20 },
    stepHeaderText: { fontSize: 25, fontWeight: "700", color: "#334155", textTransform: "uppercase" },
    inputGroup: { gap: 6 },
    row: { flexDirection: "row", gap: 12 },
    flex1: { flex: 1, gap: 6 },
    label: { fontSize: 25, fontWeight: "600", color: "#334155" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 20, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});