import React from 'react';

const products = [
  { id: 1, name: 'Hamburger', price: 100000, image: 'https://th.bing.com/th?id=OIP.1uE1JS6V5CyVKLVpxF7kogHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
  { id: 2, name: 'Đùi gà gốc tư nướng giấy bạc', price: 150000, image: 'https://www.bing.com/th?id=OIP.TGobRCZCrvM2oBKzoFaRDAHaE3&w=179&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
  { id: 3, name: 'Cơm gà chiên giòn', price: 200000, image: 'https://www.bing.com/th?id=OIP.sR76VbpaQNkzhkBVj4FZHwHaJY&w=122&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', quantity: 1 },
];

const Promotions: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Khuyến Mãi Đặc Biệt</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md"/>
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600 mt-2">Mô tả sản phẩm khuyến mãi</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-red-500 font-bold">{product.price.toLocaleString('vi-VN')}₫</span>
              <span className="text-gray-400 line-through">{(product.price * 1.2).toLocaleString('vi-VN')}₫</span>
            </div>
            <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-full hover:bg-red-600 transition duration-200">Thêm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
