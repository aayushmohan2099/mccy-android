import React from "react";
import { View, StyleSheet } from "react-native";

export default function Line({
    variant = "horizontal",
    color = "#E2E8F0",
    thickness = 1,
    length = "100%",
    style,
}) {
    const isHorizontal = variant === "horizontal";

    return (
        <View
            style={[
                styles.line, // Static style
                isHorizontal
                    ? {
                        width: length,
                        height: thickness,
                    }
                    : {
                        width: thickness,
                        height: length,
                    },
                {
                    backgroundColor: color,
                },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    line: {
        borderRadius: 2,
    },
});