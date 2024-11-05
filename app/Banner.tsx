// Banner.tsx
import React, { useEffect, useState } from 'react';
import { Box, CardMedia } from '@mui/material';

const images = [
  'https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/TNAGP4.jpg?v=gqGP8L', 
  'https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Snack.jpg?v=gqGP8L',
  'https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Dinner.jpg?v=gqGP8L',
];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Chuyển đổi hình ảnh mỗi 10 giây

    return () => clearInterval(interval); 
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <CardMedia
          key={index}
          component="img"
          image={image}
          alt={`Banner ${index}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: `${(index - currentIndex) * 100}%`, // Điều chỉnh vị trí hình ảnh
            width: '100%',
            height: '100%',
            transition: 'left 0.5s ease-in-out', // Hiệu ứng chuyển tiếp
          }}
        />
      ))}
    </Box>
  );
};

export default Banner;
