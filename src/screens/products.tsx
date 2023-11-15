import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useApi } from '../providers/ApiProvider';

const Products = () => {
  const { id }: any = useLocalSearchParams();
  const {
    categories,
    subCategories,
    products,
    cartProducts,
    setProducts,
    getSubCategories,
    getProducts,
    updateCartProducts,
  }: any = useApi();

  const [selectedCategoryID, setSelectedCategoryID] = useState<string>(id);
  const [selectedSubCategoryID, setSelectedSubCategoryID] = useState<
    string | null
  >(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const setScrollViewScroll = (x: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y: 0, animated: true });
    }
  };

  const onUpdateCartProducts = (productId: number, amount: number) => {
    updateCartProducts({
      method: 'ADD',
      data: { productId, amount },
    });
  };

  useEffect(() => {
    getSubCategories(selectedCategoryID);
    setSelectedSubCategoryID(null);
  }, [selectedCategoryID]);

  useEffect(() => {
    if (!selectedSubCategoryID) return setProducts([]);
    getProducts(selectedSubCategoryID);
  }, [selectedSubCategoryID]);

  const styles = {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 15,
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* categories */}
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 10 }}>
          {categories.map((category: any) => (
            <TouchableOpacity
              key={category.id}
              onLayout={event =>
                selectedCategoryID == category.id &&
                setScrollViewScroll(event.nativeEvent.layout.x)
              }
              onPress={() => setSelectedCategoryID(category.id)}
              style={[
                styles,
                selectedCategoryID == category.id && {
                  backgroundColor: 'orange',
                },
              ]}>
              <Text>{category.categoryName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* sub-categories */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 10 }}>
          {subCategories.map((subCategory: any) => (
            <TouchableOpacity
              key={subCategory.id}
              onPress={() => setSelectedSubCategoryID(subCategory.id)}
              style={[
                styles,
                selectedSubCategoryID == subCategory.id && {
                  backgroundColor: 'orange',
                },
              ]}>
              <Text>{subCategory.categoryName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* products */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        {products.map((product: any) => (
          <View
            key={product.id}
            style={{
              borderColor: 'orange',
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{ uri: product.productImages[0].imagePath }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ fontSize: 10 }}>{product.priceVat}</Text>
            <Text style={{ fontSize: 10 }}>{product.stockName}</Text>
            <View
              style={{
                height: '100%',
                position: 'absolute',
                alignSelf: 'flex-end',
                justifyContent: 'space-between',
                alignItems: 'center',
                right: 5,
              }}>
              <Ionicons
                name="add-circle"
                size={24}
                color="orange"
                onPress={() => onUpdateCartProducts(product.id, 1)}
              />
              <Ionicons name="remove-circle" size={24} color="orange" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Products;
