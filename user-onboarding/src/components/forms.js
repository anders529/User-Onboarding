import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const OnboardForm = ({
    values,
    errors,
    touched,
    status
}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const {onBoard, setOnBoard} = useState([]);
    useEffect(() => {
        console.log(
            "Status Change", status
        );
    status &&
            setOnBoard(onBoard => [
                ...onBoard,
                status
            ]);
    }, [status]);
    return (
        <div className="OnboardForm">
            <Form>
                <label htmlFor="name">Name:
                <Field
                    id="name"
                    type="text"
                    placeholder="Name"
                />
                {touched.name &&
                errors.name && (
                    <p className="errors">
                        {errors.name}
                    </p>
                )}
                </label>
                <label htmlFor="eMail">Email:
                <Field
                    id="eMail"
                    type="text"
                    placeholder="Email"
                />
                {touched.eMail &&
                errors.eMail && (
                    <p className="errors">
                        {errors.eMail}
                    </p>
                )}
                </label>
                <label htmlFor="passWord">Password:
                <Field
                    id="passWord"
                    type="text"
                    placeholder="passWord"
                />
                {touched.passWord &&
                errors.passWord && (
                    <p className="errors">
                        {errors.passWord}
                    </p>
                )}
                </label>

            </Form>
        </div>
    )
}