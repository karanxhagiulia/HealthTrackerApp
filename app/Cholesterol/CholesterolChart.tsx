import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CholesterolChart() {
  const [cholesterolData, setCholesterolData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const fetchCholesterolData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cholesterolData');
        const parsedData = storedData ? JSON.parse(storedData) : [];

        if (parsedData.length > 0) {
          const labels = parsedData.map((entry) => entry.date);
          const totalCholesterolValues = parsedData.map((entry) => entry.total);

          setCholesterolData(parsedData);
          setChartData({
            labels: labels,
            datasets: [{ data: totalCholesterolValues }],
          });
        } else {
          Alert.alert('No Data', 'No cholesterol data available.');
        }
      } catch (error) {
        console.error('Error fetching cholesterol data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
      }
    };

    fetchCholesterolData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cholesterol Data Chart</Text>

      {cholesterolData.length > 0 ? (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#E0E0E0',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(37, 117, 252, ${opacity})`, // Soft blue color for the line
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`, // Dark color for the labels
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#2575FC', // Blue for the dots
            },
          }}
          withDots={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noDataText}>No cholesterol data available to display.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9FAFB', // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B3B3B',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
