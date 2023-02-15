import './index.css';
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
//import data from '../../assets/data.json';
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import api from "../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";

function Application() {
    const [cards, setCards] = useState( []);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const debounceSearchQuery = useDebounce(searchQuery, 300);

    useEffect( () => {
        Promise.all([api.getUserInfo(), api.getProductList()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
            })
            .catch(err => console.error(err));
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
        const isLiked = product.likes.some(id => id === currentUser.id); // Ищем в массиве лайков текущего пользователя
        api.changeLikeProduct(product._id, !isLiked).then((newCard) => { // в зависимости от того есть ли лайки или нет отправляем 'DELETE' или 'PUT'
            const newCards = cards.map((card) => {
                console.log('Карточка в переборе', card);
                console.log('Карточка с сервера', newCard);
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
                <CardList goods = {cards} onProductLike={handleProductLike} currentUser={currentUser}/>
            </main>
            <Footer />

        </>
    )
}

export default Application;