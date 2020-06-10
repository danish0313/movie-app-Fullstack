import React from 'react';
import { Col } from 'antd';
export default function Card(props)
{


        if (props.img)
        {

                return (
                        <div>
                                <Col lg={6} md={8} sm={24}>
                                        <div style={{ position: 'relative' }}>
                                                <a href={`movie/${props.id}`}><img src={props.img} alt={props.id} style={{ width: '100%', height: '320px' }} /></a>
                                        </div>

                                </Col>

                        </div>

                )
        }
        else
        {

                return (
                        <div>
                                <Col lg={6} md={8} sm={24}>
                                        <div style={{ position: 'relative' }}>
                                                <a href={`movie/${props.id}`}><img src={props.actor} alt={props.castid} style={{ width: '100%', height: '320px' }} /></a>
                                        </div>

                                </Col>

                        </div>)


        }
}


