import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Slot, router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import { ApiProvider } from '../providers/ApiProvider';
import Login from '../screens/login';

const Header = () => {
  const [prevRath, setPrevPath] = useState<string>('/');
  const pathname = usePathname();

  const onToggle = () => {
    if (pathname !== '/menu') {
      setPrevPath(pathname);
      return router.replace('/menu');
    }

    router.replace(prevRath);
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      }}>
      <TouchableOpacity onPress={() => onToggle()}>
        <Ionicons name="menu-sharp" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const Navbar = () => {
  return (
    <View style={{ padding: 20, backgroundColor: 'orange' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={() => router.replace('home')}>
          <Ionicons name="home-sharp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('cart')}>
          <Ionicons name="cart-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Layout = () => {
  const [userState, setUserState] = useState<boolean>(false);
  const [loaderState, setLoaderState] = useState<boolean>(false);

  const isUserAuthenticated = async () => {
    const value = await AsyncStorage.getItem('token');

    setUserState(!!value);
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <ApiProvider
        userState={userState}
        setUserState={(value: boolean) => setUserState(value)}
        setLoaderState={(value: boolean) => setLoaderState(value)}>
        {!userState ? (
          <Login />
        ) : (
          <View style={{ flex: 1 }}>
            <Header />

            <View style={{ flex: 1 }}>
              <Slot />
            </View>

            <Navbar />
          </View>
        )}
      </ApiProvider>

      {loaderState && <Loader />}
      <Toast />
    </View>
  );
};

export default Layout;
