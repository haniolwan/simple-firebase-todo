import {
    signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../../firebase-config";
import {
    Form,
    Input,
    Button,
    Typography,
    message
} from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;




const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '', password: '',
    });
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUserInfo({ ...userInfo, [name]: value });
    };

    const logInWithEmailAndPassword = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.success("Hi User")
            navigate('/')
        } catch (err) {
            message.error(err.message)
        }
    };

    return (
        <section className="login_form">
            <Title className="login_text">Login</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        onChange={(event) => handleChange(event)}
                        placeholder="example@example.com"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        onChange={(event) => handleChange(event)}
                        placeholder="*******"
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => logInWithEmailAndPassword(userInfo)}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </section>
    )
}

export default Login;