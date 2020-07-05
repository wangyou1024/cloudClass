import React from 'react'
import {Button, Row, Col} from 'antd'
import '../public/style/index.css'
import Router from 'next/router'

const Home = () => {
    return (
        <Row justify='center' align='middle' style={{paddingTop: 50 + "px"}}>
            <Col span={6}>
                <div className='dowebok'>
                    <Row justify='center' gutter={[16, 50]}>
                        <h1>选择身份</h1>
                    </Row>
                    <Row gutter={[16, 50]}>
                        <Button type='primary' className='button'
                                onClick={()=>Router.push('/student/login')}>我是学生</Button>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Button type='primary' className='button'
                                onClick={()=>Router.push('/teacher/login')}>我是教师</Button>
                    </Row>
                </div>
            </Col>
        </Row>
    )
};

export default Home;
