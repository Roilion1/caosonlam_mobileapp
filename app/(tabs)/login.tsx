import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import AuthService from '../AuthService';
import { useRouter } from 'expo-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const router = useRouter();

    const backgroundImage = require("./../../assets/images/HinhNen.jpg");

    const handleLogin = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await AuthService.login(email, password);
            console.log('Login successful:', response);
            router.navigate('/home'); // Chuyển hướng đến trang chính
        } catch (error) {
            console.error('Error during login:', error);
            const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi';
            Alert.alert('Đăng nhập thất bại', errorMessage); // Hiển thị thông báo lỗi
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.background}>
            <Image
                source={require('../../assets/images/hinhlogo.jpg')}
                style={styles.reactLogo}
            />
            <Text style={styles.header}>Đăng Nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.button}>
                <Button title={loading ? "Đang xử lý..." : "Đăng Nhập"} onPress={handleLogin} disabled={loading} />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />} {/* Hiện loading spinner */}
            {/* <Text style={styles.registerText}>Chưa có tài khoản?</Text> */}
            <TouchableOpacity onPress={() => router.navigate('/register')}>
                <Text style={styles.registerLink}>Đăng ký ngay!</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        marginHorizontal: 50,
    },
    reactLogo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 50,
        padding: 5,
    },
    registerText: {
        textAlign: 'center',
        marginTop: 20,
    },
    registerLink: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Login;
