import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 

interface Banner {
    id: number;
    name: string;
    image: string;
    position: string;
    description: string;
    status: number;
}

const BannerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [banner, setBanner] = useState<Banner | null>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id}`); 
                setBanner(response.data.banner); 
            } catch (error) {
                console.error('Error fetching banner:', error);
                alert('Không thể lấy dữ liệu banner.');
            }
        };

        fetchBanner();
    }, [id]);

    if (!banner) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-green-800">{banner.name}</h1>
            <img 
                src={`http://localhost:8000/images/banners/${banner.image}`} 
                alt={banner.name} 
                className="w-full h-64 object-cover rounded-lg my-4" 
            />
            <div className="mt-5">
                <p className="text-lg"><strong>Vị trí:</strong> {banner.position}</p>
                <p className="text-lg"><strong>Mô tả:</strong> {banner.description}</p>
                <p className="text-lg"><strong>Trạng thái:</strong> {banner.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
                <p className="text-lg"><strong>ID:</strong> {banner.id}</p>
            </div>
            <div className="text-center mt-6">
                <Link to="/home" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
                    Quay lại
                </Link>
            </div>
        </div>
    );
};

export default BannerDetail;
