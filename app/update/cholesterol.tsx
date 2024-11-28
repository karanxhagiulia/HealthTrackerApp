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

  // Handle deleting a cholesterol entry
  const handleDeleteCholesterol = async (id: string) => {
    console.log("Deleting item with id:", id); // Log the id of the item being deleted
    const newData = cholesterolData.filter(item => item.id !== id); // Remove the item by id

    try {
      // Save updated data to AsyncStorage
      await AsyncStorage.setItem('cholesterolData', JSON.stringify(newData));
      console.log('Updated Data after deletion:', newData); // Log the new data after deletion
      
      // Update the state with the new data
      setCholesterolData(newData);
      Alert.alert('Success', 'Cholesterol data deleted successfully.');
    } catch (error) {
      console.error('Error deleting cholesterol data:', error);
      Alert.alert('Error', 'Failed to delete cholesterol data.');
    }
  };

  // Handle deleting all cholesterol data
  const handleDeleteAllCholesterol = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete all cholesterol data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove all data from AsyncStorage
              await AsyncStorage.removeItem('cholesterolData');
              // Clear the state
              setCholesterolData([]);
              Alert.alert('Success', 'All cholesterol data deleted successfully.');
            } catch (error) {
              console.error('Error deleting all cholesterol data:', error);
              Alert.alert('Error', 'Failed to delete all cholesterol data.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Handle item key extraction based on a unique identifier
  const keyExtractor = (item) => item.id; // Using 'id' as a unique key

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

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                console.log("Delete button clicked"); // Add this to verify if the event is triggered
                Alert.alert(
                  'Confirm Deletion',
                  'Are you sure you want to delete this entry?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => handleDeleteCholesterol(item.id), // Delete when confirmed
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>

          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No cholesterol data available.</Text>}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddCholesterol}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Delete All Button */}
      <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAllCholesterol}>
        <Text style={styles.deleteAllButtonText}>Delete All</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: { fontSize: 16, color: '#555', flex: 1 },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red color for the delete button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
  deleteAllButton: {
    backgroundColor: '#e74c3c', // Red color for the "Delete All" button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  deleteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
