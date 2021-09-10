import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import Resizer from "react-image-file-resizer";

import MetaData from '../layout/MetaData'

import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = ({ history }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const [avatar, setAvatar] = useState('');
    const [avatarpreview, setAvatarpreview] = useState('/images/default_avatar.jpg');



    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)


    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarpreview(user.avatar.url);

            //console.log(user.avatarpreview);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Updated User Successfully.');
            dispatch(loadUser());
            history.push('/me');

            dispatch({
                type: UPDATE_PROFILE_RESET,

            })
        }




    }, [dispatch, alert, isUpdated, error, history]);


    const submitHandler = (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData));



    }

    const onChange = (e) => {




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



            const reader = new FileReader();
            reader.onload = () => {

                if (reader.readyState === 2) {
                    setAvatarpreview(reader.result);
                    setAvatar(reader.result);

                }
            }
            reader.readAsDataURL(e.target.files[0]);



        }









    }



    return (
        <Fragment>

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Update Profile'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mt-2 mb-5">Update Profile</h1>

                                <div className="form-group">
                                    <label htmlFor="email_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarpreview}
                                                    className='rounded-circle'
                                                    alt='Avatar Preview'
                                                />

                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept="image/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn update-btn btn-block mt-4 mb-3"
                                    disabled={loading ? true : false}
                                >Update</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default UpdateProfile
