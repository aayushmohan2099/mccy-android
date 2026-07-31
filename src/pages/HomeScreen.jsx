import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../compnents/SharedUIComp/Button";
import ProgressBar from "../compnents/SharedUIComp/Progressbar";
import Line from "../compnents/SharedUIComp/Line";
import Card from "../compnents/SharedUIComp/Card";

export function HomeScreen() {
    return (
        <View style={styles.container}>

            <Card
                style={{
                    width: "90%",
                    alignItems: "center",
                    padding: 30,
                }}
            >

                <ProgressBar
                    currentStep={2}
                    totalSteps={3}
                    title="Application Progress"
                />

                <Text style={styles.emoji}>🏠</Text>

                <Text style={styles.title}>Welcome</Text>

                <Text style={styles.subtitle}>
                    Welcome to Home Screen
                </Text>

                <View style={{ width: "100%", marginTop: 30 }}>
                    <Button
                        variant="primary"
                        title="Fill New Application"
                        leftIcon="📝"
                        rightIcon="→"
                        onPress={() => console.log("Primary")}
                    />

                    <Button
                        variant="secondary"
                        title="Secondary Button"
                        onPress={() => console.log("Secondary")}
                    />

                    <Button
                        variant="login"
                        title="Login"
                        onPress={() => console.log("Login")}
                    />

                    <Button
                        variant="logout"
                        title="Logout"
                        onPress={() => console.log("Logout")}
                    />
                </View>

                <Line color="#059669" thickness={2} />

                <Line
                    variant="vertical"
                    color="#059669"
                    length={120}
                    thickness={2}
                />

            </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0FDF4",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    emoji: {
        fontSize: 60,
        marginBottom: 10,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#059669",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 18,
        color: "#475569",
        textAlign: "center",
    },
});