import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../../utils/ApiUrls';
import Carousel from './Carousel';
import './marketplace.css';

const Marketplace = () => {
    const [products, setProducts] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [searchText, setSearchText] = useState('');

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (text) => {
        setSelectedOption(text);
        setIsDropdownOpen(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = async () => {
        // Perform your search logic here based on the 'searchText'
        console.log('Searching for:', searchText);
        setSearchText(searchText);
        try {
            const response = await axios.get(url + '/products/search/' + `${searchText}` + '?category=' + selectedOption);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    const handleReset = async () => {
        setSearchText("");
        setProducts(await getProducts());
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(url + '/products/all');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(url + '/products/categories');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    const getFeaturedProducts = async () => {
        try {
            const response = await axios.get(url + '/products/featured/5');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    useEffect(() => {
        const productList = async () => {
            const productList = await getProducts();
            if (productList) {
                setProducts(productList);
            }
        };
        productList();
        const featuredProductList = async () => {
            const featuredProductList = await getFeaturedProducts();
            if (featuredProductList) {
                setFeaturedProducts(featuredProductList);
            }
        };
        featuredProductList();
        const categories = async () => {
            const categories = await getCategories();
            if (categories) {
                setCategories(categories);
            }
        };
        categories();
    }, []);

    return (
        <div className='view-container container-fluid'>
            <div className="wrapper my-4">
                <div className="search_box">
                    <div className={`dropdown`}>
                        <div className="default_option" onClick={handleDropdownClick}>
                            {selectedOption}
                        </div>
                        <ul className={`${isDropdownOpen ? 'active' : ''}`}>
                            {categories.map((category, index) => (
                                <li key={index} onClick={() => handleOptionClick(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="search_field">
                        <input type="text" className="input w-75" placeholder="Search" value={searchText}
                            onChange={handleSearchInputChange} />
                        <i className="fas fa-search mx-5" onClick={handleSearch}></i>
                        <i className="fas fa-refresh" onClick={handleReset}></i>
                    </div>
                </div>
            </div>
            <Carousel autoPlay={true} useRightLeftTriangles={true} slides={featuredProducts} />
            {/* <div className='row p-3'>
                {data.map((item, index) => (
                    <div key={index} className='col-3'>
                        <Card
                            img={item.img}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                        />
                    </div>
                ))}
            </div> */}
            {categories.map((category, index) => (
                <div key={index} className='py-4 w-100'>
                    {products[category] && Array.isArray(products[category]) && products[category].length > 0 && (
                        <>
                            <h3 className='mx-3'>{category === "All" ? "Others" : category}</h3>
                            <div className="row">
                                {products[category].map((item, itemIndex) => (
                                    <div key={itemIndex} className="col-3 p-4">
                                        <Card
                                            title={item.name}
                                            description={item.description}
                                            price={item.price}
                                            category={item.category}
                                            rating={item.rating}
                                            img={"https://images.unsplash.com/photo-1612077330269-788066d5ba58?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}


        </div >
    );
}

function Card(props) {
    return (
        <div className="card">
            <img src={props.img} className="card__img" />
            <div className="card__body">
                <h2 className="card__title">{props.title}</h2>
                <p className="card__description card__description--clamp-2">{props.description}</p>
                <h3 className="card__price">{props.price}</h3>
                <button className="card__btn">Add to Cart</button>
            </div>
        </div>
    );
}

export default Marketplace;
