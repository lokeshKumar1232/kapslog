import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      // Simulate a network request
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Register');
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login</Text>
      </View>

      <Text style={styles.labelStyle}>Email/Username</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <Text style={styles.labelStyle}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotText}>Forgot?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 56,
    marginBottom: 16,
    paddingLeft: 16,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    borderBottomWidth: 1,
    width: 60,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: 'blue',
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
});

export default Login;
