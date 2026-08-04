import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

const ONBOARDED_BANKS = [
    { id: "b1", name: "State Bank of India", code: "SBIN" },
    { id: "b2", name: "Punjab National Bank", code: "PUNB" },
    { id: "b3", name: "Bank of Baroda", code: "BARB" },
];

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
        header: "Bank Account Information",

        primaryBank: "Primary Bank Name",

        branchName: "Branch Name",
        branchPlaceholder: "Enter branch location name",

        accountNumber: "Account Number",
        accountPlaceholder: "Enter bank account number",

        ifsc: "IFSC Code (Auto-fetched)",

        banks: [
            "State Bank of India",
            "Punjab National Bank",
            "Bank of Baroda",
        ],
    },

    hi: {
        header: "बैंक खाते की जानकारी",

        primaryBank: "मुख्य बैंक का नाम",

        branchName: "शाखा का नाम",
        branchPlaceholder: "शाखा का नाम दर्ज करें",

        accountNumber: "खाता संख्या",
        accountPlaceholder: "बैंक खाता संख्या दर्ज करें",

        ifsc: "आईएफएससी कोड (स्वतः प्राप्त)",

        banks: [
            "स्टेट बैंक ऑफ इंडिया",
            "पंजाब नेशनल बैंक",
            "बैंक ऑफ बड़ौदा",
        ],
    },
};

export function BankDetailsSection({
    formData,
    onChange,
    language = "en",
}) {

    const t = translations[language] || translations.en;
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>🏦</Text>
                <Text style={styles.stepHeaderText}>{t.header}</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.primaryBank}</Text>
                <ChipSelect
                    options={t.banks}
                    selectedValue={formData.selectedBankName}
                    onSelect={(val) => {
                        const index = t.banks.indexOf(val);
                        const selected = ONBOARDED_BANKS[index];

                        onChange("selectedBankName", selected.name);

                        if (selected) {
                            onChange("ifscCode", selected.code + "0001234");
                        }
                    }}
                />
            </View>

            <CustomInput
                label={t.branchName}
                value={formData.branchName}
                onChangeText={(val) => onChange("branchName", val)}
                placeholder={t.branchPlaceholder}
            />

            <CustomInput
                label={t.accountNumber}
                value={formData.accountNumber}
                onChangeText={(val) => onChange("accountNumber", val.replace(/\D/g, ""))}
                placeholder={t.accountPlaceholder}
                keyboardType="numeric"
                secureTextEntry
            />

            <CustomInput
                label={t.ifsc}
                value={formData.ifscCode}
                editable={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: { gap: 16 },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 8 },
    stepHeaderIcon: { fontSize: 20 },
    stepHeaderText: { fontSize: 25, fontWeight: "700", color: "#334155", textTransform: "uppercase" },
    inputGroup: { gap: 6 },
    label: { fontSize: 25, fontWeight: "600", color: "#334155" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 20, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});