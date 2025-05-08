import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './productList.module.css';
import apiClient from '../../../Utility/apiClient';

const ProductList = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      filter ? product.category.name === filter : true
    )
    .filter((product) =>
      search ? product.title.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((product) => {
      const min = parseFloat(priceRange.min) || 0;
      const max = parseFloat(priceRange.max) || Infinity;
      return product.price >= min && product.price <= max;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <Box className="product-list-container" sx={{ padding: 2 }}>
      <Box className="filter-section" sx={{ marginBottom: 2 }}>
        <h3>Filter and Sort Products</h3>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="filter-label">Category</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(products.map((product) => product.category.name))).map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search by Title"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField
            label="Min Price"
            name="min"
            type="number"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <TextField
            label="Max Price"
            name="max"
            type="number"
            value={priceRange.max}
            onChange={handlePriceChange}
          />
        </Box>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort by Price</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="product-list" sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            className="product-item"
            sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}
            onClick={() => navigate(`/${product.id}`)}
          >
            <img className={styles.productImage} src={product.images[0]} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;