import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDocumentScreen() {
  const [userProfile, setUserProfile] = useState<any>({});
  const [healthMetrics, setHealthMetrics] = useState<any>({});
  const [latestCholesterol, setLatestCholesterol] = useState<number | null>(null); // State for latest cholesterol
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const healthData = await AsyncStorage.getItem('healthMetrics');
        const cholesterolData = await AsyncStorage.getItem('cholesterolData');

        if (userData) setUserProfile(JSON.parse(userData)); // Load user profile
        if (healthData) {
          const parsedMetrics = JSON.parse(healthData);
          setHealthMetrics(parsedMetrics[parsedMetrics.length - 1] || {});
        }

        if (cholesterolData) {
          const parsedCholesterol = JSON.parse(cholesterolData);
          if (parsedCholesterol.length > 0) {
            const latest = parsedCholesterol[parsedCholesterol.length - 1];
            setLatestCholesterol(latest.total); // Extract latest cholesterol
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Unable to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (section: string) => {
    router.push(`/update/${section}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.dataBox}>
          <Text style={styles.dataValue}>{healthMetrics.height || 'N/A'}cm</Text>
          <Text style={styles.dataLabel}>Height</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataValue}>{healthMetrics.weight || 'N/A'}kg</Text>
          <Text style={styles.dataLabel}>Weight</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataValue}>{userProfile.age || 'N/A'}yo</Text> {/* Display age */}
          <Text style={styles.dataLabel}>Age</Text>
        </View>
      </View>

      {/* Blood Test Section */}
      <Text style={styles.sectionTitle}>Blood Test</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigate('cholesterol')}
      >
        <View>
          <Text style={styles.cardTitle}>Cholesterol</Text>
          <Text style={styles.cardValue}>
            {latestCholesterol !== null ? `${latestCholesterol} mg/dL` : 'N/A'}
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      {[ 
        { label: 'Vitamin B12', value: `${healthMetrics.vitaminB12 || 'N/A'} mg/dL`, field: 'vitaminB12' },
        { label: 'Thyroid', value: healthMetrics.thyroid || 'N/A', field: 'thyroid' },
        { label: 'Hormones', value: healthMetrics.hormones || 'N/A', field: 'hormones' },
      ].map((item) => (
        <TouchableOpacity
          key={item.field}
          style={styles.card}
          onPress={() => handleNavigate(item.field)}
        >
          <View>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}

      {/* Health Metrics Section */}
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      {[
        { label: 'Height', value: `${healthMetrics.height || 'N/A'} cm`, field: 'height' },
        { label: 'Weight', value: `${healthMetrics.weight || 'N/A'} kg`, field: 'weight' },
        { label: 'Age', value: `${userProfile.age || 'N/A'} yo`, field: 'age' },
        { label: 'Heart Rate', value: `${healthMetrics.heartRate || 'N/A'} bpm`, field: 'heartRate' },
      ].map((item) => (
        <TouchableOpacity
          key={item.field}
          style={styles.card}
          onPress={() => handleNavigate(item.field)}
        >
          <View>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dataBox: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    minWidth: 100,
  },
  dataValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dataLabel: {
    fontSize: 14,
    color: '#777',
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
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 14,
    color: '#777',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});
