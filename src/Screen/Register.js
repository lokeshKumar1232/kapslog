import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-animatable';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const validate = () => {
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = 'Full Name is required';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        console.log({ fullName, email, password, confirmPassword });
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>{
        navigation.goBack()
      }}
      >
      <Image
      source={require('../Assets/backarrow.png')}
      style={{
        width:24,
        height:24,
        resizeMode:'contain'
      }}
      />
      </TouchableOpacity>
     
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={setFullName}
        value={fullName}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.registerButtonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop:32
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
  registerButton: {
    backgroundColor: 'blue',
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Register;
