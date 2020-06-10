import React from 'react'
import Classes from './image.module.css';
import { Typography, Row } from 'antd';
const { Title } = Typography;
export default function Image(props)
{

        if (props.img)
        {

                return (<div>
                        {/* title  */}
                        <div className={Classes.hero} style={{
                                background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0)41%, rgba(0,0,0,0.65) 100%),url(${props.img}), #1c1c1c`,
                                height: '500px', width: '95%', margin: '0 auto', position: 'relative',
                        }}>
                                <div className={Classes.box}>
                                        <Title style={{ color: 'white', margin: '10px' }} level={2}>{props.title}</Title>
                                        <p syle={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>

                                </div>
                        </div>
                </div>)
        }
        else
        {
                return (<div>
                        {/* title  */}
                        <div className={Classes.hero} style={{
                                background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0)41%, rgba(0,0,0,0.65) 100%),url(${props.details}), #1c1c1c`,
                                height: '450px', width: '98%', margin: '0 auto', position: 'relative'
                        }}>
                                <div className={Classes.box}>
                                        <Title style={{ color: 'white', margin: '10px' }} level={2}>{props.title}</Title>
                                        <p syle={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>

                                </div>
                        </div>
                </div>)

        }
}
