{

    'use strict';
  
    const select = {
      templateOf: {
        bookTemplate: '#template-book',
      },
      containerOf: {
        bookList: '.books-list',
        images: '.book__image',
        filters: '.filters',
      },
    };
  
    const templates = {
      bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };
  
    class BookList{
  
      constructor(){
        const thisBookList = this;
        thisBookList.initData();
        thisBookList.getElements();
        thisBookList.render();
        thisBookList.initActions();
      }
  
      initData() {
        const thisBookList = this;
        this.data = dataSource.books;
        thisBookList.filters = [];
        thisBookList.favoriteBooks = [];
      }
  
      getElements(){
        const thisBookList = this;
        thisBookList.bookListContainer = document.querySelector(select.containerOf.bookList);
      }
  
      render(){
        const thisBookList = this;
        for(let eachBook of dataSource.books){
          const bookData= {
            id: eachBook.id,
            name: eachBook.name,
            price: eachBook.price,
            rating: eachBook.rating,
            image: eachBook.image,
          };
          const ratingBgc = thisBookList.determineRatingBgc(bookData.rating);
          bookData.ratingBgc = ratingBgc;
          const ratingWidth = bookData.rating * 10;
          bookData.ratingWidth = ratingWidth;
          // console.log(ratingWidth);
          const generatedHTML = templates.bookTemplate(bookData);
          thisBookList.element = utils.createDOMFromHTML(generatedHTML);
          const bookListContainer = document.querySelector(select.containerOf.bookList);
          bookListContainer.appendChild(thisBookList.element);
        }
      } 
      
      initActions(){
        const thisBookList = this;
        thisBookList.element = document.querySelector(select.containerOf.bookList);
        thisBookList.element.addEventListener('dblclick', function(event){
          event.preventDefault();
          const image = event.target.offsetParent;
          const idBook = image.getAttribute('data-id');
          if(thisBookList.favoriteBooks.includes(idBook)){
            image.classList.remove('favorite');
            thisBookList.favoriteBooks.pop(idBook);
          }else{
            image.classList.add('favorite');
            thisBookList.favoriteBooks.push(idBook);
          }
          console.log('favoriteBooks', thisBookList.favoriteBooks);
        });
        const filterBooksOne = document.querySelector(select.containerOf.filters);
        filterBooksOne.addEventListener('click', function(event){
          const clickedElm = event.target;
          if(clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name == 'filter'){
            if(clickedElm.checked){
              thisBookList.filters.push(clickedElm.value);
            }else{
              const valueIndexOf = thisBookList.filters.indexOf(clickedElm.value);
              thisBookList.filters.splice(valueIndexOf, 1);
            }
          }
          thisBookList.filterBooks();
        });
      }
  
      filterBooks(){
        const thisBookList = this;
        for(let book of dataSource.books){
          const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
          let shouldBeHidden = false;
          for(const filter of thisBookList.filters){
            if(!book.details[filter]){
              shouldBeHidden = true;
              break;
            }
          }
          if(shouldBeHidden === true){
            filteredBook.classList.add('hidden');
          }else{
            filteredBook.classList.remove('hidden');
          }
        }
      }
      
      determineRatingBgc(rating){
        let background = '';
        if(rating < 6){
          background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        }else if(rating > 6 && rating <= 8){
          background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        }else if(rating > 8 && rating <= 9){
          background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }else if(rating > 9){
          background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        return background;
      }
  
    }
    new BookList();
  
  }