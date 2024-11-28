import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Navigation to Sign Up/Login pages
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for the health-related icon
import { LinearGradient } from 'expo-linear-gradient'; // For gradient button styling

export default function Index() {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-circle" size={200} color="#007bff" style={styles.icon} />

      <Text style={styles.header}>
        Welcome to Health Tracker
      </Text>

      <Text style={styles.subtitle}>
        Track your health, monitor your progress, and visualize your data to uncover trends!
      </Text>

      {/* Sign Up Button */}
      <Link href="/signup" style={styles.buttonContainer}>
        <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </Link>

      {/* Log In Button */}
      <Link href="/login" style={styles.buttonContainer}>
        <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Log In</Text>
        </LinearGradient>
      </Link>

      {/* Skip Link */}
      <Link href="/home" style={styles.skipText}>
        Skip and Continue
      </Link>
    </View>
  );
}

// Updated styling with system fonts and consistent look as in SignUp
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background for a clean look
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 40, // Space between icon and header
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark gray header text
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'sans-serif', // Default system font (Android) or 'Helvetica' for iOS
  },
  subtitle: {
    fontSize: 16,
    color: '#555', // Slightly lighter gray for subtitle
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif', // Default system font (Android) or 'Helvetica' for iOS
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  buttonGradient: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Slight shadow effect
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 16,
    color: '#2575FC', // Blue text for the skip link
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
