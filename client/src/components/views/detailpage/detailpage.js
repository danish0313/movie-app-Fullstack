import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import Image from '../LandingPage/sections/image/image';
import { Descriptions, Button, Row } from 'antd';
import Card from '../LandingPage/sections/card';
import Addfavorite from './sections/addfavorite';
export default function MovieDetailPage(props)
{

        const [Details, setDetails] = useState([]);
        const [Cast, setCast] = useState([]);
        const [show, setshow] = useState(false);
        const movieId = props.match.params.movieId;
        // calling the movie API
        useEffect(() =>
        {
               
                const URL = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
                // cast and crew details
                const CAST = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

                fetch(URL)
                        .then((res) => res.json())
                        .then(res =>
                        {
                                setDetails(res);
                                console.log(res)
                                fetch(CAST)
                                        .then(res => res.json())
                                        .then(res =>
                                        {

                                                setCast(res.cast);
                                                console.log(res.cast)
                                        })
                        })
        }, [])

        const LoadMore = () =>
        {

                setshow(!show)

        }

        return (
                <div>
                        {/* details page image */}
                        {Details &&
                                <Image details={`${IMAGE_URL}/w1280${Details.poster_path}`} 
                                title={Details.original_title}
                                text={Details.overview} />
                        }
                        {/* add to favorite */}

                        <Addfavorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Details}/>

                        
                        <div style={{ margin: '40px' }}>
                                <Descriptions title="Movie Info" bordered>
                                        <Descriptions.Item label="title">{Details.original_title}</Descriptions.Item>
                                        <Descriptions.Item label="release_date">{Details.release_date}</Descriptions.Item>
                                        <Descriptions.Item label="revenue">{Details.revenue}</Descriptions.Item>
                                        <Descriptions.Item label="runtime">{Details.runtime}</Descriptions.Item>
                                        <Descriptions.Item label="vote_average" span={2}>
                                                {Details.vote_average}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="vote_count">{Details.vote_count}</Descriptions.Item>
                                        <Descriptions.Item label="status">{Details.status}</Descriptions.Item>
                                        <Descriptions.Item label="popularity">{Details.popularity}</Descriptions.Item>
                                </Descriptions>

                                {/* load the actor/ cast details */}

                                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                                        <Button onClick={LoadMore}> Load More</Button>
                                </div>

                                <hr />
                                {show && <>

                                        {/* cards for deatils */}

                                        <Row gutter={[16, 16]}>
                                                {Cast && Cast.map((cast, index) => (<div key={index}>

                                                        {cast.profile_path && <Card actor={cast.profile_path && `${IMAGE_URL}/w500${cast.profile_path}`} castid={cast.cast_id} />}

                                                </div>))}
                                        </Row>
                                        <br />
                                </>}
                        </div>
                </div>
        )
}
