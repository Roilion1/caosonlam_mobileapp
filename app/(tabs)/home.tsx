import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment, Grid, Card, CardMedia, CardContent, Button, Box, Snackbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cart from '../Cart';
import ProductDetail from '../ProductDetail';
import Menu from '../Menu';
import Promotions from '../Promotions ';
import BannerList from '../BannerList ';
import BannerDetail from '../BannerDetail';
// import Product from '../Product';
import Banner from '../Banner';
import { View, Text } from 'react-native';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Gà chiên giòn', price: 100000, image: 'https://th.bing.com/th?id=OIP.1uE1JS6V5CyVKLVpxF7kogHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
  { id: 2, name: 'Đùi gà gốc tư nướng giấy bạc', price: 150000, image: 'https://www.bing.com/th?id=OIP.TGobRCZCrvM2oBKzoFaRDAHaE3&w=179&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
  { id: 3, name: 'Cơm gà chiên giòn', price: 200000, image: 'https://www.bing.com/th?id=OIP.sR76VbpaQNkzhkBVj4FZHwHaJY&w=122&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
];

const Header: React.FC<{ cartItemsCount: number; searchTerm: string; setSearchTerm: (term: string) => void }> = ({
  cartItemsCount,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={styles.title}>
          KFC
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={styles.searchBar}
        />

        <Link to="/Cart" style={{ textDecoration: 'none' }}>
          <IconButton color="inherit">
            <ShoppingCartIcon />
            {cartItemsCount > 0 && <span style={styles.cartBadge}>{cartItemsCount}</span>}
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({
  product,
  onAddToCart,
}) => {
  return (
    <Card style={styles.card}>
      <CardMedia component="img" height="350" image={product.image} alt={product.name} style={styles.cardImage} />
      <CardContent style={styles.cardContent}>
        <Typography variant="h6" style={styles.productName}>
          {product.name}
        </Typography>
        <Typography variant="body1" style={styles.productPrice}>
          {product.price.toLocaleString('vi-VN')} VND
        </Typography>
        <div style={styles.buttonContainer}>
          <IconButton color="primary" onClick={() => onAddToCart(product)} style={styles.iconButton}>
            <AddShoppingCartIcon />
          </IconButton>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <IconButton color="secondary" style={styles.iconButton}>
              <VisibilityIcon />
            </IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductList: React.FC<{ onAddToCart: (product: Product) => void; searchTerm: string }> = ({
  onAddToCart,
  searchTerm,
}) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box padding={4}>
      <Typography variant="h3" style={styles.productListTitle}>
        Danh sách sản phẩm
      </Typography>
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartMessage, setCartMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setCartMessage(`Đã thêm ${product.name} vào giỏ hàng thành công!`);
  };

  const handleCloseSnackbar = () => {
    setCartMessage('');
  };

  function handleRemoveFromCart(productId: number): void {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Kiểm tra số lượng sản phẩm tìm thấy
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <main style={styles.main}>
        <Header cartItemsCount={cartItems.length} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Menu />
        {filteredProducts.length > 0 && filteredProducts.length > 1 && <Banner />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {filteredProducts.length > 0 ? (
                  <>
                    {filteredProducts.length === 1 ? null : <BannerList />}
                    <ProductList onAddToCart={handleAddToCart} searchTerm={searchTerm} isLoggedIn={isLoggedIn} />
                  </>
                ) : (
                  <Typography variant="h6" style={styles.noResults}>
                    Không tìm thấy sản phẩm nào.
                  </Typography>
                )}
              </>
            }
          />
          <Route path="/Promotions" element={<Promotions />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} />} />
          <Route path="/banner/:id" element={<BannerDetail />} />
          <Route path="/Cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
        </Routes>

        <Snackbar
          open={!!cartMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={cartMessage}
        />
        {/* About LV Section */}
        <View style={styles.about}>
          <Text style={styles.sectionTitle}>Gà rán Kentucky</Text>
          <Text style={styles.aboutText}>
            Gà rán Kentucky (KFC), nhãn hiệu được tiên phong bởi ông Harland Sanders, đã phát triển và trở thành một trong những hệ thống phục vụ thức ăn nhanh lớn nhất trên thế giới, với hơn 1 tỉ bữa ăn tối KFC được phục vụ hàng năm trên hơn 80 quốc gia khác nhau.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Louis Vuitton. All rights reserved.</Text>
        </View>
      </main>
    </Router>
  );
};

const styles = {
  title: {
    flexGrow: 1,
  },
  searchBar: {
    marginRight: '16px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardImage: {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  cardContent: {
    padding: '16px',
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  productPrice: {
    color: '#ff5722',
    marginBottom: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: '8px',
  },
  main: {
    flex: '1 0 auto',
    overflowY: 'auto',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  about: {
    padding: 16,
    backgroundColor: '#f0f0f0', 
    marginBottom: 16, 
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  aboutText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '60px',
    textAlign: 'center',
    position: 'relative', 
  },
  footerText: {
    padding: '16px',
    textAlign: 'center',
    color: '#666',
  },
};

export default Home;
