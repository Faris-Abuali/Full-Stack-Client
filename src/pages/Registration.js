import React from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // form validation
// allow you to create forms without using the HTML <form> tag and validate them easily
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


function Registration() {

    const navigate = useNavigate();
    
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(30).required(),
        confirmPassword: Yup.string().min(4).max(30).required('')
            .when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    "Both passwords must be identical"
                )
            })
    });
    const handleSubmit = (data) => {
        //console.log(data);
        axios.post(`https://full-stack-api-pedrotech-faris.herokuapp.com/auth`, data)
            .then((response) => {
                console.log(process.env.REACT_APP_API_URL);
                //console.log(response.data.error); // ex: Username already taken
                //console.log(response.data.message); // ex: Success, user created
                let feedback;
                if (response.data.message) {
                    feedback = response.data.message;
                }
                else if(response.data.error) {
                    feedback = response.data.error;
                }
                alert(feedback);

                // If user is registered successfully, navigate to homepage
                if (response.data.message) navigate('/'); // return to homepage
            });
    };


    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <h3>{process.env.REACT_APP_API_URL}</h3>
                    <h3>{process.env.NODE_ENV}</h3>
                    <label>Username: </label>
                    <ErrorMessage name='username' component='span' />
                    <Field
                        id='inputCreatePost'
                        name='username'
                        placeholder='(Ex: fares123)'
                    />

                    <label>Password: </label>
                    <ErrorMessage name='password' component='span' />
                    <Field
                        type="password"
                        id='inputCreatePost'
                        name='password'
                        placeholder='your password must be strong'
                    />
                    <label>Confirm Password: </label>
                    <ErrorMessage name='confirmPassword' component='span' />
                    <Field
                        type="password"
                        id='inputCreatePost'
                        name='confirmPassword'
                        placeholder='confirm password'
                    />
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
