import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

const translations = {
    en: {
        header: "Enterprise & Loan Requirements",

        enterpriseName: "Name of Enterprise",
        enterprisePlaceholder: "Enter enterprise name",

        nature: "Nature of Enterprise",
        type: "Type of Enterprise",
        sector: "Sector",

        businessActivity: "Business Activity",
        businessPlaceholder: "Describe activity (e.g. Dairy, Boutique)",

        incomeHeading: "Estimated Monthly Income & Expenditure",

        sales: "Total Estimated Monthly Sales (A) (₹)",
        expenses: "Total Monthly Expenses [Raw Materials, Electricity, etc.] (B) (₹)",

        profit: "Net Monthly Profit (A - B):",

        loanPurpose: "Purpose of Loan",
        loanPurposePlaceholder: "Enter specific loan requirement purpose",

        capital: "Required Capital (Maximum INR 20,000) (₹)",
        capitalPlaceholder: "Max 20000",

        workPlace: "Place Where Work Will Be Carried Out",
        salesChannel: "Where Will You Sell Your Products / Services?",

        udhyam: "Udhyam Registration Number (Optional)",
        udhyamPlaceholder: "UDYAM-XX-00-0000000",

        natureOptions: ["New", "Existing"],
        typeOptions: ["Micro", "Small", "Medium"],
        sectorOptions: ["Trading", "Manufacturing", "Services"],
        workPlaceOptions: [
            "From Home",
            "From a Shop/Rented Premises"
        ],
        salesChannelOptions: [
            "In the Local Village",
            "At the Weekly Market (Haat)",
            "Through Shops in the Town/City",
            "Others"
        ]
    },

    hi: {
        header: "उद्यम एवं ऋण विवरण",

        enterpriseName: "उद्यम का नाम",
        enterprisePlaceholder: "उद्यम का नाम दर्ज करें",

        nature: "उद्यम का प्रकार",
        type: "उद्यम की श्रेणी",
        sector: "क्षेत्र",

        businessActivity: "व्यावसायिक गतिविधि",
        businessPlaceholder: "गतिविधि लिखें (जैसे डेयरी, बुटीक)",

        incomeHeading: "अनुमानित मासिक आय एवं व्यय",

        sales: "कुल अनुमानित मासिक बिक्री (A) (₹)",
        expenses: "कुल मासिक व्यय (कच्चा माल, बिजली आदि) (B) (₹)",

        profit: "शुद्ध मासिक लाभ (A - B):",

        loanPurpose: "ऋण का उद्देश्य",
        loanPurposePlaceholder: "ऋण लेने का उद्देश्य दर्ज करें",

        capital: "आवश्यक पूंजी (अधिकतम ₹20,000)",
        capitalPlaceholder: "अधिकतम 20000",

        workPlace: "कार्य कहाँ किया जाएगा",
        salesChannel: "आप अपने उत्पाद/सेवाएँ कहाँ बेचेंगे?",

        udhyam: "उद्यम पंजीकरण संख्या (वैकल्पिक)",
        udhyamPlaceholder: "UDYAM-XX-00-0000000",

        natureOptions: ["नया", "मौजूदा"],
        typeOptions: ["सूक्ष्म", "लघु", "मध्यम"],
        sectorOptions: ["व्यापार", "विनिर्माण", "सेवा"],
        workPlaceOptions: [
            "घर से",
            "दुकान/किराए के स्थान से"
        ],
        salesChannelOptions: [
            "स्थानीय गाँव में",
            "साप्ताहिक हाट में",
            "शहर की दुकानों के माध्यम से",
            "अन्य"
        ]
    }
};

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

export function LoanEnterpriseDetailsSection({
    formData,
    onChange,
    netProfit,
    language = "en"
}) {
    const t = translations[language] || translations.en;
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>💼</Text>
                <Text style={styles.stepHeaderText}>
                    {t.header}
                </Text>
            </View>

            <CustomInput
                label={t.enterpriseName}
                value={formData.enterpriseName}
                onChangeText={(val) => onChange("enterpriseName", val)}
                placeholder={t.enterprisePlaceholder}
            />

            <View style={styles.row}>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t.nature}</Text>
                    <ChipSelect
                        options={t.natureOptions}
                        selectedValue={formData.natureOfEnterprise}
                        onSelect={(val) => onChange("natureOfEnterprise", val)}
                    />
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.label}>{t.type}</Text>
                    <ChipSelect
                        options={t.typeOptions}
                        selectedValue={formData.enterpriseType}
                        onSelect={(val) => onChange("enterpriseType", val)}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.sector}</Text>
                <ChipSelect
                    options={t.sectorOptions}
                    selectedValue={formData.sector}
                    onSelect={(val) => onChange("sector", val)}
                />
            </View>

            <CustomInput
                label={t.businessActivity}
                value={formData.businessActivity}
                onChangeText={(val) => onChange("businessActivity", val)}
                placeholder={t.businessPlaceholder}
            />

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>
                {t.incomeHeading}
            </Text>

            <CustomInput
                label={t.sales}
                value={formData.totalSales}
                onChangeText={(val) => onChange("totalSales", val.replace(/\D/g, ""))}
                placeholder="0"
                keyboardType="numeric"
            />

            <CustomInput
                label={t.expenses}
                value={formData.totalExpenses}
                onChangeText={(val) => onChange("totalExpenses", val.replace(/\D/g, ""))}
                placeholder="0"
                keyboardType="numeric"
            />

            <View style={styles.profitBox}>
                <Text style={styles.profitLabel}>
                    {t.profit}
                </Text>
                <Text style={styles.profitValue}>₹ {netProfit}</Text>
            </View>

            <View style={styles.divider} />

            <CustomInput
                label={t.loanPurpose}
                value={formData.loanPurpose}
                onChangeText={(val) => onChange("loanPurpose", val)}
                placeholder={t.loanPurposePlaceholder}
            />

            <CustomInput
                label={t.capital}
                value={formData.requiredCapital}
                onChangeText={(val) => onChange("requiredCapital", val.replace(/\D/g, ""))}
                placeholder={t.capitalPlaceholder}
                keyboardType="numeric"
                maxLength={5}
            />

            <View style={styles.inputGroup}>
                <Text style={styles.label}>
                    {t.workPlace}
                </Text>
                <ChipSelect
                    options={t.workPlaceOptions}
                    selectedValue={formData.workPlace}
                    onSelect={(val) => onChange("workPlace", val)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>
                    {t.salesChannel}
                </Text>
                <ChipSelect
                    options={t.salesChannelOptions}
                    selectedValue={formData.salesChannel}
                    onSelect={(val) => onChange("salesChannel", val)}
                />
            </View>

            <CustomInput
                label={t.udhyam}
                value={formData.udhyamRegNum}
                onChangeText={(val) => onChange("udhyamRegNum", val.toUpperCase())}
                placeholder={t.udhyamPlaceholder}
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
    row: { flexDirection: "row", gap: 12 },
    flex1: { flex: 1, gap: 6 },
    label: { fontSize: 25, fontWeight: "600", color: "#334155" },
    divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 4 },
    sectionTitle: { fontSize: 12, fontWeight: "700", color: "#1e293b", marginBottom: 2 },
    profitBox: { backgroundColor: "#ecfdf5", borderColor: "#a7f3d0", borderWidth: 1, padding: 12, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    profitLabel: { fontSize: 12, fontWeight: "700", color: "#065f46" },
    profitValue: { fontSize: 16, fontWeight: "800", color: "#047857", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
    chipScroll: { flexGrow: 0, marginBottom: 4 },
    chipContainer: { gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f1f5f9", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
    chipSelected: { backgroundColor: "#ecfdf5", borderColor: "#059669" },
    chipText: { fontSize: 20, color: "#475569", fontWeight: "500" },
    chipTextSelected: { color: "#047857", fontWeight: "700" }
});