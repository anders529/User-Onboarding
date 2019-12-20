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
        
    )
}