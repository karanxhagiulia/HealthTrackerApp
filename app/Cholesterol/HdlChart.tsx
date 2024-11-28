// HdlChart.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HdlChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green color for the HDL line
      },
    ],
  });

  useEffect(() => {
    const fetchHdlData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cholesterolData'); // Assuming HDL data is part of this
        const parsedData = storedData ? JSON.parse(storedData) : [];

        if (parsedData.length > 0) {
          const labels = parsedData.map((entry: any) => entry.date); // Dates as labels
          const hdlValues = parsedData.map((entry: any) => entry.hdl); // HDL values

          setChartData({
            labels: labels,
            datasets: [
              {
                data: hdlValues,
                strokeWidth: 3,
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green line for HDL
              },
            ],
          });
        } else {
          Alert.alert('No Data', 'No HDL data available.');
        }
      } catch (error) {
        console.error('Error fetching HDL data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
      }
    };

    fetchHdlData();
  }, []);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>HDL Cholesterol</Text>
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
            stroke: '#4caf50', // Green dot color for HDL
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

export default HdlChart;
