import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient styles
import { useRouter } from 'expo-router';

export default function ChartsScreen() {
  const router = useRouter();

  const dataList = [
    { id: 1, name: 'Cholesterol', path: '/Cholesterol/CholesterolChart' },
    { id: 2, name: 'Blood Pressure', path: '/BloodPressure/BloodPressureChart' },
    { id: 3, name: 'Blood Sugar', path: '/BloodSugar/BloodSugarChart' },
  ];

  const handlePress = (path: string) => {
    router.push(path);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Data Charts</Text>

      {dataList.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.cardContainer}
          onPress={() => handlePress(item.path)}
        >
          <LinearGradient
            colors={['#6A11CB', '#2575FC']}
            style={styles.card}
          >
            <Text style={styles.cardText}>{item.name} Chart</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006AF5',
    marginBottom: 24,
    textAlign: 'center',
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 25,
    overflow: 'hidden', // Ensure the gradient stays inside the border
  },
  card: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
