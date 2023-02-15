import './index.css';
import Card from "../Card/Card";
//import data from '../data.json'

const CardList = ({goods, onProductLike, currentUser}) => {
    return (
        <div className='cards'>
            {goods.map(el => {
                return (
                <Card key={el._id} {...el} onProductLike={onProductLike} currentUser={currentUser} />
                )
            })}
        </div>
    );
};

export default CardList;
