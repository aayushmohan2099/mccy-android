import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

const NATURE_OF_ENTERPRISE = ["New", "Existing"];
const ENTERPRISE_TYPES = ["Micro", "Small", "Medium"];
const SECTORS = ["Trading", "Manufacturing", "Services"];
const WORK_PLACES = ["From Home", "From a Shop/Rented Premises"];
const SALES_CHANNELS = ["In the Local Village", "At the Weekly Market (Haat)", "Through Shops in the Town/City", "Others"];

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

export function LoanEnterpriseDetailsSection({ formData, onChange, netProfit }) {
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>💼</Text>
                <Text style={styles.stepHeaderText}>Enterprise & Loan Requirements</Text>
            </View>

            <CustomInput
                label="Name of Enterprise"
                value={formData.enterpriseName}
                onChangeText={(val) => onChange("enterpriseName", val)}
                placeholder="Enter enterprise name"
            />

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>Nature of Enterprise</Text>
                    <ChipSelect
                        options={NATURE_OF_ENTERPRISE}
                        selectedValue={formData.natureOfEnterprise}
                        onSelect={(val) => onChange("natureOfEnterprise", val)}
                    />
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.label}>Type of Enterprise</Text>
                    <ChipSelect
                        options={ENTERPRISE_TYPES}
                        selectedValue={formData.enterpriseType}
                        onSelect={(val) => onChange("enterpriseType", val)}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Sector</Text>
                <ChipSelect
                    options={SECTORS}
                    selectedValue={formData.sector}
                    onSelect={(val) => onChange("sector", val)}
                />
            </View>

            <CustomInput
                label="Business Activity"
                value={formData.businessActivity}
                onChangeText={(val) => onChange("businessActivity", val)}
                placeholder="Describe activity (e.g. Dairy, Boutique)"
            />

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Estimated Monthly Income & Expenditure</Text>

            <CustomInput
                label="Total Estimated Monthly Sales (A) (₹)"
                value={formData.totalSales}
                onChangeText={(val) => onChange("totalSales", val.replace(/\D/g, ""))}
                placeholder="0"
                keyboardType="numeric"
            />

            <CustomInput
                label="Total Monthly Expenses [Raw Materials, Electricity, etc.] (B) (₹)"
                value={formData.totalExpenses}
                onChangeText={(val) => onChange("totalExpenses", val.replace(/\D/g, ""))}
                placeholder="0"
                keyboardType="numeric"
            />

            <View style={styles.profitBox}>
                <Text style={styles.profitLabel}>Net Monthly Profit (A - B):</Text>
                <Text style={styles.profitValue}>₹ {netProfit}</Text>
            </View>

            <View style={styles.divider} />

            <CustomInput
                label="Purpose of Loan"
                value={formData.loanPurpose}
                onChangeText={(val) => onChange("loanPurpose", val)}
                placeholder="Enter specific loan requirement purpose"
            />

            <CustomInput
                label="Required Capital (Maximum INR 20,000) (₹)"
                value={formData.requiredCapital}
                onChangeText={(val) => onChange("requiredCapital", val.replace(/\D/g, ""))}
                placeholder="Max 20000"
                keyboardType="numeric"
                maxLength={5}
            />

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Place Where Work Will Be Carried Out</Text>
                <ChipSelect
                    options={WORK_PLACES}
                    selectedValue={formData.workPlace}
                    onSelect={(val) => onChange("workPlace", val)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Where Will You Sell Your Products / Services?</Text>
                <ChipSelect
                    options={SALES_CHANNELS}
                    selectedValue={formData.salesChannel}
                    onSelect={(val) => onChange("salesChannel", val)}
                />
            </View>

            <CustomInput
                label="Udhyam Registration Number (Optional)"
                value={formData.udhyamRegNum}
                onChangeText={(val) => onChange("udhyamRegNum", val.toUpperCase())}
                placeholder="UDYAM-XX-00-0000000"
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
    row: { flexDirection: "row", gap: 12 },
    flex1: { flex: 1, gap: 6 },
    label: { fontSize: 12, fontWeight: "600", color: "#334155" },
    divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 4 },
    sectionTitle: { fontSize: 12, fontWeight: "700", color: "#1e293b", marginBottom: 2 },
    profitBox: { backgroundColor: "#ecfdf5", borderColor: "#a7f3d0", borderWidth: 1, padding: 12, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    profitLabel: { fontSize: 12, fontWeight: "700", color: "#065f46" },
    profitValue: { fontSize: 16, fontWeight: "800", color: "#047857", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 12, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});