import React, { useEffect, useState } from 'react'
import classes from './favpage.module.css'
import Axios from 'axios';
import { IMAGE_URL } from '../../../components/Config';
import { Button, Popover } from 'antd';
export default function Favpage()
{

        const [FavMovies, setFavMovies] = useState([]);

        useEffect(() =>
        {
                
                fechFavoriteMovies();
        }, [])

        const fechFavoriteMovies = () => {
                const data = { userFrom: localStorage.getItem('userId') };

                Axios.post('api/favorite/getFav', data)
                .then((res) =>
                {

                        if (res.data.success)
                        {
                                console.log(res.data.favorites)
                                setFavMovies(res.data.favorites)

                        } else
                        {
                                alert('failed to get favorite movies please login to see')

                        }
                })

        }

        const Delete = (id) =>
        {
                const data = {
                        movieId: id,
                        userFrom: localStorage.getItem('userId')
                }
                Axios.post('/api/favorite/remove', data)
                .then(res =>
                {
                        if (res.data.success)
                        {
                                fechFavoriteMovies();
                              
                        } else
                        {
                                alert('failed to remove from favorite');
                        }
                })


        }

        const renderTableData = FavMovies.map((movies, index) =>
        {
                const content = (
                        <span>
                                {movies.movieImage ? <img src={`${IMAGE_URL}/w500${movies.movieImage}`} alt=" movie-poster" /> : 'no image'}
                        </span>
                )
                return (<tr key={index}>

                        <td> <Popover content={content} title={movies.movieTitle}>{movies.movieTitle} </Popover> </td>
                        <td>{movies.movieRunTime} min</td>
                        <td><Button onClick={() => Delete(movies.movieId)}>Delete</Button></td>

                </tr>)

        });

        return (
                <div className={classes} style={{ width: '85%' }}>
                        <h2>My Favorite Movies</h2>
                        <hr />
                        <table>
                                <thead>
                                        <tr>
                                                <th>Movie Title</th>
                                                <th>Movie RunTime</th>
                                                <th>Remove From Favorite</th>

                                        </tr>

                                </thead>
                                <tbody>
                                        {renderTableData}
                                </tbody>

                        </table>
                </div>
        )
}
