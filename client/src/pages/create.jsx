import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//das5
const CreateMovies = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState(false);
  const [rating, setRating] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
//das5
  const handleSaveMovie = () => {
    const data = {
      name,
      img,
      year,
      genre,
      rating
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/Movies', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Movie Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Movie</h1>
      {loading ? <Spinner /> : ''}
      {//das5}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Img</label>
          <input
            type='text'
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={year}
            onChange={(e) => setyear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
                 <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                 <input
                   type='number'
                   value={genre}
                   onChange={(e) => setgenre(e.target.value)}
                   className='border-2 border-gray-500 px-4 py-2  w-full '
                 />
               </div>
        <div className='my-4'>
                 <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                 <input
                   type='number'
                   value={rating}
                   onChange={(e) => setrating(e.target.value)}
                   className='border-2 border-gray-500 px-4 py-2  w-full '
                 />
               </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveMovie}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateMovies