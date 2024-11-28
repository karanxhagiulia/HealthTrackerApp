// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CholesterolChart from '../Cholesterol/CholesterolChart';  // Importing the modular chart component
import HdlChart from '../Cholesterol/HdlChart';  // Similarly, import other chart components

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Dashboard</Text>

      {/* Cholesterol Chart */}
      <CholesterolChart />

      <HdlChart />

      {/* Add other chart components here */}
      {/* <LdlChart /> */}
      {/* <OtherChart /> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
