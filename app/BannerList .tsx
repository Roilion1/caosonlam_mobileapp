import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineShoppingCart, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 8;
  const navigate = useNavigate(); // Khai báo useNavigate để chuyển hướng

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/banner');
        setBanners(response.data.banners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Hàm xử lý khi nhấn vào nút xem chi tiết
  const handleViewDetail = (id) => {
    navigate(`/banner/${id}`); // Chuyển hướng đến trang BannerDetail với ID cụ thể
  };

  return (
    <div>
      <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ BANNER</h1>
      <div style={styles.container}>
        {currentBanners.map((banner) => (
          <div key={banner.id} style={styles.item}>
            <div>
              <img
                src={`http://localhost:8000/images/banners/${banner.image}`}
                alt={banner.name}
                style={styles.image}
              />
            </div>
            <div>
              <h3 style={styles.title}>{banner.name}</h3>
              <p style={styles.price}>100.000 VND</p>
            </div>
            <div style={styles.buttonContainer}>
              <button style={{ ...styles.button, ...styles.cartButton }}>
                <AiOutlineShoppingCart className="mr-2" />
              </button>
              <button
                onClick={() => handleViewDetail(banner.id)} // Gọi hàm handleViewDetail
                style={{ ...styles.button, ...styles.viewButton }}
              >
                <AiOutlineEye className="mr-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(banners.length / bannersPerPage) }, (_, index) => (
          <div
            key={index + 1}
            style={{
              ...styles.pageItem,
              ...(currentPage === index + 1 ? styles.activePage : {}),
            }}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
    },
    item: {
      flex: '1 1 calc(25% - 20px)', 
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      textAlign: 'center',
      minHeight: '450px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
      height: '250px', 
      objectFit: 'cover', 
      borderRadius: '8px',
      marginBottom: '10px',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '10px 0',
    },
    price: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '10px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer',
    },
    cartButton: {
      backgroundColor: 'blue',
    },
    viewButton: {
      backgroundColor: 'purple',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    pageItem: {
      margin: '0 5px',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#f1f1f1',
    },
    activePage: {
      backgroundColor: '#007bff',
      color: 'white',
    },
  };

export default BannerList;
