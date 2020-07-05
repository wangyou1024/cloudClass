import React, {useState} from 'react'
import cookie from 'react-cookies'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {RealAxios, URL} from "../../config";

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('您只能上传png图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error('图片最大为5MB!');
    }
    return isJpgOrPng && isLt2M;
}

const UploadImg = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            RealAxios({
                method: 'post',
                url: "/student/getHeaderImg",
                data: {
                    'phone': cookie.load("id"),
                }
            }).then((response) => {
                setImage('data:image/png;base64,' + response.data.image);
            }).catch((error) => {
                console.log(error);
            })
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={URL+"/student/uploadImg"}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            data = {{"phone":cookie.load("id")}}
            headers={{
                "Access-Control-Allow-Origin":URL,
                'Access-Control-Allow-Headers':'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
                "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
                "X-Powered-By":' 3.2.1',
            }}
        >
            {image ? <img src={image} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    );
};

export default UploadImg;
