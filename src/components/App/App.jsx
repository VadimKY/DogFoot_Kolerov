//import s from './App.module.css';
import Header from "../Header/Header";
//import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import {isLiked} from "../../utils/products";
//import Spinner from "../Spinner/Spinner";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import {Route, Routes} from "react-router-dom";
import ProductPage from "../../pages/ProductPage/ProductPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import {UserContext} from "../../context/userContext";
import {CardContext} from "../../context/cardContext";

function Application() {
    const [cards, setCards] = useState( []);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const debounceSearchQuery = useDebounce(searchQuery, 300);

    useEffect( () => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductList()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

  //      api.getUserInfo().then((userData) => { // один извариантов передачи данных (не желателен)
   //         setCurrentUser(userData);
   //     })
  //      api.getProductList().then((cardData) => {
   //         setCards(cardData.products);
  //      })
 //   }, []);

    useEffect(() => {
        handleRequest();
        console.log('INPUT', debounceSearchQuery)
    }, [debounceSearchQuery]);


    const handleRequest = () => { //запрос к серверу при поиске
        //const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        setIsLoading(true);
        api.search(debounceSearchQuery).then(data => {
            setCards(data);
        })
            .catch(err => console.error(err))
            .finally(() => {
            setIsLoading(false);
        })
    };

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }

    const handleInputChange =(inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate).then((newUserData) => {
            setCurrentUser(newUserData);
        } )
    }

    const handleProductLike = (product) => {
      //  const isLiked = product.likes.some(id => id === currentUser._id); // Ищем в массиве лайков текущего пользователя
        const liked = isLiked(product.likes, currentUser._id);
        api.changeLikeProduct(product._id, liked).then((newCard) => { // в зависимости от того есть ли лайки или нет отправляем 'DELETE' или 'PUT'
            const newCards = cards.map((card) => {
               // console.log('Карточка в переборе', card);
               // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
            })
            setCards(newCards);
        })
    }

    return (
        <UserContext.Provider value={{user: currentUser, isLoading}}> {/* Внедряем данные из стейта currentUser  с помощью провайдера контекста*/}
            <CardContext.Provider value={{cards, handleLike: handleProductLike}}>
                <Header user={currentUser} updateUserHandle={handleUpdateUser}> {/*Всем дочерним элементам доступен контекст*/}
                    <Logo className='logo logo_place_header' href='/' />
                    <Routes>
                        <Route path="/" element={
                            <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
                        } />
                    </Routes>

                </Header>
                <main className='content container'>
                    <SearchInfo searchCount={cards.length} searchText={searchQuery} />
                    <Routes>
                        <Route index element={<CatalogPage />} />
                        <Route path="/product/:productId" element={<ProductPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </CardContext.Provider>
        </UserContext.Provider>
    )
}

export default Application;