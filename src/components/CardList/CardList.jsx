import './index.css';
import Card from "../Card/Card";
//import data from '../data.json'

const CardList = ({goods}) => {
    return (
        <div className='cards'>
            {goods.map((el, index) => {
                return (
                <Card key={index} {...el} />
                )
            })}
        </div>
    );
};

export default CardList;
