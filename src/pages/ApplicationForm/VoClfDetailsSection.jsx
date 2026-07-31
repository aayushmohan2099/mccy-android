import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomInput } from "../../compnents/SharedUIComp/CustomInput";

export function VoClfDetailsSection({ formData, onChange }) {
    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderIcon}>🏢</Text>
                <Text style={styles.stepHeaderText}>VO / CLF Mapping Details</Text>
            </View>

            <CustomInput
                label="VO Name (Village Organisation)"
                value={formData.voName}
                onChangeText={(val) => onChange("voName", val)}
                placeholder="Enter VO Name"
            />

            <CustomInput
                label="CLF Name (Cluster Level Federation)"
                value={formData.clfName}
                onChangeText={(val) => onChange("clfName", val)}
                placeholder="Enter CLF Name"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: { gap: 16 },
    stepHeader: { flexDirection: "row", alignItems: "center", gap: 6, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 8 },
    stepHeaderIcon: { fontSize: 14 },
    stepHeaderText: { fontSize: 12, fontWeight: "700", color: "#334155", textTransform: "uppercase" }
});