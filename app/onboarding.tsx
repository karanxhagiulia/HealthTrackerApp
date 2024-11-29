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
      title: 'Let’s complete your profile',
      text: 'It will help us to know more about you!',
      backgroundColor: '#F9FAFB',
      image: require('../assets/images/onboarding.png'), // Updated image
      buttonText: 'Confirm',
    },
    {
      key: '3',
      image: require('../assets/images/report.png'), // Updated image in the top part
      title: 'Almost Done!',
      text: 'Provide your birth date, weight, and height to complete the setup.',
      backgroundColor: '#F9FAFB',
      buttonText: 'Submit',
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

        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear; // Calculate the age

        // Save data directly in healthMetrics
        const healthMetrics = [{
          weight,
          height,
          heartRate: null, // Default value for heartRate, can be updated later
        }];

        // Save the health metrics and user info
        const userProfile = {
          birthDate: birthDate.toISOString(),
          age, // Save calculated age
        };

        await AsyncStorage.setItem('userData', JSON.stringify(userProfile)); // Save user data
        await AsyncStorage.setItem('healthMetrics', JSON.stringify(healthMetrics)); // Save health metrics
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
      {/* Display image only in slide 2 and 3 */}
      {slides[currentSlide].image && (
        <View style={styles.imageContainer}>
          <Image source={slides[currentSlide].image} style={styles.image} />
        </View>
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
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Adjust margin for spacing
    marginTop: 40, // Top space for the image
  },
  image: {
    width: 200, // Adjust size of the image
    height: 200,
    resizeMode: 'contain',
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
