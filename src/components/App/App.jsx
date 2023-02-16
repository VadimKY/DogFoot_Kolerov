//import s from './App.module.css';
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import {isLiked} from "../utils/products";
import Spinner from "../Spinner/Spinner";



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
        api.search(debounceSearchQuery).then(data => {
            setCards(data);
        })
            .catch(err => console.error(err));
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
        <>
            <Header user={currentUser} updateUserHandle={handleUpdateUser}>
                <Logo className='logo logo_place_header' href='/'/>
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>
            <main className='content container'>
                {/*<Button type='primary'>Купить</Button>
                <Button type='secondary'>Оплатить</Button>*/}
                <SearchInfo searchCount={cards.length} searchText={searchQuery} />
                {isLoading ? (
                    <Spinner /> ) : (
                    <CardList goods = {cards} onProductLike={handleProductLike} currentUser={currentUser} />
                        )}

            </main>
            <Footer />

        </>
    )
}

export default Application;