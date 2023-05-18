import { View, Text, SafeAreaView , Image} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../assets';

const Discover = () => {
  const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
         });
    }, []);
  return (
    <SafeAreaView className ="flex-1 bg-white relative">
    <View className =" flex-row item-center justify-between px-8 mt-8">
      <View>
      <Text className =" text-[36px] text-[#0B646B]">Discover</Text>
      <Text className =" text-[32px] text-[#527283]">the beauty today</Text>
      </View>
      <View className = "w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
        <Image
         source={Avatar}
         className ="w-full h-full rounded-md object-cover shadow-lg"
        />
      </View>
    </View>
    <View className ="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg">
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDWpuVw2ap-XgX3gmrzsHrZgr1AG4sCxQ',
        language: 'en',
      }}
    />

    </View>


    </SafeAreaView>
  )
}

export default Discover