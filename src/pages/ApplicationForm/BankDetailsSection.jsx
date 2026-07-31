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

export function BankDetailsSection({ formData, onChange }) {
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>🏦</Text>
                <Text style={styles.stepHeaderText}>Bank Account Information</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Primary Bank Name</Text>
                <ChipSelect
                    options={ONBOARDED_BANKS.map(b => b.name)}
                    selectedValue={formData.selectedBankName}
                    onSelect={(val) => {
                        const selected = ONBOARDED_BANKS.find(b => b.name === val);
                        onChange("selectedBankName", val);
                        if (selected) {
                            onChange("ifscCode", selected.code + "0001234");
                        }
                    }}
                />
            </View>

            <CustomInput
                label="Branch Name"
                value={formData.branchName}
                onChangeText={(val) => onChange("branchName", val)}
                placeholder="Enter branch location name"
            />

            <CustomInput
                label="Account Number"
                value={formData.accountNumber}
                onChangeText={(val) => onChange("accountNumber", val.replace(/\D/g, ""))}
                placeholder="Enter bank account number"
                keyboardType="numeric"
                secureTextEntry
            />

            <CustomInput
                label="IFSC Code (Auto-fetched)"
                value={formData.ifscCode}
                editable={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: { gap: 16 },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 8 },
    stepHeaderIcon: { fontSize: 14 },
    stepHeaderText: { fontSize: 12, fontWeight: "700", color: "#334155", textTransform: "uppercase" },
    inputGroup: { gap: 6 },
    label: { fontSize: 12, fontWeight: "600", color: "#334155" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 12, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});