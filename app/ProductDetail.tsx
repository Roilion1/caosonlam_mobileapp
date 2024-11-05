import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid,} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Cập nhật giao diện Product để phù hợp với cấu trúc dữ liệu thực tế
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; 
  image: string;
  quantity: number; 
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Gà chiên giòn',
    price: 100000,
    image: 'https://th.bing.com/th?id=OIP.1uE1JS6V5CyVKLVpxF7kogHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    quantity: 1,
    description: 'Đùi gà chiên giòn ngon miệng với thịt bò và rau tươi.',
  },
  {
    id: 2,
    name: 'Đùi gà gốc tư nướng giấy bạc',
    price: 150000,
    image: 'https://www.bing.com/th?id=OIP.TGobRCZCrvM2oBKzoFaRDAHaE3&w=179&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    quantity: 1,
    description: 'Đùi gà nướng giấy bạc thơm ngon, đậm đà hương vị.',
  },
  {
    id: 3,
    name: 'Cơm gà chiên giòn',
    price: 200000,
    image: 'https://www.bing.com/th?id=OIP.sR76VbpaQNkzhkBVj4FZHwHaJY&w=122&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    quantity: 1,
    description: 'Cơm gà chiên giòn kèm nước sốt đặc biệt.',
  },
];

// Component ProductDetail
const ProductDetail: React.FC<{ onAddToCart: (product: Product) => void }> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Tìm sản phẩm theo id
  const product: Product | undefined = sampleProducts.find(prod => prod.id === parseInt(id!));

  // Nếu sản phẩm không có, xử lý một cách hợp lý
  if (!product) {
    return <Typography variant="h6">Sản phẩm không tồn tại!</Typography>;
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" marginBottom={3}>
        Chi tiết sản phẩm
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {product.price.toLocaleString('vi-VN')} VND
              </Typography>
              {product.description && (
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
              )}
              
              {/* Hiển thị thông tin chi tiết khác */}
              <Typography variant="body2" color="textSecondary">
                Số lượng: {product.quantity}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onAddToCart(product);
                    navigate('/Cart'); // Chuyển hướng đến giỏ hàng sau khi thêm sản phẩm
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(-1)} // Quay lại trang trước
                >
                  Quay lại
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
