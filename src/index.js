import './styles/main.scss';
import cards from '../db/cards';
import Catalog from './js/catalog';


const catalogNode = document.querySelector('.catalog');
new Catalog(catalogNode, cards);
