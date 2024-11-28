import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView, Image } from 'react-native';  // Import Image
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function SettingsScreen() {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // State for username
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    setIsLoggedIn(!!auth.currentUser);
    
    // Fetch username from AsyncStorage
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUsername();
  }, []);

  const togglePushNotifications = () => setPushNotificationsEnabled(prev => !prev);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been successfully logged out.");
      setIsLoggedIn(false);
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.accountContainer}>
        <Image 
          source={require('../../assets/images/user.png')} // Add the image from assets
          style={styles.profileImage} // Apply styles to the image
        />
        <Text style={styles.accountName}>{username || "No username set"}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.sectionContent}>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Change e-mail address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Change password</Text>
          </TouchableOpacity>
          <View style={styles.pushNotificationsContainer}>
            <Text style={styles.linkText}>Push notifications</Text>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={togglePushNotifications}
              trackColor={{ false: '#ccc', true: '#6A11CB' }}
              thumbColor={pushNotificationsEnabled ? '#fff' : '#ccc'}
            />
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>More</Text>
        <View style={styles.sectionContent}>
          <Link href="/form" style={styles.link}>
            <Text style={styles.linkText}>Contact us</Text>
          </Link>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoggedIn ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.gradientButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.gradientButton}>
              <Text style={styles.authButtonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.gradientButton}>
              <Text style={styles.authButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000', // Set the color to black like in the SignUp page
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'sans-serif', // Use the default system font (Android) or 'Helvetica' for iOS, like in SignUp page
  },
  santaEmoji: {
    fontSize: 40,
    marginRight: 10,
  },
  accountContainer: {
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80, // Adjust size of the image
    height: 80, // Adjust size of the image
    borderRadius: 10, // Make the image round
    marginRight: 10,
  },
  accountName: {
    fontSize: 20,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 10,
  },
  link: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    color: '#333',
  },
  pushNotificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoutButton: {
    marginTop: 40,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authButtonsContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
