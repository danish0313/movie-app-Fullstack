import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import Classes from './LandingPage.module.css'
import { Typography, Row , Button } from 'antd';
import Image from './sections/image/image';
import Card from './sections/card';
const { Title } = Typography;
function LandingPage()
{

    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState([]);



    // calling the movie API
    useEffect(() =>
    {

      const URL= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
          fetchMovies(URL);
    }, [])


    const fetchMovies = (URL) => {
        fetch(URL)
        .then((res) => res.json())
        .then(res =>
        {
            setMovies([...Movies , ...res.results ]);
            setCurrentPage(res.page);
            console.log(res.results)
        })
    }

    const LoadMore = () => {

        const URL= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;

             // Api call
           fetchMovies(URL);
    }

    return (
        <>
            {/* hero image */}
            {Movies[0] &&
                <Image img={`${IMAGE_URL}/w1280${Movies[0].backdrop_path}`} title={Movies[0].original_title}
                    text={Movies[0].overview} />
            }


            {/* body */}

            <div className={Classes.latest}>
                <Title level={2}>Movies By Latest</Title>
                <hr />

                {/* cards for movies */}
                
                <Row gutter={[16, 16]}>
                    {Movies.map((movie, index) => (<div key={index}>
                        <Card img={movie.poster_path && `${IMAGE_URL}/w500${movie.poster_path}`} id={movie.id} />

                    </div>))}
                </Row>
                <br/>

                {/* laod more btn */}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick = {LoadMore}> Load More</Button>
                </div>

            </div>


        </>
    )
}

export default LandingPage
