import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

const translations = {
    en: {
        header: "VO / CLF Mapping Details",
        voName: "VO Name (Village Organisation)",
        voPlaceholder: "Enter VO Name",
        clfName: "CLF Name (Cluster Level Federation)",
        clfPlaceholder: "Enter CLF Name",
    },

    hi: {
        header: "वीओ / सीएलएफ मैपिंग विवरण",
        voName: "वीओ का नाम (ग्राम संगठन)",
        voPlaceholder: "वीओ का नाम दर्ज करें",
        clfName: "सीएलएफ का नाम (क्लस्टर लेवल फेडरेशन)",
        clfPlaceholder: "सीएलएफ का नाम दर्ज करें",
    },
};

export function VoClfDetailsSection({
    formData,
    onChange,
    language = "en"
}) {
    const t = translations[language] || translations.en;
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>🏢</Text>
                <Text style={styles.stepHeaderText}>
                    {t.header}
                </Text>
            </View>

            <CustomInput
                label={t.voName}
                value={formData.voName}
                onChangeText={(val) => onChange("voName", val)}
                placeholder={t.voPlaceholder}
            />

            <CustomInput
                label={t.clfName}
                value={formData.clfName}
                onChangeText={(val) => onChange("clfName", val)}
                placeholder={t.clfPlaceholder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: { gap: 16 },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 8 },
    stepHeaderIcon: { fontSize: 14 },
    stepHeaderText: { fontSize: 25, fontWeight: "700", color: "#334155", textTransform: "uppercase" }
});