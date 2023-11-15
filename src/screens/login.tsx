import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useApi } from '../../src/providers/ApiProvider';

const Login = () => {
  const { onLogin }: any = useApi();

  const [userName, setUserName] = useState<string>('destek@akilliticaret.com');
  const [password, setPassword] = useState<string>('at253545');

  const styles = {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 15,
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '50%' }}>
        <TextInput
          style={styles}
          value={userName}
          onChangeText={value => setUserName(value)}
        />
        <TextInput
          style={styles}
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        onPress={() => onLogin({ userName, password })}
        style={styles}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
