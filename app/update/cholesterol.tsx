import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function CholesterolScreen() {
  const [cholesterolData, setCholesterolData] = useState([]);
  const router = useRouter();

  // Fetch the cholesterol data from AsyncStorage
  useEffect(() => {
    const fetchCholesterolData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cholesterolData');
        console.log('Fetched Data:', storedData); // Debugging line
        const parsedData = storedData ? JSON.parse(storedData) : [];
        setCholesterolData(parsedData);
      } catch (error) {
        console.error('Error fetching cholesterol data:', error);
        Alert.alert('Error', 'Failed to load cholesterol data.');
      }
    };

    fetchCholesterolData();
  }, []);

  // Handle adding new cholesterol data
  const handleAddCholesterol = () => {
    router.push('../Cholesterol/add-cholesterol-data');
  };

  // Handle item key extraction based on a unique identifier
  const keyExtractor = (item) => item.id; // Using 'id' as the unique key

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cholesterol</Text>
      
      <FlatList
        data={cholesterolData}
        keyExtractor={keyExtractor} // Use the unique 'id' as the key
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              Total: {item.total} mg/dL{'\n'}
              LDL: {item.ldl} mg/dL, HDL: {item.hdl} mg/dL, Triglycerides: {item.triglycerides} mg/dL{'\n'}
              Date: {item.date || 'No date'}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No cholesterol data available.</Text>}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddCholesterol}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  listItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  listItemText: { fontSize: 16, color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8e44ad',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 30, lineHeight: 30 },
});
