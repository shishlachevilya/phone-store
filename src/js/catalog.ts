interface Card {
  id: string
  title: string
  src: string
  price: string
  old: string
}

class Catalog {
  searchValue: string;
  activePage: number;
  field: HTMLInputElement | null;
  cardsWrap: HTMLElement | null;
  paginationWrap: HTMLElement | null;
  clearBtn: HTMLElement | null;

  constructor(private node: HTMLElement, private data: Array<Card>) {
    this.cardsWrap = this.node.querySelector('.catalog__wrap');
    this.paginationWrap = this.node.querySelector('.pagination-list');
    this.field = this.node.querySelector('.search-field input');
    this.clearBtn = this.node.querySelector('.clear__btn');

    this.searchValue = '';
    this.activePage = 0;

    this.renderPageList(this.data);
    this.init();
  }

  init() {
    this.node.addEventListener('click', (e: Event) => this.clickHandler(e));
    this.field && this.field.addEventListener('keyup', (e: Event) => this.getFilteredCards(e));
  }

  renderPageList(array: Array<Card>) {
    const activeCards = array.filter((card: Card, index: number) => index >= this.activePage * 5 && index < this.activePage * 5 + 5);

    this.renderCards(activeCards);
    this.renderPagination(array);
  }

  renderCards(array: Array<Card>) {
    let template = '';

    array.map((card: Card) => {
      template += `
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div class="card" id="${ card.id }">
          <div class="hover-block">
            <button class="hover-block__btn" data-card="delete">remove from list</button>
          </div>

          <a href="#" class="card__images">
            <img src="${ card.src }" alt="${ card.title }">
          </a>

          <div class="card__title">
            <a href="#">${ card.title }</a>
          </div>

          <div class="card__price">
            <span>${ card.price }</span>
            <span class="old">${ card.old }</span>
          </div>

          <div class="card__btns">
            <button class="card__btn" data-card="delete">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>

            <button class="card__btn add-basket">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      `
    });

    this.cardsWrap && (this.cardsWrap.innerHTML = template);
  }

  renderPagination(array: Array<Card>) {
    let template = '';

    for (let i = 0; i < array.length / 6; i++) {
      template += `
        <li>
          <span class="pagination-list__link ${i === this.activePage ? 'current' : ''}" data-card="change" data-page="${ i }">${ i + 1 }</span>
        </li>`
    }

    if (this.paginationWrap){
      this.paginationWrap.innerHTML = template;
    }
  }

  getFilteredCards(e: any) {
    this.searchValue = e.target.value;

    if (!this.clearBtn) return;

    if(this.searchValue.length > 0) {
      this.clearBtn.removeAttribute('disabled');
    } else {
      this.clearBtn.setAttribute('disabled', 'disabled');
    }

    this.activePage = 0;

    const filteredData = this.getFilteredData();

    if(filteredData.length === 0 && this.searchValue !== '') {
      this.renderPageMessage('no result');
      this.renderPagination([]);
    } else {
      this.renderPageList(filteredData);
    }
  }

  renderPageMessage(mes: string) {
    if (!this.cardsWrap) return;

    this.cardsWrap.innerHTML = `<p>${mes}</p>`;
  }

  getFilteredData() {
    return this.data.filter((card: Card) => card.title.toLocaleLowerCase().includes(this.searchValue));
  }

  deleteCard(id: string) {
    this.data = this.data.filter((card: Card) => card.id !== id);
    this.renderPageList(this.getFilteredData());
  }

  clickHandler(e: any) {
    const request = e.target.getAttribute('data-card') || e.target.parentElement.getAttribute('data-card');

    switch (request) {
      case 'delete':
        this.deleteCard(e.target.closest('.card').id);
        break;

      case 'add':
        console.log('add');
        break;

      case 'clear':
        this.field && (this.field.value = '');
        this.searchValue = '';
        this.activePage = 1;
        this.renderPageList(this.getFilteredData());
        this.clearBtn && this.clearBtn.setAttribute('disabled', 'disabled');
        break;

      case 'change':
        this.activePage = parseFloat(e.target.getAttribute('data-page'));

        this.renderPageList(this.getFilteredData());
        break;

      default:
        console.log('default');
    }
  }
}

export default Catalog;
