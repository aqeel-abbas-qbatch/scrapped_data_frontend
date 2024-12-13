// src/ProductTable.js
import React, { useState } from 'react';
import './ProductTable.css'; // Import the CSS file

// Import all JSON files dynamically
const jsonFiles = [
    'headphones.json',
    'smartphones.json',
    'laptops.json',
    'tablets.json',
    'smartwatches.json',
    'cameras.json',
    'televisions.json',
    'gaming consoles.json',
    'kitchen appliances.json',
    'vacuum cleaners.json',
];

// Create a context to require all JSON files
const jsonData = require.context('./data', false, /\.json$/);
const jsonImports = jsonFiles.reduce((acc, file) => {
    acc[file] = jsonData(`./${file}`);
    return acc;
}, {});

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    const handleFileChange = (event) => {
        const fileName = event.target.value;
        setSelectedFile(fileName);

        // Set the products state with the imported JSON data
        setProducts(jsonImports[fileName]);
    };

    return (
        <div className="table-container">
            <h1>Select Scraped Data</h1>
            <select onChange={handleFileChange} value={selectedFile}>
                <option value="">Select a JSON file</option>
                {jsonFiles.map((file, index) => (
                    <option key={index} value={file}>{file}</option>
                ))}
            </select>
            {products.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Reviews</th>
                            <th>Image</th>
                            <th>Scrape Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.reviews}</td>
                                <td><img src={product.image} alt={product.title} /></td>
                                <td>{product.scrape_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductTable;