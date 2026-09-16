import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
    
      <Stack initialRouteName="splashscreen">
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen" options={{ headerShown: false}}/> 
        <Stack.Screen name="splashscreen" options={{ headerShown: false }}/>
        <Stack.Screen name="powerbyscreen" options={{ headerShown: false }}/>
         <Stack.Screen name="Registerscreen" options={{ headerShown: false }}/>
          <Stack.Screen name="add" options={{ headerShown: false }}/> 
      </Stack>
    
  );
}
