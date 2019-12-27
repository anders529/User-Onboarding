import React, {useEffect, useState} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm =  ({ values, errors, touched, submitting, status }) => {
  console.log('values', values);
  console.log('errors', errors);
  console.log('touched', touched);

  const [member, setMembers] = useState([]);

  useEffect(() => {
    console.log('status has changed!', status);

    status && setMembers(member => [...member,status]);
  }, [status]);

  return (
    <div>
    <Form>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="name" name="name" placeholder="Name" />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <Field component="select" name="role">
        <option value="plsrole">Please Select a Role</option>
        <option value="Front End Devloper">Front End Web Developer</option>
        <option value="Back End Devloper">Back End Web Developer</option>
        <option value="Data Scientist">Data Scientist</option>
      </Field>
      <button disabled={submitting}>Submit</button>
    </Form>
  
  {member.map(members => {
    return (
      <div key={members.id}>
          Name: {members.name}
          <br/>
          Email: {members.email}
          <br/>
          Role: {members.role}
      </div>
    )
    })}
    </div>
  )};

const FormikOnboardForm = withFormik({
  mapPropsToValues({ name, email, password, tos, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      role: role || "plsrole"
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is Required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(16, "Password must be 16 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm,setStatus, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setStatus(res.data);
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(OnboardForm);

export default FormikOnboardForm;