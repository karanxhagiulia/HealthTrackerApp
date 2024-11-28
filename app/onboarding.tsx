import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const slides = [
    {
      key: '1',
      title: 'Health Tracker',
      text: 'Evidence-based medicine.',
      backgroundColor: '#F9FAFB',
      buttonText: 'Next',
      image: null,
    },
    {
      key: '2',
      title: 'Your health data in one place',
      text: 'Register, upload your data and visualize it!',
      backgroundColor: '#F9FAFB',
      image: require('../assets/images/onboarding.png'),
      buttonText: 'Get Started',
    },
    {
      key: '3',
      title: 'Almost Done!',
      text: 'Provide your birth date, weight, and height to complete the setup.',
      backgroundColor: '#F9FAFB',
      buttonText: 'Submit',
      image: null,
    },
  ];

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        if (hasCompletedOnboarding === 'true') {
          router.replace('/(tabs)/home');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const handleNext = async () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      try {
        if (!birthDate || !weight || !height) {
          setError('Please fill in all the fields.');
          return;
        }
        await AsyncStorage.setItem('userBirthDate', birthDate.toISOString());
        await AsyncStorage.setItem('userWeight', weight);
        await AsyncStorage.setItem('userHeight', height);
        await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
        router.replace('/(tabs)/home');
      } catch (error) {
        console.error('Error completing onboarding:', error);
        setError('An error occurred during onboarding.');
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.slide, { backgroundColor: slides[currentSlide].backgroundColor }]}>
      {slides[currentSlide].image && (
        <Image source={slides[currentSlide].image} style={styles.image} />
      )}
      <Text style={styles.title}>{slides[currentSlide].title}</Text>
      <Text style={styles.text}>{slides[currentSlide].text}</Text>

      {currentSlide === 2 && (
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.inputText}>
              {birthDate ? birthDate.toDateString() : 'Select Birth Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            keyboardType="numeric"
            onChangeText={(text) => setWeight(text)}
            value={weight}
            placeholderTextColor="#A9A9A9"
          />

          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            onChangeText={(text) => setHeight(text)}
            value={height}
            placeholderTextColor="#A9A9A9"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}

      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <LinearGradient
          colors={['#6A11CB', '#2575FC']} // Gradient colors
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>{slides[currentSlide].buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2C3E50',
  },
  text: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 16,
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  inputText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  errorText: {
    color: '#E74C3C',
    marginTop: 10,
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default OnboardingScreen;
