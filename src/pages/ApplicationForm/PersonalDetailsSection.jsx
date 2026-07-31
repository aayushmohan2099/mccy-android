import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

const SOCIAL_CATEGORIES = ["General", "OBC", "SC", "ST"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Others"];
const MARITAL_STATUSES = ["Married", "Unmarried"];

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

export function PersonalDetailsSection({ formData, onChange, onBack }) {
    return (
        <View style={styles.stepContainer}>
            {/* Top Header Row with Back Button */}
            <View style={styles.topBarRow}>
                {onBack && (
                    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButtonContainer}>
                        <Text style={styles.backArrowSymbol}>←</Text>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.stepHeader}>
                    <Text style={styles.stepHeaderIcon}>👤</Text>
                    <Text style={styles.stepHeaderText}>Personal Details</Text>
                </View>
            </View>

            <CustomInput
                label="Name of Member"
                value={formData.memberName}
                onChangeText={(val) => onChange("memberName", val)}
                placeholder="Enter full name"
            />

            <CustomInput
                label="Father / Husband Name"
                value={formData.fatherOrHusbandName}
                onChangeText={(val) => onChange("fatherOrHusbandName", val)}
                placeholder="Enter guardian name"
            />

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Marital Status</Text>
                <ChipSelect
                    options={MARITAL_STATUSES}
                    selectedValue={formData.maritalStatus}
                    onSelect={(val) => onChange("maritalStatus", val)}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <CustomInput
                        label="Date of Birth"
                        value={formData.dob}
                        onChangeText={(val) => onChange("dob", val)}
                        placeholder="YYYY-MM-DD"
                    />
                </View>
                <View style={styles.flex1}>
                    <CustomInput
                        label="Mobile Number"
                        value={formData.mobile}
                        editable={false}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <CustomInput
                        label="Member SHG ID"
                        value={formData.memberShgId}
                        onChangeText={(val) => onChange("memberShgId", val)}
                        placeholder="Enter Member SHG ID"
                    />
                </View>
                <View style={styles.flex1}>
                    <CustomInput
                        label="SHG ID"
                        value={formData.shgId}
                        onChangeText={(val) => onChange("shgId", val)}
                        placeholder="Enter SHG ID"
                    />
                </View>
            </View>

            <CustomInput
                label="SHG Joining Date"
                value={formData.shgJoiningDate}
                onChangeText={(val) => onChange("shgJoiningDate", val)}
                placeholder="YYYY-MM-DD"
            />

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Social Category</Text>
                <ChipSelect
                    options={SOCIAL_CATEGORIES}
                    selectedValue={formData.socialCategory}
                    onSelect={(val) => onChange("socialCategory", val)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Religion</Text>
                <ChipSelect
                    options={RELIGIONS}
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
    backArrowSymbol: { fontSize: 14, fontWeight: "bold", color: "#334155" },
    backButtonText: { fontSize: 12, fontWeight: "700", color: "#334155" },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    stepHeaderIcon: { fontSize: 14 },
    stepHeaderText: { fontSize: 12, fontWeight: "700", color: "#334155", textTransform: "uppercase" },
    inputGroup: { gap: 6 },
    row: { flexDirection: "row", gap: 12 },
    flex1: { flex: 1, gap: 6 },
    label: { fontSize: 12, fontWeight: "600", color: "#334155" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 12, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});