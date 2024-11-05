// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
// import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8; // Số sản phẩm mỗi trang

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/product');
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Lỗi khi tải danh sách sản phẩm:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Lấy sản phẩm cho trang hiện tại
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Chuyển trang
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <h1 className='text-3xl uppercase text-green-800'>Quản Lý Sản Phẩm</h1>
//       <div style={styles.container}>
//         {currentProducts.map((product) => (
//           <div key={product.id} style={styles.item}>
//             <div>
//               <img
//                 src={`http://127.0.0.1:8000/images/products/${product.images[0]?.thumbnail}`}
//                 alt={product.name}
//                 style={styles.image}
//               />
//             </div>
//             <div>
//               <h3 style={styles.title}>{product.name}</h3>
//               <p style={styles.brand}>{product.brandname}</p>
//               <p style={styles.price}>{product.price}</p>
//             </div>
//             <div style={styles.buttonContainer}>
//               <button style={{ ...styles.button, ...styles.cartButton }}>
//                 <AiOutlineShoppingCart className="mr-2" /> 
//               </button>
//               <button style={{ ...styles.button, ...styles.viewButton }}>
//                 <AiOutlineEye className="mr-2" /> 
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Phân trang */}
//       <div style={styles.pagination}>
//         {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
//           <div
//             key={index + 1}
//             style={{
//               ...styles.pageItem,
//               ...(currentPage === index + 1 ? styles.activePage : {}),
//             }}
//             onClick={() => paginate(index + 1)}
//           >
//             {index + 1}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '20px',
//     padding: '20px',
//   },
//   item: {
//     flex: '1 1 calc(25% - 20px)',
//     boxSizing: 'border-box',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     padding: '10px',
//     textAlign: 'center',
//     minHeight: '450px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   image: {
//     width: '100%',
//     height: '250px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     marginBottom: '10px',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: '18px',
//     margin: '10px 0',
//   },
//   category: {
//     color: '#555',
//     fontSize: '14px',
//   },
//   brand: {
//     color: '#999',
//     fontSize: '14px',
//   },
//   price: {
//     color: 'red',
//     fontWeight: '#999',
//     fontSize: '16px',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     marginTop: '10px',
//   },
//   button: {
//     padding: '10px 20px',
//     borderRadius: '5px',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   cartButton: {
//     backgroundColor: 'blue',
//   },
//   toggleButton: {
//     backgroundColor: '#28a745',
//   },
//   editButton: {
//     backgroundColor: '#007bff',
//   },
//   viewButton: {
//     backgroundColor: '#ffc107',
//   },
//   deleteButton: {
//     backgroundColor: '#dc3545',
//   },
//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '20px',
//   },
//   pageItem: {
//     margin: '0 5px',
//     padding: '10px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     backgroundColor: '#f1f1f1',
//   },
//   activePage: {
//     backgroundColor: '#007bff',
//     color: 'white',
//   },
// };

// export default Product;
