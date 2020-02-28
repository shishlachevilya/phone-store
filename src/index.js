import './js/libs/swiper.min';
import './styles/main.scss';
import { onceData } from '../phone-service/phone-service';
import Catalog from './js/catalog';


const catalogNode = document.querySelector('.catalog');


onceData
  .then(body => {
    new Catalog(catalogNode, body);
  })
  .catch((error) => {console.log(error)});

