const movies = [
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    duration: '2h 22min',
    genre: ['Crime', 'Drama'],
    score: 9.3
  },
  {
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    duration: '2h 55min',
    genre: ['Crime', 'Drama'],
    score: 9.2
  }
]


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  return movies.map( movie => movie.director)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies, director = 'Steven Spielberg') {
  return movies.reduce( (sum, movie) => sum + (movie.director == director && movie.genre.includes("Drama") ) , 0)

  // const res = []
  // movies.forEach( movie => {
  //   if( movie.director === 'Steven Spielberg'){
  //     res.push( movie )
  //   }
  // })
  // return res.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if( movies.length === 0 ){
    return 0
  }
  const suma = movies.reduce( ( sum, movie ) => sum + movie.score , 0)
  const average = Number.parseFloat( suma ) / movies.length 
  console.log("object")
  return Number.parseFloat( average.toFixed(2) )
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies, genre = 'Drama') {
  if( movies.length === 0 ){
    return 0
  }
  let dramaMovies = movies.filter( movie => movie.genre.includes(genre))
  let average =  scoresAverage( dramaMovies )
  return Number.parseFloat( average.toFixed(2) )
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  if( movies.length === 0 ){
    return []
  }

  const ordered = [...movies.sort( (a,b) => {
    if(a.year - b.year){ return (a.year - b.year) }
    return a.title.localeCompare(b.title)
  } )]

  return ordered  
}

// function orderByYear(moviesArr) { 
//   if( movies.length === 0 ){
//     return null
//   }
//   const moviesChronologicalyOrdered = [... moviesArr.sort( (movie1, movie2) => {
//     if( movie1.year - movie2.year){
//       return movie1.year - movie2.year
//     }
//     return movie1.title.localeCompare( movie2.title)
//   }) ]
//   return moviesChronologicalyOrdered
// }


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesArray) {
  if( moviesArray.length === 0 ){
    return []
  }

  const movies = [...moviesArray]
  const ordered = [...movies.sort( (a,b) => a.title.localeCompare(b.title) )]

  const listLength = Math.min(20, ordered.length)
  const firstOnes = []
  for(let i = 0; i<listLength; i++){
    firstOnes.push( ordered[i].title )
  }

  return firstOnes
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // const temp = [...moviesArray]

  const temp = []
  for( let i = 0; i < moviesArray.length; i++){
    temp.push( moviesArray[i] )
  }

  temp.forEach( movie => movie.duration = transformDuration(movie.duration))

  return temp

}

function transformDuration( dur ){
  const helperArr = dur.split('h ')
  const hours = helperArr[0]

  if( helperArr.length === 1){ return 60 * Number.parseInt(hours)}

  const minutes = helperArr[1].split('min')[0]

  return ( Number.parseInt(hours) * 60 + Number.parseInt(minutes) )
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if( movies.length === 0 ){
    return null
  }

  const helper = {}

  movies.forEach( movie => {
    if ( !helper[ movie.year ] ){
      helper[movie.year] = [movie.score]
    }else{
      helper[movie.year].push( movie.score )
    }
  })

  const res = []
  for( key in helper ){
    res.push([key, arrAvg(helper[key])])
  }

  res.sort( (a,b) => b[1] - a[1])

  return (`The best year was ${res[0][0]} with an average score of ${res[0][1]}`) 

}


function arrAvg( arr ){
  return arr.reduce( (sum, el ) => sum+el, 0) / arr.length
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
