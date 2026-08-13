import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
    
      <Stack initialRouteName="splashscreen">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen" options={{ headerShown: false}}/> 
        <Stack.Screen name="splashscreen" options={{ headerShown: false }}/>
        <Stack.Screen name="powerbyscreen" options={{ headerShown: false }}/>
<<<<<<< HEAD
        <Stack.Screen name="loginscreen" options={{ headerShown: false }}/>
        <Stack.Screen name="Registerscreen" options={{ headerShown: false }}/>
        
=======
         <Stack.Screen name="Registerscreen" options={{ headerShown: false }}/>
>>>>>>> fc29fbcc48b3ea1ed3d56467d0f1fa8d2ae2cf11
      </Stack>
    
  );
}

