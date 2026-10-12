// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";

// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   RefreshControl,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // ======================================================
// // ESP32 SETUP IP
// // ======================================================

// const ESP32_SETUP_IP = "192.168.4.1";

// // Change this to your actual home route if required
// const NEXT_SCREEN = "/(drawer)/(tabs)";

// // ======================================================
// // WIFI TYPE
// // ======================================================

// type WiFiNetwork = {
//   ssid: string;
//   rssi: number;
//   secure: boolean;
// };

// // ======================================================
// // MAIN
// // ======================================================

// export default function WiFiSetup() {
//   const [networks, setNetworks] = useState<WiFiNetwork[]>([]);

//   const [selectedNetwork, setSelectedNetwork] =
//     useState<WiFiNetwork | null>(null);

//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(true);

//   const [refreshing, setRefreshing] = useState(false);

//   const [connecting, setConnecting] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   // ====================================================
//   // SCAN WHEN SCREEN OPENS
//   // ====================================================

//   useEffect(() => {
//     scanWiFi();
//   }, []);

//   // ====================================================
//   // SCAN WIFI
//   // ====================================================

//   const scanWiFi = async () => {
//     try {
//       setLoading(true);

//       console.log("================================");
//       console.log("Starting Wi-Fi scan...");
//       console.log("ESP32:", ESP32_SETUP_IP);
//       console.log("================================");

//       // -----------------------------------------------
//       // TIMEOUT
//       // -----------------------------------------------

//       const controller = new AbortController();

//       const timeout = setTimeout(() => {
//         controller.abort();
//       }, 15000);

//       // -----------------------------------------------
//       // REQUEST ESP32
//       // -----------------------------------------------

//       const response = await fetch(
//         `http://${ESP32_SETUP_IP}/scan`,
//         {
//           method: "GET",
//           signal: controller.signal,
//         }
//       );

//       clearTimeout(timeout);

//       console.log("ESP32 response status:", response.status);

//       if (!response.ok) {
//         throw new Error(
//           `ESP32 returned ${response.status}`
//         );
//       }

//       // -----------------------------------------------
//       // READ JSON
//       // -----------------------------------------------

//       const data = await response.json();

//       console.log(
//         "Wi-Fi data received:",
//         JSON.stringify(data, null, 2)
//       );

//       // -----------------------------------------------
//       // CHECK DATA
//       // -----------------------------------------------

//       if (
//         !data ||
//         !Array.isArray(data.networks)
//       ) {
//         throw new Error(
//           "ESP32 returned invalid Wi-Fi data"
//         );
//       }

//       // -----------------------------------------------
//       // CLEAN NETWORK LIST
//       // -----------------------------------------------

//       const validNetworks: WiFiNetwork[] =
//         data.networks
//           .filter(
//             (network: any) =>
//               network &&
//               typeof network.ssid === "string" &&
//               network.ssid.trim().length > 0
//           )
//           .map((network: any) => ({
//             ssid: network.ssid,
//             rssi: Number(network.rssi) || -100,
//             secure: Boolean(network.secure),
//           }));

//       // -----------------------------------------------
//       // SORT STRONGEST FIRST
//       // -----------------------------------------------

//       validNetworks.sort(
//         (a, b) => b.rssi - a.rssi
//       );

//       // -----------------------------------------------
//       // REMOVE DUPLICATES
//       // -----------------------------------------------

//       const uniqueNetworks: WiFiNetwork[] = [];

//       validNetworks.forEach((network) => {
//         const exists = uniqueNetworks.some(
//           (item) =>
//             item.ssid === network.ssid
//         );

//         if (!exists) {
//           uniqueNetworks.push(network);
//         }
//       });

//       // -----------------------------------------------
//       // UPDATE SCREEN
//       // -----------------------------------------------

//       setNetworks(uniqueNetworks);

//       console.log(
//         "Networks displayed:",
//         uniqueNetworks.length
//       );

//       if (uniqueNetworks.length === 0) {
//         console.log(
//           "ESP32 did not find any Wi-Fi networks."
//         );
//       }
//     } catch (error: any) {
//       console.log(
//         "Wi-Fi scan error:",
//         error
//       );

//       let message =
//         "Could not get Wi-Fi networks from the ESP32.";

//       if (
//         error?.name === "AbortError"
//       ) {
//         message =
//           "ESP32 did not respond within 15 seconds.";
//       }

//       Alert.alert(
//         "Wi-Fi Scan Failed",
//         `${message}\n\nMake sure your phone is connected to:\nMEDI-DISPENSER`,
//         [
//           {
//             text: "Try Again",
//             onPress: () => {
//               scanWiFi();
//             },
//           },
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//         ]
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ====================================================
//   // PULL TO REFRESH
//   // ====================================================

//   const refreshWiFi = async () => {
//     try {
//       setRefreshing(true);

//       const controller =
//         new AbortController();

//       const timeout = setTimeout(() => {
//         controller.abort();
//       }, 15000);

//       const response = await fetch(
//         `http://${ESP32_SETUP_IP}/scan`,
//         {
//           method: "GET",
//           signal: controller.signal,
//         }
//       );

//       clearTimeout(timeout);

//       if (!response.ok) {
//         throw new Error(
//           "ESP32 scan failed"
//         );
//       }

//       const data =
//         await response.json();

//       if (
//         !data ||
//         !Array.isArray(data.networks)
//       ) {
//         throw new Error(
//           "Invalid ESP32 response"
//         );
//       }

//       const list: WiFiNetwork[] =
//         data.networks
//           .filter(
//             (network: any) =>
//               network?.ssid &&
//               network.ssid.trim().length > 0
//           )
//           .map((network: any) => ({
//             ssid: network.ssid,
//             rssi:
//               Number(network.rssi) || -100,
//             secure:
//               Boolean(network.secure),
//           }));

//       // Strongest signal first
//       list.sort(
//         (a, b) => b.rssi - a.rssi
//       );

//       // Remove duplicates
//       const unique: WiFiNetwork[] = [];

//       list.forEach((network) => {
//         if (
//           !unique.some(
//             (item) =>
//               item.ssid === network.ssid
//           )
//         ) {
//           unique.push(network);
//         }
//       });

//       setNetworks(unique);

//       console.log(
//         "Refreshed networks:",
//         unique
//       );
//     } catch (error) {
//       console.log(
//         "Refresh error:",
//         error
//       );

//       Alert.alert(
//         "Scan Failed",
//         "Could not scan Wi-Fi networks. Make sure your phone is connected to MEDI-DISPENSER."
//       );
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   // ====================================================
//   // SIGNAL LEVEL
//   // ====================================================

//   const getSignal = (
//     rssi: number
//   ) => {
//     if (rssi >= -50) {
//       return {
//         text: "Excellent",
//         icon: "wifi-strength-4",
//       };
//     }

//     if (rssi >= -65) {
//       return {
//         text: "Good",
//         icon: "wifi-strength-3",
//       };
//     }

//     if (rssi >= -75) {
//       return {
//         text: "Fair",
//         icon: "wifi-strength-2",
//       };
//     }

//     return {
//       text: "Weak",
//       icon: "wifi-strength-1",
//     };
//   };

//   // ====================================================
//   // SELECT NETWORK
//   // ====================================================

//   const selectNetwork = (
//     network: WiFiNetwork
//   ) => {
//     setSelectedNetwork(network);

//     setPassword("");

//     setShowPassword(false);
//   };

//   // ====================================================
//   // CONNECT ESP32
//   // ====================================================

//   const connectWiFi = async () => {
//     if (!selectedNetwork) {
//       Alert.alert(
//         "Select Wi-Fi",
//         "Please select a Wi-Fi network first."
//       );

//       return;
//     }

//     if (
//       selectedNetwork.secure &&
//       password.length === 0
//     ) {
//       Alert.alert(
//         "Password Required",
//         "Please enter the Wi-Fi password."
//       );

//       return;
//     }

//     try {
//       setConnecting(true);

//       console.log(
//         "Connecting ESP32 to:",
//         selectedNetwork.ssid
//       );

//       const controller =
//         new AbortController();

//       const timeout = setTimeout(() => {
//         controller.abort();
//       }, 25000);

//       const response = await fetch(
//         `http://${ESP32_SETUP_IP}/connect`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           body: JSON.stringify({
//             ssid: selectedNetwork.ssid,
//             password: password,
//           }),

//           signal: controller.signal,
//         }
//       );

//       clearTimeout(timeout);

//       const data =
//         await response.json();

//       console.log(
//         "ESP32 connection response:",
//         data
//       );

//       if (data.success === true) {
//         Alert.alert(
//           "Wi-Fi Connected",
//           `Medicine dispenser connected to:\n\n${selectedNetwork.ssid}\n\nESP32 IP: ${data.ip}`,
//           [
//             {
//               text: "Continue",
//               onPress: () => {
//                 router.replace(
//                   NEXT_SCREEN
//                 );
                
//               },
//             },
//           ]
//         );
//        await AsyncStorage.setItem("wifi_set","true")
//       } 
//       else {
//         Alert.alert(
//           "Connection Failed",
//           data.message ||
//             "Could not connect to this Wi-Fi."
//         );
//       }
//     } catch (error) {
//       console.log(
//         "Connection error:",
//         error
//       );

//       Alert.alert(
//         "Connection Error",
//         "The ESP32 could not connect to the selected Wi-Fi network."
//       );
//     } finally {
//       setConnecting(false);
//     }
//   };

//   // ====================================================
//   // NETWORK ITEM
//   // ====================================================

//   const renderNetwork = ({
//     item,
//   }: {
//     item: WiFiNetwork;
//   }) => {
//     const signal =
//       getSignal(item.rssi);

//     const selected =
//       selectedNetwork?.ssid ===
//       item.ssid;

//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() =>
//           selectNetwork(item)
//         }
//         style={[
//           styles.networkCard,
//           selected &&
//             styles.networkCardSelected,
//         ]}
//       >
//         {/* WIFI ICON */}

//         <View style={styles.wifiIconBox}>
//           <MaterialCommunityIcons
//             name="wifi"
//             size={28}
//             color={
//               selected
//                 ? "#536DFF"
//                 : "#536DFF"
//             }
//           />
//         </View>

//         {/* DETAILS */}

//         <View
//           style={
//             styles.networkDetails
//           }
//         >
//           <Text
//             style={styles.ssid}
//             numberOfLines={1}
//           >
//             {item.ssid}
//           </Text>

//           <View
//             style={
//               styles.networkSubRow
//             }
//           >
//             <MaterialCommunityIcons
//               name={
//                 signal.icon as any
//               }
//               size={18}
//               color="#536DFF"
//             />

//             <Text
//               style={
//                 styles.signalText
//               }
//             >
//               {signal.text}
//             </Text>

//             <Text
//               style={styles.rssi}
//             >
//               {item.rssi} dBm
//             </Text>
//           </View>
//         </View>

//         {/* LOCK */}

//         <View style={styles.rightIcons}>
//           {item.secure && (
//             <MaterialCommunityIcons
//               name="lock"
//               size={20}
//               color="#777"
//             />
//           )}

//           {selected && (
//             <MaterialCommunityIcons
//               name="check-circle"
//               size={25}
//               color="#536DFF"
//             />
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // ====================================================
//   // PASSWORD SCREEN
//   // ====================================================

//   if (selectedNetwork) {
//     return (
//       <SafeAreaView
//         style={styles.container}
//       >
//         <StatusBar
//           barStyle="dark-content"
//         />

//         {/* HEADER */}

//         <LinearGradient
//           colors={[
//             "#2DA8FF",
//             "#536DFF",
//             "#8A4DFF",
//           ]}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               setSelectedNetwork(null)
//             }
//             style={styles.backButton}
//           >
//             <MaterialCommunityIcons
//               name="arrow-left"
//               size={28}
//               color="white"
//             />
//           </TouchableOpacity>

//           <Text
//             style={styles.headerTitle}
//           >
//             Connect Wi-Fi
//           </Text>

//           <Text
//             style={styles.headerSubtitle}
//           >
//             Enter the password
//           </Text>
//         </LinearGradient>

//         {/* SELECTED WIFI */}

//         <View
//           style={
//             styles.selectedWifiCard
//           }
//         >
//           <MaterialCommunityIcons
//             name="wifi"
//             size={40}
//             color="#536DFF"
//           />

//           <View
//             style={
//               styles.selectedWifiInfo
//             }
//           >
//             <Text
//               style={
//                 styles.selectedWifiName
//               }
//               numberOfLines={1}
//             >
//               {selectedNetwork.ssid}
//             </Text>

//             <Text
//               style={
//                 styles.selectedWifiSignal
//               }
//             >
//               {getSignal(
//                 selectedNetwork.rssi
//               ).text}
//             </Text>
//           </View>
//         </View>

//         {/* OPEN WIFI */}

//         {!selectedNetwork.secure ? (
//           <View
//             style={
//               styles.openNetworkBox
//             }
//           >
//             <MaterialCommunityIcons
//               name="lock-open-outline"
//               size={24}
//               color="#536DFF"
//             />

//             <Text
//               style={
//                 styles.openNetworkText
//               }
//             >
//               This Wi-Fi network does not
//               require a password.
//             </Text>
//           </View>
//         ) : (
//           <View
//             style={
//               styles.passwordContainer
//             }
//           >
//             <Text
//               style={
//                 styles.inputLabel
//               }
//             >
//               Wi-Fi Password
//             </Text>

//             <View
//               style={styles.inputWrapper}
//             >
//               <MaterialCommunityIcons
//                 name="lock-outline"
//                 size={22}
//                 color="#777"
//               />

//               <TextInput
//                 value={password}
//                 onChangeText={
//                   setPassword
//                 }
//                 placeholder="Enter password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={
//                   !showPassword
//                 }
//                 style={
//                   styles.passwordInput
//                 }
//                 autoCapitalize="none"
//               />

//               <TouchableOpacity
//                 onPress={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//               >
//                 <MaterialCommunityIcons
//                   name={
//                     showPassword
//                       ? "eye-off"
//                       : "eye"
//                   }
//                   size={22}
//                   color="#777"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}

//         {/* CONNECT BUTTON */}

//         <TouchableOpacity
//           activeOpacity={0.85}
//           disabled={connecting}
//           onPress={connectWiFi}
//           style={styles.connectButton}
//         >
//           <LinearGradient
//             colors={[
//               "#2DA8FF",
//               "#536DFF",
//               "#8A4DFF",
//             ]}
//             style={
//               styles.connectGradient
//             }
//           >
//             {connecting ? (
//               <>
//                 <ActivityIndicator
//                   color="white"
//                 />

//                 <Text
//                   style={
//                     styles.connectText
//                   }
//                 >
//                   Connecting...
//                 </Text>
//               </>
//             ) : (
//               <>
//                 <MaterialCommunityIcons
//                   name="wifi-check"
//                   size={24}
//                   color="white"
//                 />

//                 <Text
//                   style={
//                     styles.connectText
//                   }
//                 >
//                   Connect Dispenser
//                 </Text>
//               </>
//             )}
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* INFO */}

//         <View
//           style={styles.bottomInfo}
//         >
//           <MaterialCommunityIcons
//             name="information-outline"
//             size={22}
//             color="#536DFF"
//           />

//           <Text
//             style={styles.infoText}
//           >
//             The ESP32 will connect to this
//             Wi-Fi network and remember it
//             for future use.
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // ====================================================
//   // WIFI LIST SCREEN
//   // ====================================================

//   return (
//     <SafeAreaView
//       style={styles.container}
//     >
//       <StatusBar
//         barStyle="dark-content"
//       />

//       {/* HEADER */}

//       <LinearGradient
//         colors={[
//           "#2DA8FF",
//           "#536DFF",
//           "#8A4DFF",
//         ]}
//         style={styles.header}
//       >
//         <MaterialCommunityIcons
//           name="wifi-cog"
//           size={45}
//           color="white"
//         />

//         <Text
//           style={styles.headerTitle}
//         >
//           Connect Dispenser
//         </Text>

//         <Text
//           style={styles.headerSubtitle}
//         >
//           Select your Wi-Fi network
//         </Text>
//       </LinearGradient>

//       {/* ESP32 STATUS */}

//       <View
//         style={styles.espStatus}
//       >
//         <View
//           style={styles.statusDot}
//         />

//         <Text
//           style={styles.statusText}
//         >
//           Connected to MEDI-DISPENSER
//         </Text>
//       </View>

//       {/* TITLE */}

//       <View
//         style={styles.listHeader}
//       >
//         <View>
//           <Text
//             style={styles.listTitle}
//           >
//             Available Wi-Fi
//           </Text>

//           {!loading && (
//             <Text
//               style={
//                 styles.networkCount
//               }
//             >
//               {networks.length} network
//               {networks.length !== 1
//                 ? "s"
//                 : ""}{" "}
//               found
//             </Text>
//           )}
//         </View>

//         {/* SCAN BUTTON */}

//         <TouchableOpacity
//           onPress={scanWiFi}
//           disabled={loading}
//           style={styles.scanButton}
//         >
//           <MaterialCommunityIcons
//             name="refresh"
//             size={22}
//             color="#536DFF"
//           />

//           <Text
//             style={styles.scanText}
//           >
//             Scan
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* LOADING */}

//       {loading ? (
//         <View
//           style={styles.loadingContainer}
//         >
//           <ActivityIndicator
//             size="large"
//             color="#536DFF"
//           />

//           <Text
//             style={styles.loadingTitle}
//           >
//             Scanning Wi-Fi...
//           </Text>

//           <Text
//             style={styles.loadingSubtitle}
//           >
//             ESP32 is searching for
//             nearby networks
//           </Text>
//         </View>
//       ) : networks.length === 0 ? (
//         // =================================================
//         // NO NETWORKS
//         // =================================================

//         <View
//           style={styles.emptyContainer}
//         >
//           <MaterialCommunityIcons
//             name="wifi-off"
//             size={65}
//             color="#999"
//           />

//           <Text
//             style={styles.emptyTitle}
//           >
//             No Wi-Fi Networks Found
//           </Text>

//           <Text
//             style={styles.emptyText}
//           >
//             The ESP32 could not find any
//             nearby Wi-Fi networks.
//           </Text>

//           <TouchableOpacity
//             onPress={scanWiFi}
//             style={
//               styles.retryButton
//             }
//           >
//             <Text
//               style={
//                 styles.retryText
//               }
//             >
//               Scan Again
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         // =================================================
//         // WIFI LIST
//         // =================================================

//         <FlatList
//           data={networks}
//           keyExtractor={(
//             item,
//             index
//           ) =>
//             `${item.ssid}-${index}`
//           }
//           renderItem={
//             renderNetwork
//           }
//           contentContainerStyle={
//             styles.listContent
//           }
//           showsVerticalScrollIndicator={
//             false
//           }
//           refreshControl={
//             <RefreshControl
//               refreshing={
//                 refreshing
//               }
//               onRefresh={
//                 refreshWiFi
//               }
//               tintColor="#536DFF"
//             />
//           }
//         />
//       )}

//       {/* BOTTOM */}

//       <View
//         style={styles.bottomInfo}
//       >
//         <MaterialCommunityIcons
//           name="cellphone-wifi"
//           size={22}
//           color="#536DFF"
//         />

//         <Text
//           style={styles.infoText}
//         >
//           Your phone is temporarily
//           connected to the dispenser.
//           Select the Wi-Fi you want the
//           dispenser to use.
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F8FC",
//   },

//   header: {
//     paddingTop: 30,
//     paddingBottom: 30,
//     paddingHorizontal: 24,
//     alignItems: "center",
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },

//   headerTitle: {
//     marginTop: 10,
//     fontSize: 25,
//     fontWeight: "800",
//     color: "white",
//   },

//   headerSubtitle: {
//     marginTop: 5,
//     fontSize: 15,
//     color: "rgba(255,255,255,0.9)",
//   },

//   backButton: {
//     alignSelf: "flex-start",
//     marginBottom: 5,
//   },

//   espStatus: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginTop: 18,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     backgroundColor: "#EAF7EF",
//     borderRadius: 12,
//   },

//   statusDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#22A06B",
//     marginRight: 10,
//   },

//   statusText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#18794E",
//   },

//   listHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     marginTop: 22,
//     marginBottom: 12,
//   },

//   listTitle: {
//     fontSize: 21,
//     fontWeight: "800",
//     color: "#1D1D25",
//   },

//   networkCount: {
//     marginTop: 3,
//     fontSize: 13,
//     color: "#777",
//   },

//   scanButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: "#EEF0FF",
//     borderRadius: 12,
//   },

//   scanText: {
//     marginLeft: 6,
//     color: "#536DFF",
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   listContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },

//   networkCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#E9EAF0",
//   },

//   networkCardSelected: {
//     borderColor: "#536DFF",
//     borderWidth: 2,
//     backgroundColor: "#F4F5FF",
//   },

//   wifiIconBox: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#EEF0FF",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   networkDetails: {
//     flex: 1,
//     marginLeft: 14,
//   },

//   ssid: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#1D1D25",
//   },

//   networkSubRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },

//   signalText: {
//     fontSize: 12,
//     color: "#666",
//     marginLeft: 5,
//   },

//   rssi: {
//     fontSize: 11,
//     color: "#999",
//     marginLeft: 8,
//   },

//   rightIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginLeft: 8,
//   },

//   selectedWifiCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 20,
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "#E5E6EF",
//   },

//   selectedWifiInfo: {
//     flex: 1,
//     marginLeft: 15,
//   },

//   selectedWifiName: {
//     fontSize: 19,
//     fontWeight: "800",
//     color: "#222",
//   },

//   selectedWifiSignal: {
//     marginTop: 5,
//     fontSize: 13,
//     color: "#777",
//   },

//   passwordContainer: {
//     marginHorizontal: 20,
//   },

//   inputLabel: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#444",
//     marginBottom: 8,
//   },

//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#DDD",
//     borderRadius: 14,
//     paddingHorizontal: 15,
//   },

//   passwordInput: {
//     flex: 1,
//     height: 55,
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: "#222",
//   },

//   openNetworkBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 20,
//     padding: 16,
//     backgroundColor: "#EEF0FF",
//     borderRadius: 14,
//   },

//   openNetworkText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 14,
//     color: "#555",
//   },

//   connectButton: {
//     marginHorizontal: 20,
//     marginTop: 30,
//     borderRadius: 16,
//     overflow: "hidden",
//   },

//   connectGradient: {
//     height: 58,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   connectText: {
//     marginLeft: 10,
//     color: "white",
//     fontSize: 16,
//     fontWeight: "800",
//   },

//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },

//   loadingTitle: {
//     marginTop: 18,
//     fontSize: 19,
//     fontWeight: "800",
//     color: "#333",
//   },

//   loadingSubtitle: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#777",
//     textAlign: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 35,
//   },

//   emptyTitle: {
//     marginTop: 18,
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#333",
//     textAlign: "center",
//   },

//   emptyText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#777",
//     textAlign: "center",
//     lineHeight: 21,
//   },

//   retryButton: {
//     marginTop: 20,
//     paddingHorizontal: 25,
//     paddingVertical: 13,
//     backgroundColor: "#536DFF",
//     borderRadius: 12,
//   },

//   retryText: {
//     color: "white",
//     fontWeight: "700",
//   },

//   bottomInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 20,
//     padding: 15,
//     backgroundColor: "#EEF0FF",
//     borderRadius: 14,
//   },

//   infoText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 12,
//     lineHeight: 18,
//     color: "#555",
//   },
// });