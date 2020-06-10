import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import Axios from 'axios';
export default function Addfavorite(props)
{

        const [Favorite, setFavorite] = useState(0);
        const [Favorited, setFavorited] = useState(false);

        const data = {
                userFrom: props.userFrom,
                movieId: props.movieId,
                movieTitle: props.movieInfo.original_title,
                movieImage: props.movieInfo.backdrop_path,
                movieRunTime: props.movieInfo.runtime
        };


        useEffect(() =>
        {
                console.log(data)
                // favoriteNumber

                Axios.post('/api/favorite/favoriteNumber', data)
                        .then((res) =>
                        {
                                if (res.data.success)
                                {
                                        setFavorite(res.data.FavoriteNumber);
                                }
                                else
                                {
                                      //  alert('falied to get favorite number please login ')

                                }

                        })


                // already  added to favorite or not
                Axios.post('/api/favorite/favorited', data)
                        .then((res) =>
                        {
                                if (res.data.success)
                                {
                                        setFavorited(res.data.Favorited);
                                }
                                else
                                {
                                     //   alert('falied to get favorite info please login')

                                }

                        })
        }, [])

        const AddToFavorite = () =>
        {
                if (Favorited)
                {

                        Axios.post('/api/favorite/remove', data)
                        .then(res =>
                        {
                                if (res.data.success)
                                {
                                        setFavorite(Favorite - 1);
                                        setFavorited(!Favorited);

                                } else
                                {
                                    //   alert('failed to remove from favorite please login');
                                }
                        })

                }
                else
                {
                        Axios.post('/api/favorite/addToFav', data)
                                .then(res =>
                                {
                                        if (res.data.success)
                                        {
                                                setFavorite(Favorite +1);
                                                setFavorited(!Favorited);

                                        } else
                                        {
                                                alert('failed to add to favorite please login first');
                                        }
                                })
                }

        }
        return (

                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
                        <Button onClick={AddToFavorite}>{Favorited ? 'remove from favorite' : 'Add to Favorite '}
                        &nbsp;{Favorite} </Button>
                </div>
        )
}