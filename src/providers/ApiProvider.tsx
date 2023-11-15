import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

const ApiContext: any = createContext(null);

interface IMutateProps {
  method: 'PUT' | 'DELETE' | 'POST' | 'GET';
  url?: string;
  data?: object;
}

export const ApiProvider = ({
  children,
  userState,
  setUserState,
  setLoaderState,
}: {
  children: React.ReactElement;
  userState: boolean;
  setUserState: (value: boolean) => any;
  setLoaderState: (value: boolean) => any;
}) => {
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  const onRequest = async ({ method, url, data }: IMutateProps) => {
    const axiosConfig: AxiosRequestConfig | any = {
      baseURL: 'https://apiv5.akilliticaretim.com/api/v5/',
      url,
      method,
      data,
      headers: {
        Accept: '*/*',
        GUID: '24BE-DB0E-D75E-4060',
        'Content-Type': 'application/json',
      },
    };

    const token = await AsyncStorage.getItem('token');

    axiosConfig.headers['Authorization'] = 'Bearer ' + token;

    try {
      setLoaderState(true);
      const response: AxiosResponse = await axios(axiosConfig);
      setLoaderState(false);
      return response.data;
    } catch (error: any) {
      setLoaderState(false);
      if (error.response) return error.response.data;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response ? error.response.data.message : error.message,
      });
      return error.message;
    }
  };

  const onLogin = async (data: { username: string; password: string }) => {
    const response = await onRequest({
      method: 'POST',
      url: 'sf/auth/login',
      data,
    });

    if (!response.status) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.error,
      });
    }

    await AsyncStorage.setItem('token', response.data.token);

    setUserState(true);
  };

  const getCategories = async () => {
    const response = await onRequest({
      method: 'GET',
      url: 'ad/product/categories',
    });

    if (response.status) setCategories(response.data.categories);
  };

  const getSubCategories = async (parentId: number) => {
    const response = await onRequest({
      method: 'GET',
      url: 'ad/product/categories?parentId=' + parentId,
    });

    if (response.status) setSubCategories(response.data.categories);
  };

  const getProducts = async (id: number) => {
    const response = await onRequest({
      method: 'GET',
      url: `sf/product/category_products?Id=${id}&PageNumber=1&PageSize=10`,
    });

    if (response.status) setProducts(response.data);
  };

  const getCartProducts = async () => {
    const response = await onRequest({
      method: 'GET',
      url: 'sf/cart/cart-v2',
    });

    if (response.status) setCartProducts([response.data]);
  };

  const updateCartProducts = async ({
    method,
    data,
  }: {
    method: 'ADD' | 'UPDATE';
    data: any;
  }) => {
    const response = await onRequest({
      method: method === 'ADD' ? 'POST' : 'PUT',
      url: 'sf/cart/cart',
      data,
    });

    console.log(response);

    if (response.status) {
      Toast.show({
        type: 'success',
        text1: 'Tebrikler',
        text2: response.data.message,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (userState) getCartProducts();
  }, [userState]);

  return (
    <ApiContext.Provider
      value={{
        onLogin,
        categories,
        subCategories,
        products,
        cartProducts,
        setProducts,
        getSubCategories,
        getProducts,
        getCartProducts,
        updateCartProducts,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
