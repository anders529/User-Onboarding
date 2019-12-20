import React, {useState,useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({values, errors, touched, status}) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [onBoard, setOnboard] = useState([]);
  useEffect(() => {
    console.log(status);
    status &&
      setOnboard(onBoard => [...onBoard, status]);
  }, [status]);
  return (
    <div>
      <Form>
        <label htmlFor="name">
          Name:
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="name"
          />
          {touched.name &&
            errors.name && (
              <p className="errors">
                {errors.name}
              </p>
            )}
        </label>
        <label htmlFor="email">
          Email:
          <Field
            id="email"
            type="text"
            name="email"
            placeholder="email"
          />
          {touched.email && errors.email && (
            <p className="errors">
              {errors.email}
            </p>
          )}
        </label>
        <label htmlFor="password">
          Password:
          <Field
            id="password"
            type="text"
            name="password"
            placeholder="password"
          />
          {touched.email && errors.password && (
            <p className="errors">
              {errors.password}
            </p>
          )}
        </label>
        <label>
          Do You Agree To The Terms of Service?
          <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <span/>
        </label>
        <button type="submit">
          Submit!
        </button>
      </Form>
      {onBoard.map(onboard => {
        return (
          <ul key={onboard.id}>
            <li>
              Name: {onboard.name}
            </li>
            <li>Email: {onboard.email}</li>
          </ul>
        );
      })}
    </div>
  );
};
const OnBoardForms = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values,{setStatus, resetForm}) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err =>
        console.log(err.response));
  }})
  (OnboardForm);
export default OnBoardForms;
