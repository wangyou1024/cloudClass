import React, {useState, useContext, useEffect} from 'react';
import "../../../public/style/teacher/detail.css"
import {Col, Row} from "antd";
import {MessageContext} from "./detailContext";

const Message = () => {
    const message = useContext(MessageContext)
    const [realMessage, setRealMessage] = useState({
        mid: "1",
        cid: "1",
        mtitle: "1",
        mcontent: "1",
        mpublish: "2020/09/08"
    });
    useEffect(() => {
        setRealMessage(JSON.parse(JSON.stringify(message)))
    }, [message])
    return (
        <Col span={23}>
            <Row className='wrap'>
                <Col>
                    <Row gutter={[10,10]}><Col><h2>{realMessage.mtitle}</h2></Col></Row>
                    <Row gutter={[10,10]}><Col>{realMessage.mcontent}</Col></Row>
                    <Row gutter={[10,10]}>
                        <Col>发布时间：{realMessage.mpublish}</Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default Message;