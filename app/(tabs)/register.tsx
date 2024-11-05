import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native'; // Thêm Picker từ react-native
import AuthService from '../AuthService';
import { useRouter } from 'expo-router';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        fullname: '',
        email: '',
        password: '',
        phone: '',
        gender: '', // Thêm trường gender vào state
        address: '',
        roles: 'customer', // Vai trò mặc định là khách hàng
    });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (name, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await AuthService.register(form); 
            Alert.alert('Đăng ký thành công!', 'Bạn có thể đăng nhập ngay bây giờ.');
            router.navigate('/login'); 
        } catch (error) {
            setMessage('Đăng ký thất bại, vui lòng thử lại');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Đăng Ký</Text>
            {message && <Text style={styles.error}>{message}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={form.name}
                onChangeText={(value) => handleChange('name', value)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Tên đầy đủ"
                value={form.fullname}
                onChangeText={(value) => handleChange('fullname', value)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(value) => handleChange('email', value)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={form.phone}
                onChangeText={(value) => handleChange('phone', value)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={form.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={form.address}
                onChangeText={(value) => handleChange('address', value)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {/* Thêm trường chọn giới tính */}
            <Text style={styles.label}>Giới tính:</Text>
            <Picker
                selectedValue={form.gender}
                style={styles.picker}
                onValueChange={(itemValue) => handleChange('gender', itemValue)}
            >
                <Picker.Item label="Chọn giới tính" value="" />
                <Picker.Item label="Nam" value="male" />
                <Picker.Item label="Nữ" value="female" />
                <Picker.Item label="Khác" value="other" />
            </Picker>
            <Button title="Đăng Ký" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    picker: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
});

export default Register;
