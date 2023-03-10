import React, {useCallback, useContext, useEffect, useState} from 'react';
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";
import Header from "../../components/Header/Header";
import api from "../../utils/api";
import {isLiked} from "../../utils/products";
import Spinner from "../../components/Spiner/Spiner";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";
import s from '../../components/Product/Product.module.css'
import {useParams} from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import {UserContext} from "../../context/userContext";
import useApi from "../../hooks/useApi";
import {CardContext} from "../../context/cardContext";

const ProductPage = () => {
   // const [product, setProduct] = useState([]);
    const { productId } = useParams();

    const { handleLike } = useContext(CardContext);

    const handleGetProduct = useCallback(() => api.getProductById(productId),[productId]);
    const { data: product, setData: setProduct, isLoading, error: isError } = useApi(handleGetProduct);
   /* useEffect(() => {
        setIsLoading(true);
        api.getProductById(productId)
            .then(( productData) => {
                setProduct(productData);
            })
            .catch(err => {
                console.error(err)
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);*/

    /*const handleRequest = () => {
        api.search(searchQuery).then(data => {
            setProduct(data);
        }).catch(err => console.error(err));
    }*/



    const handleProductLike = useCallback(() => {
        handleLike(product).then((updateProduct) => {
            setProduct(updateProduct)
        })
        },[product, setProduct, handleLike])
        // const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков id текущего пользователя.
        // api.changeLikeProduct(product._id, liked).then((updateCard) => { // в зависимости от того есть ли лайки или нет отправляем запрос "DELETE" или "PUT"
        //     setProduct(updateCard);
        // })


  return (
      <>
          {isLoading ? (
                  <div className={s.wrapperLoader}>
                      <Spinner />
                  </div>
              ) : (
              !isError && <Product {...product} onProductLike={handleProductLike} />)}
          {isError ? (
              <NotFoundPage />
          ): null}
      </>
  );
};

export default ProductPage;
