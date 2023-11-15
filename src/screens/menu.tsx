import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useApi } from '../providers/ApiProvider';

const Menu = () => {
  const { categories }: any = useApi();

  return (
    <ScrollView>
      {categories.map((category: any) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => router.replace('products/' + category.id)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>{category.categoryName}</Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Menu;
