import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useApi } from '../providers/ApiProvider';

const Home = () => {
  const { categories }: any = useApi();

  const styles = {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 15,
  };

  return (
    <View
      style={{
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
      }}>
      {categories.map((category: any) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => router.replace('products/' + category.id)}
          style={styles}>
          <Text>{category.categoryName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
