import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import {
  InputAdornment,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./ProductList.scss";
import SearchIcon from "@mui/icons-material/Search";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const BASE_URL = "https://dummyjson.com/products";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleFilter = () => {
    let tempProducts = [...products];

    if (searchTerm.trim() !== "") {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice !== "") {
      tempProducts = tempProducts.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      tempProducts = tempProducts.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (selectedCategory !== "") {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(tempProducts);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, minPrice, maxPrice, selectedCategory]);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="filters">
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          variant="outlined"
          size="small"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={3} className="grid-container">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={() => toggleSelect(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
