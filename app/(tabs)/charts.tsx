import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChartsScreen() {
  const router = useRouter();

  const bloodTestData = [
    { id: 1, name: 'Cholesterol', path: '/Cholesterol/CholesterolChart' },
    { id: 2, name: 'Vitamin B12', path: '/BloodPressure/VitaminB12Chart' },
    { id: 3, name: 'Thyroid', path: '/BloodSugar/ThyroidChart' },
  ];

  const healthMetricsData = [
    { id: 4, name: 'Heart Rate', path: '/HeartRate/HeartRateChart' },
    { id: 5, name: 'Weight', path: '/Weight/WeightChart' },
    { id: 6, name: 'Height', path: '/Height/HeightChart' },
  ];

  const handlePress = (path: string) => {
    router.push(path);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Visualize it!</Text>

      {/* Blood Test Section */}
      <Text style={styles.sectionTitle}>Blood Test</Text>
      {bloodTestData.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.chartButton}
            onPress={() => handlePress(item.path)}
          >
            <Text style={styles.chartButtonText}>Chart</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Health Metrics Section */}
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      {healthMetricsData.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.chartButton}
            onPress={() => handlePress(item.path)}
          >
            <Text style={styles.chartButtonText}>Chart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 5,  // Added shadow for depth
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartButton: {
    backgroundColor: '#92A3FD',  // Blue background for the button
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
