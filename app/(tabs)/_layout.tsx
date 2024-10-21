import { useAuth } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function TabLayout() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={'/sign-up'} />;
  }

  return (
    <>
      <StatusBar hidden />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#B0BEC5',
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1c1c1c' },
          tabBarItemStyle: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            marginTop: 5,
            marginBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={23} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="meditations"
          options={{
            title: 'Meditations',
            tabBarIcon: ({ color }) => <FontAwesome size={23} name="podcast" color={color} />,
          }}
        />
        <Tabs.Screen
          name="sounds"
          options={{
            title: 'Sounds',
            tabBarIcon: ({ color }) => <FontAwesome size={23} name="play-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="articles"
          options={{
            title: 'Articles',
            tabBarIcon: ({ color }) => <FontAwesome size={23} name="info-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome size={23} name="user-circle-o" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
