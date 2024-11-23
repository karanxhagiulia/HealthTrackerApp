import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen() {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    setIsLoggedIn(!!auth.currentUser); // Set `isLoggedIn` based on auth state
  }, []);

  const togglePushNotifications = () => setPushNotificationsEnabled(previousState => !previousState);

  // Function to handle logout
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been successfully logged out.");
      setIsLoggedIn(false);  // Update state to reflect logout
      router.replace("/login"); // Redirect to login screen
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontFamily: 'Mountains-of-Christmas' }]}>Settings</Text>

      <View style={styles.accountContainer}>
        <Text style={styles.santaEmoji}>🎅</Text>
        <Text style={styles.accountName}>Test Account</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
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
            trackColor={{ false: '#ccc', true: '#ff4c4c' }}
            thumbColor={pushNotificationsEnabled ? '#fff' : '#ccc'}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>More</Text>
        
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

      {/* Conditionally render Log Out button if the user is logged in */}
      {isLoggedIn ? (
        <TouchableOpacity style={[styles.link, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.linkText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      ) : (
        // Show Login and Signup buttons if the user is not logged in
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/login')}>
            <Text style={styles.authButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/signup')}>
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e60000',
    textAlign: 'center',
    marginBottom: 40,
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
  accountName: {
    fontSize: 20,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  link: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    color: '#e60000',
    fontWeight: 'bold',
  },
  authButtonsContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  authButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e60000',
    borderRadius: 8,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
