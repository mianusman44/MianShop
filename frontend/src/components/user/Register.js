import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import Resizer from "react-image-file-resizer";

import MetaData from '../layout/MetaData'

import { register, clearErrors } from '../../actions/userActions'

const Register = ({ history }) => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',

    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarpreview, setAvatarpreview] = useState('/images/default_avatar.jpg');



    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/');
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


        if (isAuthenticated) {

            alert.success('Registration Successfully.');

        }

    }, [dispatch, alert, isAuthenticated, error, history]);


    const registerHandler = (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData));



    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            var fileInput = false;
            if (e.target.files[0]) {
                fileInput = true;
            }
            if (fileInput) {

                Resizer.imageFileResizer(
                    e.target.files[0],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        setAvatarpreview(uri);
                        setAvatar(uri);

                    },
                    "base64",
                    200,
                    200

                );

            }

            const reader = new FileReader();
            reader.onload = () => {

                if (reader.readyState === 2) {
                    setAvatarpreview(reader.result);
                    setAvatar(reader.result);

                }
            }
            reader.readAsDataURL(e.target.files[0]);



        }
        else {

            setUser({
                ...user, [e.target.name]: e.target.value
            })
        }

    }


    return (
        <Fragment>

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Register User'} />

                    <div className="row wrapper" style={{ marginBottom: '100px' }}>
                        <div className="col-10 col-lg-5">
                            <div className="text-center mt-2 mb-3">
                                <img src="/images/esse.png" height="150" width="150" />
                            </div>
                            <form className="shadow-lg" encType='multipart/form-data' onSubmit={registerHandler}>
                                <h1 className="mb-3">Register</h1>

                                <div className="form-group">
                                    <label htmFor="email_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name='password'
                                        value={password}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarpreview}
                                                    className='rounded-circle'
                                                    alt='avatar Preview'
                                                />
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                max-size="100000"
                                                accept=".jpg, .jpeg, .png"
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                // accept="images/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id="register_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    REGISTER
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>

            )}
        </Fragment>
    )
}

export default Register
