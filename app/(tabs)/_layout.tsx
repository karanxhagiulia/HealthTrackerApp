import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2575FC', // Active icon color: blue
        tabBarInactiveTintColor: '#555',  // Inactive icon color: gray
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        headerTintColor: '#e60000',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 2, // Optional: adds a subtle border at the top
          borderTopColor: '#2575FC', // Active tab border color (blue)
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#2575FC', // This will add a blue underline for the active tab
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="home"
              color={focused ? '#2575FC' : '#555'}  // Blue color when focused
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: 'Charts',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'bar-chart' : 'insert-chart-outlined'}
              color={focused ? '#2575FC' : '#555'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add-document"
        options={{
          title: 'Add Document',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'note-add' : 'post-add'}
              color={focused ? '#2575FC' : '#555'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'person' : 'person-outline'}
              color={focused ? '#2575FC' : '#555'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
