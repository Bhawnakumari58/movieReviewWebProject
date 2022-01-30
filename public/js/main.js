const API_KEY = 'api_key=ef4bfcb3b8d243129fa736e2b55bf4ba';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL+'/search/movie?'+API_KEY;

const genres=[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const tagsEl=document.getElementById('tags');

var selectGenre=[]
setGenre();
function setGenre(){
    tagsEl.innerHTML="";
    genres.forEach(genre=>{
        const t=document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText=genre.name;
        t.addEventListener('click',()=>{
               if(selectGenre.length==0)
               {
                   selectGenre.push(genre.id);              }
                else{
                    if(selectGenre.includes(genre.id)){
                        selectGenre.forEach((id,idx)=>{
                           if(id==genre.id){
                               selectGenre.splice(idx,1);
                           }
                        })
                    }
                    else{
                        selectGenre.push(genre.id); 
                    }
                }
                console.log(selectGenre);
                getMovies(API_URL+'&with_genres='+encodeURI(selectGenre.join(',')));
                hilightSelection()
        })
        tagsEl.append(t);
    })
}

function hilightSelection(){
    const tags=document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('hilight');
    })
    clrBtn();
    if(selectGenre.length!=0){
    selectGenre.forEach(id=>{
        const hilightedtag=document.getElementById(id);
        hilightedtag.classList.add('hilight');
    })
    }
}

function clrBtn(){
let clrBtn=document.getElementById('clear');
if(clrBtn){
     clrBtn.classList.add('hilight');
}
else
{
    let clear=document.createElement('div');
    clear.classList.add('tag','hilight');
    clear.id='clear';
    clear.innerText='Clear x';
    clear.addEventListener('click',()=>{
        selectGenre=[];
        setGenre();
        getMovies(API_URL);
    })
    tagsEl.append(clear);
}
    
}

getMovies(API_URL);

function  getMovies(url){

     fetch(url).then(res => res.json()).then(data => {
        if(data.results.length!=0){ 
        showMovies(data.results);
        }
        else{
            main.innerHTML=`<h1 class="no-result">NO RESULTS FOUND</h1>`
        }
     })

}

function showMovies(data)
{
    main.innerHTML='';
    data.forEach(movie =>{
        const {title,poster_path,vote_average,overview}=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${poster_path?IMG_URL+poster_path:"http://via.placeholder.com/1000*1500"}" alt="${title}">
        

        <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    

        <div class="overview">
            <h3>Overview</h3>
            ${overview};
        </div>
        `
        main.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote>=8)
      return 'green';
    else if(vote>=5)
       return 'orange';
    else  
       return 'red';
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm=search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }
    else{
        getMovies(API_URL);
    }
})