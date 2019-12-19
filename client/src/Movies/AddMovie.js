import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ['','','']
}

const UpdateMovie = props => {
  const [newMovie, setNewMovie] = useState(initialMovie)

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
    axios
    .post(`http://localhost:5000/api/movies/`, newMovie)
    .then(res => {
        console.log(res.data,'api update')
        props.updateMovie(res.data);
        props.history.push(`/`)
    })
    .catch(err=> console.log(err))
  }

  const cancelAdd = e =>{
    e.preventDefault()
    props.history.push(`/`)
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
                <div key={index}>
                Actor:
                <input name={index} type='text' onChange={starsChangeHandler} value={newMovie.stars[index]}/>
                </div>
            ))}
        </form>
        <div className="update-button" onClick={handleSubmit}>
            Add
        </div>
        <div className="delete-button" onClick={cancelAdd}>
            Cancel
        </div>
    </div>
    </>
  );
};

export default UpdateMovie;
