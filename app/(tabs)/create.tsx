import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react'; // For managing selected template

export default function CreateScreen() {
  const [selected, setSelected] = useState('template');  // Tracks if template or blank is selected
  const [cardSelected, setCardSelected] = useState(null);  // Tracks which card is selected

  // Import images from assets folder
  const cardImages = [
    require('../../assets/Cards/card1.png'),
    require('../../assets/Cards/card2.png'),
    require('../../assets/Cards/card3.png'),
    require('../../assets/Cards/card4.png'),
    require('../../assets/Cards/card5.png'),
    require('../../assets/Cards/card6.png'),
    require('../../assets/Cards/card3.png'),
    require('../../assets/Cards/card4.png'),
    require('../../assets/Cards/card2.png'),
    require('../../assets/Cards/card1.png')
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={[styles.header, { fontFamily: 'Mountains-of-Christmas' }]}>Create</Text>

      {/* Tab selection (Template or Blank) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selected === 'template' && styles.activeTab]}
          onPress={() => setSelected('template')}
        >
          <Text style={styles.tabText}>Template</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selected === 'blank' && styles.activeTab]}
          onPress={() => setSelected('blank')}
        >
          <Text style={styles.tabText}>Blank</Text>
        </TouchableOpacity>
      </View>

      {/* If "Template" is selected, show card templates below */}
      {selected === 'template' && (
        <ScrollView style={styles.cardsContainer}>
          <Text style={styles.subTitle}>Select a Christmas Card Template</Text>
          <View style={styles.cardsGrid}>
            {cardImages.map((card, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCardSelected(index)} // Set the selected card when clicked
                style={[styles.cardWrapper, cardSelected === index && styles.selectedCard]}
              >
                <Image source={card} style={styles.cardImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Light background for contrast
    padding: 20,
    justifyContent: 'flex-start', // Align content to top
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e60000',  // Christmas red color for the title
    textAlign: 'center',
    marginBottom: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  tabText: {
    fontSize: 18,
    color: '#e60000', // Red color for the text
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#e60000', // Underline the active tab
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    marginTop: 20,
    paddingBottom: 40, // Ensure enough space at the bottom for scroll
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  cardWrapper: {
    width: 200,
    height: 150, 
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e60000', 
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedCard: {
    borderColor: '#ffd33d',
    borderWidth: 4, 
  },
});
