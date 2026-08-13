import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
    
      <Stack initialRouteName="splashscreen">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }}/> 
        <Stack.Screen name="splashscreen" options={{ headerShown: false }}/>
        <Stack.Screen name="powerbyscreen" options={{ headerShown: false }}/>
        
      </Stack>
    
  );
}

