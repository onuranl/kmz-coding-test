import { ActivityIndicator, Platform, View } from 'react-native';

const Loader = () => (
  <View
    style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0 }}>
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#101623',
        opacity: 0.3,
      }}
    />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator
        size={Platform.OS === 'android' ? 64 : 'large'}
        color="white"
      />
    </View>
  </View>
);

export default Loader;
