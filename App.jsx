import React, { useState } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DefaultPage from './src/pages/DefaultPage';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [language, setLanguage] = useState("en");

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#0f172a"
      />

      <View style={styles.container}>
        <DefaultPage language={language} />

        {/* Floating Language Switch */}
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguage("hi")}
          >
            <Text style={styles.languageText}>हिंदी</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguage("en")}
          >
            <Text style={styles.languageText}>ENGLISH</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  languageContainer: {
    position: 'absolute',
    top: 50,
    right: 15,
    flexDirection: 'row',
    zIndex: 999,
  },

  languageButton: {
    backgroundColor: '#0f766e',
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
  },

  languageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});