import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Product } from '../app/(tabs)/home';

interface CartProps {
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const handleRemove = (productId: number) => {
    onRemoveFromCart(productId);
  };

  const handleIncrease = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      onUpdateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrease = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      onUpdateQuantity(productId, item.quantity - 1);
    }
  };

  // Tính tổng giá trị giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box padding={2}>
      <Typography variant="h4">Giỏ hàng</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Giỏ hàng của bạn trống!</Typography>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: '16px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                style={{ width: '80px', height: '80px', marginRight: '16px' }}
              />
              <Typography style={{ flexGrow: 1 }}>
                {item.name} - {item.quantity} x {item.price.toLocaleString('vi-VN')} VND
              </Typography>
              <div>
                <Button variant="contained" color="primary" onClick={() => handleIncrease(item.id)}>+</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDecrease(item.id)} disabled={item.quantity <= 1}>-</Button>
                <Button variant="contained" color="error" onClick={() => handleRemove(item.id)}>Xóa</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {cartItems.length > 0 && (
        <Box marginTop={2}>
          <Typography variant="h5">Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VND</Typography>
          <Button variant="contained" color="success" style={{ marginTop: '16px' }}>
            Thanh toán
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
