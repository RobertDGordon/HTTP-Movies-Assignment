import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
  const [newMovie, setNewMovie] = useState(initialMovie)

  const id = props.match.params.id

//   console.log('update loaded')

  useEffect(() => {
      console.log(Object.keys(props.movies).length, 'movies array length', 'update loaded')
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
    axios
    .put(`http://localhost:5000/api/movies/${id}`, newMovie)
    .then(res => {
        console.log(res.data,'api update')
        props.updateMovie(res.data);
        props.history.push(`/movies/${id}`)
    })
    .catch(err=> console.log(err))
  }

  const deleteMovie = e =>{
      e.preventDefault()
      axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
          console.log(res.data,'api update')
          props.updateMovie(res.data);
          props.history.push(`/`)
      })
      .catch(err=> console.log(err))
  }

  return (
    <>
    <div className='update-card'>
        <h2>Edit Movie:</h2>
        <form>
            Title:
            <input name='title' onChange={changeHandler} value={newMovie.title}/>
            Director:
            <input name='director' onChange={changeHandler} value={newMovie.director}/>
            Metascore:
            <input name='metascore' type='number' onChange={changeHandler} value={newMovie.metascore}/>
            {newMovie.stars.map((star, index) => (
                <div key={star}>Actor:
                <input key={index} name={index} type='text' onChange={starsChangeHandler} value={newMovie.stars[index]}/>
                </div>
            ))}
        </form>
        <div className="update-button" onClick={handleSubmit}>
            Update
        </div>
        <div className="delete-button" onClick={deleteMovie}>
            Delete
        </div>
    </div>
    </>
  );
};

export default UpdateMovie;
