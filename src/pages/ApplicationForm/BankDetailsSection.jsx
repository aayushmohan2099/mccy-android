import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";



const ONBOARDED_BANKS = [
    { id: "b1", name: "State Bank of India", code: "SBIN" },
    { id: "b2", name: "Punjab National Bank", code: "PUNB" },
    { id: "b3", name: "Bank of Baroda", code: "BARB" },
    { id: "b4", name: "ICICI Bank", code: "ICIC" },
    { id: "b5", name: "HDFC Bank", code: "HDFC" },
    { id: "b6", name: "Axis Bank", code: "UTIB" },
    { id: "b7", name: "Canara Bank", code: "CNRB" },
    { id: "b8", name: "Union Bank of India", code: "UBIN" },
    { id: "b9", name: "Indian Bank", code: "IDIB" },
    { id: "b10", name: "Bank of India", code: "BKID" },
    { id: "b11", name: "Central Bank of India", code: "CBIN" },
    { id: "b12", name: "UCO Bank", code: "UCBA" },
    { id: "b13", name: "Indian Overseas Bank", code: "IOBA" },
    { id: "b14", name: "Bank of Maharashtra", code: "MAHB" },
    { id: "b15", name: "Punjab & Sind Bank", code: "PSIB" },
    { id: "b16", name: "Yes Bank", code: "YESB" },
    { id: "b17", name: "IDBI Bank", code: "IBKL" },
    { id: "b18", name: "IndusInd Bank", code: "INDB" },
    { id: "b19", name: "Kotak Mahindra Bank", code: "KKBK" },
    { id: "b20", name: "Federal Bank", code: "FDRL" },
    { id: "b21", name: "South Indian Bank", code: "SIBL" },
    { id: "b22", name: "Karnataka Bank", code: "KARB" },
    { id: "b23", name: "Karur Vysya Bank", code: "KVBL" },
    { id: "b24", name: "Tamilnad Mercantile Bank", code: "TMBL" },
    { id: "b25", name: "City Union Bank", code: "CIUB" },
    { id: "b26", name: "RBL Bank", code: "RATN" },
    { id: "b27", name: "Bandhan Bank", code: "BDBL" },
    { id: "b28", name: "AU Small Finance Bank", code: "AUBL" },
    { id: "b29", name: "Equitas Small Finance Bank", code: "ESFB" },
    { id: "b30", name: "Ujjivan Small Finance Bank", code: "UJVN" },
    { id: "b31", name: "Jana Small Finance Bank", code: "JSFB" },
    { id: "b32", name: "ESAF Small Finance Bank", code: "ESAF" },
    { id: "b33", name: "Suryoday Small Finance Bank", code: "SURY" },
    { id: "b34", name: "North East Small Finance Bank", code: "NESF" },
    { id: "b35", name: "Punjab and Maharashtra Co-operative Bank", code: "PMCB" },
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
    const [bankSearch, setBankSearch] = useState(
        formData.selectedBankName || ""

    );

    const [showSuggestions, setShowSuggestions] = useState(false);
    const filteredBanks = ONBOARDED_BANKS.filter(bank =>
        bank.name.toLowerCase().includes(bankSearch.toLowerCase())
    );

    const t = translations[language] || translations.en;
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>🏦</Text>
                <Text style={styles.stepHeaderText}>{t.header}</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.primaryBank}</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search bank..."
                        value={bankSearch}
                        onChangeText={(text) => {
                            setBankSearch(text);
                            setShowSuggestions(true);
                            onChange("selectedBankName", text);
                        }}
                    />

                    {showSuggestions && bankSearch.length > 0 && (
                        <ScrollView style={styles.searchList}>
                            {filteredBanks.map((bank) => (
                                <TouchableOpacity
                                    key={bank.id}
                                    style={styles.searchItem}
                                    onPress={() => {
                                        setBankSearch(bank.name);
                                        setShowSuggestions(false);

                                        onChange("selectedBankName", bank.name);
                                        onChange("ifscCode", bank.code + "0001234");
                                    }}
                                >
                                    <Text style={styles.searchItemText}>
                                        {bank.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>
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
    chipTextSelected: { color: "#047857", fontWeight: "700" },
    searchContainer: {
        position: "relative",
    },

    searchInput: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 18,
        backgroundColor: "#fff",
    },

    searchList: {
        maxHeight: 180,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        marginTop: 4,
        backgroundColor: "#fff",
    },

    searchItem: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },

    searchItemText: {
        fontSize: 18,
        color: "#334155",
    },
});