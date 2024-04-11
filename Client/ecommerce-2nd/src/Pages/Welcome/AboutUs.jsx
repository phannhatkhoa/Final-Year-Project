import React from 'react';
import { Link } from 'react-router-dom';
import { RiFacebookCircleFill, RiInstagramLine } from 'react-icons/ri';
const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">About Us</h1>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <p className="text-lg mb-6 text-center text-gray-700">Welcome to our website! We are your go-to destination for buying and selling second-hand technology products.</p>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
                        <p className="text-lg mb-4 text-gray-700">
                            At Ecommerce, our mission is to provide a platform where individuals can easily trade their used technology products.
                            We aim to promote sustainability by extending the lifecycle of electronics and reducing electronic waste.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700">
                            <li className="mb-2">Wide Selection: Explore a diverse range of second-hand technology products, including smartphones, laptops, tablets, and more.</li>
                            <li className="mb-2">Quality Assurance: We ensure that all products listed on our platform meet our quality standards, providing you with reliable options.</li>
                            <li className="mb-2">Affordable Prices: Find great deals on pre-owned technology products, saving both money and the environment.</li>
                            <li className="mb-2">User-Friendly Experience: Our website offers a seamless browsing and purchasing experience, making it easy for you to find what you need.</li>
                            <li className="mb-2">Community Engagement: Join a community of tech enthusiasts and eco-conscious individuals who share a passion for sustainable living.</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
                        <p className="text-lg mb-4 text-gray-700">
                            Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:info@example.com" className="text-blue-500 hover:underline">khoapngcd201807@fpt.edu.vn</a> or follow us on social media.
                        </p>
                        <div className="flex justify-center">
                            <Link to="https://www.instagram.com/p.n.k.25/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md mr-4">
                                <RiInstagramLine className="inline-block mr-2" /> Follow us on Instagram
                            </Link>
                            <Link to="https://www.facebook.com/nhatkhoa.phan.9" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md">
                                <RiFacebookCircleFill className="inline-block mr-2" />Like us on Facebook
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
