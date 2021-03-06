import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    Form,
    Input,
    Button,
    Typography,
    message
} from 'antd';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
const { Title } = Typography;

const SignForm = ({ type }) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userInfo, setUserInfo] = useState({
        email: '', password: '',
    });

    const handleChange = ({ target: { name, value } }) => {
        setUserInfo({ ...userInfo, [name]: value });
    };

    const registerUser = async ({ email, password }) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "local",
                email,
            })
            message.success("Hi User")
            navigate('/home')
        } catch (err) {
            message.error(err.message)
        }
    };
    const LoginUser = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.success('Hi User')
            navigate('/home')
        } catch (err) {
            message.error(err.message)
        }
    };

    return (
        <section className="login_form">
            <Title>Welcome to Todo</Title>
            <Title className="login_text">{type === 'login' ? "LOGIN" : "REGISTER"}</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={() => type === 'login' ? LoginUser(userInfo) : registerUser(userInfo)}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        name="email"
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
                        name="password"
                        onChange={(event) => handleChange(event)}
                        placeholder="*******"
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"

                    >
                        {type === 'login' ? "Login" : "Register"}
                    </Button>
                    {"   "} <Link to={type !== 'login' ? "/login" : "/register"}>{type !== 'login' ? "Login" : "Register"}</Link>
                </Form.Item>
            </Form>
        </section>
    )
}

export default SignForm;