// LdlChart.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const LdlChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for the LDL line
      },
    ],
  });

  useEffect(() => {
    const fetchLdlData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cholesterolData'); // Assuming LDL data is part of this
        const parsedData = storedData ? JSON.parse(storedData) : [];

        if (parsedData.length > 0) {
          const labels = parsedData.map((entry: any) => entry.date); // Dates as labels
          const ldlValues = parsedData.map((entry: any) => entry.ldl); // LDL values

          setChartData({
            labels: labels,
            datasets: [
              {
                data: ldlValues,
                strokeWidth: 3,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red line for LDL
              },
            ],
          });
        } else {
          Alert.alert('No Data', 'No LDL data available.');
        }
      } catch (error) {
        console.error('Error fetching LDL data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
      }
    };

    fetchLdlData();
  }, []);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>LDL Cholesterol</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40} // Set width to fit screen
        height={220} // Set the height of the chart
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // Number of decimal places
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black for axis labels
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black for chart labels
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#f44336', // Red dot color for LDL
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default LdlChart;
