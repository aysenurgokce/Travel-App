import { 
    View, 
    Text, 
    SafeAreaView ,
    Image, 
    TouchableOpacity, 
    Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HeroImage } from '../assets';
import * as LocalAuthentication from 'expo-local-authentication'; 
import {useState , useEffect} from 'react';

const HomeScreen = () => {
    const[ isBiometricSupported , setIsBiometricSupported] =useState(false);
    const[ isAuthentication , setIsAuthentication] =useState(false);
    useEffect(() => {
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
      })();
    });
  
    const fallBackToDefaultAuth = () =>{
      console.log('fall back to password authentication');
    };
  
    const alertComponent = (title , mess , btnTxt , btnFunc) => {
        return Alert.alert(title , mess ,[
            {
                text : btnTxt,
                onPress : btnFunc,
            }
        ]);
    };
    const TwoButtonAlert = () =>
   Alert.alert('Welcom To Travel App' , 'IAM Travel' , [
    {
        text : 'Back',
        onPress : () => console.log('Cancel Pressed'),
        style : 'Cancel'
    },
    {
        text : 'Continue',
        onPress : () => navigation.navigate("Discover")
    },
   ]);
   const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if(!isBiometricAvailable)
    return alertComponent(
        'Please enter your password',
        'Biometric Auth not Supported',
        'Ok',
        () => fallBackToDefaultAuth
    );

    let supportedBiometrics;
    if(isBiometricAvailable)
        supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if(!savedBiometrics)
    return alertComponent(
        'Biometric record not found',
        'Please Login with Password',
        'Ok',
        () => fallBackToDefaultAuth
    );

    const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        cancelLabel : 'Cancel',
        disableDeviceFallback : false,
    });

    if(biometricAuth) {TwoButtonAlert()};
    console.log({isBiometricAvailable});
    console.log({supportedBiometrics});
    console.log({savedBiometrics});
    console.log({biometricAuth});
    
   };


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
         });
    }, []);
  return (
    <SafeAreaView className = "bg-white flex-1 relative">
        {/*First Section*/}
        <View className = "flex-row px-6 mt-8 items-center space-x-2">
            <View className = "w-16 h-16 bg-black rounded-full items-center justify-center"> 
                <Text className = "text-[#00BCC9] text-2xl font-semibold">IAM</Text>
            </View>  
            <Text className = "text-[#2A2B4B] text-2xl font-semibold">Travel</Text>
        </View>
        {/*First Section*/}
        <View className = "px-6 mt-8 space-y-3">
                <Text className = "text-[#3C6072] text-[35px]">To The World Of An</Text>
                <Text className = "text-[#00BCC9] text-[30px] font-bold">Incredible Vacation</Text>
                <Text className = "text-[#3C6072] text-base">
                {isBiometricSupported
                ? 'Your Device Is Compatible with Biometrics'
                : 'Face or fingerprint scanner is avaible  on this  device'
                }
                </Text>
        </View>
        {/*First Section*/}
        <View className="w-[400px] h-[400px] bg-[#00BCC9] rounded-full absolute bottom-36 -right-36"></View>
        <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>
        {/*First Section*/}
        <View className = "flex-1 relative items-center justify-center">
            <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source = {HeroImage}
            className = "w-full h-full object-cover mt-20"/>
           <TouchableOpacity 
           onPress={handleBiometricAuth}
           className ="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] 
           rounded-full items-center justify-center">    
                    <Animatable.View 
                    animation="pulse"
                    easing="ease-in-out"
                    iterationCount={"infinite"}
                    className ="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]">
                        <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
                    </Animatable.View>      
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};
export default HomeScreen
