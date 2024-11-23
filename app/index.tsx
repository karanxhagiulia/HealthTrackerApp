import { Text, View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';  // Import to load custom fonts
//using this function to display the font I choose for Christmas 
export default function Index() {
  const [fontsLoaded] = useFonts({
    'Mountains-of-Christmas': require('../assets/fonts/MountainsofChristmas-Regular.ttf'),  
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Show a loading message while the font is loading
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/imagewelcome.png')}
        style={styles.icon}
      />

      <Text style={[styles.header, { fontFamily: 'Mountains-of-Christmas' }]}>
        Santa is coming to town!
      </Text>

      <Text style={styles.subtitle}>
        Create Christmas Cards and send them to your loved ones!
      </Text>

      <Link href="/signup" style={styles.buttonRed}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Link>

      <Link href="/login" style={styles.buttonRed}>
        <Text style={styles.buttonText}>Log In</Text>
      </Link>

      <Link href="/create" style={styles.skipText}>
        Skip and Continue
      </Link>
    </View>
  );
}
//styling of the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // White background for a clean, light feel
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 220,        
    height: 220,        
    marginBottom: 40,   
    resizeMode: 'contain',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e60000',  // Christmas red color for the title
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',  // Dark grey for secondary text
    marginBottom: 40,
    textAlign: 'center',  // Center the subtitle text
  },
  buttonRed: {
    backgroundColor: '#e60000',  // Red background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',  // Make the button wide
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // White text inside the button
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 16,
    color: '#e60000',  
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',  
  },
});
// © 2024 Karanxha Giulia. All rights reserved.
