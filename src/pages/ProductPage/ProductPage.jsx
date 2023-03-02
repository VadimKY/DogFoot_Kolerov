import React, {useContext} from 'react';
//import Logo from "../../components/Logo/Logo";
//import Search from "../../components/Search/Search";
//import Header from "../../components/Header/Header";
import {useState, useEffect } from 'react';
import api from "../../utils/api";
import {isLiked} from "../../utils/products";
import Spinner from "../../components/Spinner/Spinner";
//import CardList from "../../components/CardList/CardList";
//import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";
import s from "../ProductPage/ProductPage.module.css";
import {useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {UserContext} from "../../context/userContext";



const ProductPage = () => {
    const [product, setProduct] = useState( []);
    const [searchQuery, setSearchQuery] = useState('');
   // const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { productId } = useParams();
    const { user: currentUser } = useContext(UserContext);

    useEffect( () => {
        setIsLoading(true);
        api.getProductById(productId)
            .then((productData) => {
              //  setCurrentUser(userData);
                setProduct(productData);
            })
            .catch(err => {
                console.error(err)
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const handleRequest = () => { //запрос к серверу при поиске
        //const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        api.search(searchQuery).then(data => {
            setProduct(data);
        }).catch(err => console.error(err));
    };

    const handleProductLike = () => {
        //  const isLiked = product.likes.some(id => id === currentUser._id); // Ищем в массиве лайков текущего пользователя
        const liked = isLiked(product.likes, currentUser._id);
        api.changeLikeProduct(product._id, liked).then((updateCard) => { // в зависимости от того есть ли лайки или нет отправляем 'DELETE' или 'PUT'
            setProduct(updateCard);
        })
    }
    console.log()

    return (
        <>
                {isLoading ? (
                    <div className={s.contentSpinner}>
                        <Spinner />
                    </div>
                     ) : (
                    !isError && <Product {...product} currenUser={currentUser} onProductLike={handleProductLike} />)}
                {isError ? (
                    <NotFoundPage /> //если ошибка false  то отобразить Product // если ошибка true загрузить NotFoundPage
                    ): null}
        </>
    );
};

export default ProductPage;
