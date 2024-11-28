import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient button
import { useRouter } from 'expo-router';

export default function AddCholesterolDataScreen() {
  const [total, setTotal] = useState('');
  const [ldl, setLdl] = useState('');
  const [hdl, setHdl] = useState('');
  const [triglycerides, setTriglycerides] = useState('');
  const [date, setDate] = useState(''); // New state for date input
  const router = useRouter();

  const handleSave = async () => {
    if (!total || !ldl || !hdl || !triglycerides || !date) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const newEntry = {
        total: parseFloat(total),
        ldl: parseFloat(ldl),
        hdl: parseFloat(hdl),
        triglycerides: parseFloat(triglycerides),
        date, // Use the entered date
      };

      const storedData = await AsyncStorage.getItem('cholesterolData');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      parsedData.push(newEntry);

      await AsyncStorage.setItem('cholesterolData', JSON.stringify(parsedData));
      Alert.alert('Success', 'Cholesterol data added successfully.');
      router.back(); // Navigate back to the cholesterol details screen
    } catch (error) {
      console.error('Error saving cholesterol data:', error);
      Alert.alert('Error', 'Failed to save cholesterol data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Cholesterol Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Total Cholesterol (mg/dL)"
        keyboardType="numeric"
        value={total}
        onChangeText={setTotal}
      />
      <TextInput
        style={styles.input}
        placeholder="LDL (mg/dL)"
        keyboardType="numeric"
        value={ldl}
        onChangeText={setLdl}
      />
      <TextInput
        style={styles.input}
        placeholder="HDL (mg/dL)"
        keyboardType="numeric"
        value={hdl}
        onChangeText={setHdl}
      />
      <TextInput
        style={styles.input}
        placeholder="Triglycerides (mg/dL)"
        keyboardType="numeric"
        value={triglycerides}
        onChangeText={setTriglycerides}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
        <LinearGradient
          colors={['#6A11CB', '#2575FC']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  buttonGradient: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
