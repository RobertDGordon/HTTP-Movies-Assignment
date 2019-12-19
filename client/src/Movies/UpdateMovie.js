import React, {useState, useEffect} from 'react';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
  const [newMovie, setNewMovie] = useState(initialMovie)

  const id = props.match.params.id

  useEffect(() => {
      console.log(Object.keys(props.movies).length, 'movies array length')
      if (Object.keys(props.movies).length > 0){
        const movieToEdit = props.movies.find(
            e => `${e.id}` === id
        );
        setNewMovie(movieToEdit)
      }
  }, [props.movies, id])

  const changeHandler = e => {
      e.preventDefault();
      setNewMovie({...newMovie,[e.target.name]: e.target.value})
      console.log(e.target.name)
  }

  const starsChangeHandler = (e) =>{
      const newStars = newMovie.stars.map((star, index) =>{
          if (index === Number(e.target.name)){
              console.log('found match', star)
              return e.target.value
          }else{
              return star
          }
      })
    //   setNewMovie({...newMovie, stars:[...newMovie.stars, newMovie.stars[e.target.name]: e.target.value ] })
      console.log(newStars)
      setNewMovie({...newMovie, stars: newStars})
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(id)

  }

  return (
    <>
    <div className='movie-card'>
        <h2>Edit Movie:</h2>
        <form onSubmit={handleSubmit}>
            <input name='title' onChange={changeHandler} value={newMovie.title}/>
            <input name='director' onChange={changeHandler} value={newMovie.director}/>
            <input name='metascore' type='number' onChange={changeHandler} value={newMovie.metascore}/>
            {newMovie.stars.map((star, index) => (
                <input key={index} name={index} type='text' onChange={starsChangeHandler} value={newMovie.stars[index]}/>
            ))}
            <button type='submit'>Update!</button>
        </form>
    </div>
    </>
  );
};

export default UpdateMovie;
