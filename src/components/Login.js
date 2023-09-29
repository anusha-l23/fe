import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import { toast } from 'react-toastify';
import { Link, json } from "react-router-dom";
import logo from "../assets/images/favicon-16x16.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

 //console.log(user.user.isEmailVerified, "user")
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {

      try {  
  await dispatch(loginUser(values));
  const obj = localStorage.getItem("authUser");
  console.log(obj, "obj")
    if(obj.isEmailVerified !== true)
    {
    setMessage("Email is not verified, please check your email for verification")
    }
    else
    {
      setMessage("")
      toast.success("User loggedin successfully...")
      navigate("/dashboard")
    }
    // else{
    //   setMessage("Email is not verified, please check your email for verification")
    // }

}
      catch (error) {
        toast.error("Authentication failed");
      }
    },

  });
  const user = useSelector(state => ({
    user: state.account.user,
    }))
    console.log(user, "user")
    

  return (
    <div>
      <div className="text-center">
        <h3 className="mt-4">Login Page</h3>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={7} md={10} xl={6}>
            <Card className="mt-5">
              <CardBody className="p-4">
                <div className="m-3">
                  <Link to="/" style={{ color: 'black', textDecoration: "none" }}>
                    <div className="d-flex flex-row">
                      <div>
                        <img src={logo} alt="" height="24" className="" />
                      </div>
                      <div>
                        <span className="fs-4">Leanfolks</span>
                      </div>
                    </div>
                  </Link>

                </div>
                <Row>
                  <Col md={6}>
                  </Col>
                  <Col md={6}>
                    <div className="mt-2 text-center">
                      <Link to="/forgot-password" className="text-black">
                        Forgot Password ?
                      </Link>
                    </div>
                  </Col>
                </Row>
                {message ? <p className="bg-warning text-center mt-4">{message}</p> : ""}
                <Form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <Row>
                    <Col md={12}>
                      <div className="mb-4">
                        <Row>
                          <Col md={6}>
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                  validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                              validation.errors.email ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.email}</div>
                              </FormFeedback>
                            ) : null}
                          </Col>

                          <Col md={6}>
                          </Col>

                          <Col md={6}>
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                  validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                              validation.errors.password ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.password}</div>
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col md={6}>
                          </Col>
                        </Row>
                      </div>

                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-primary px-4"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/edit-profile"
                          className="text-black"
                          type="submit"
                        >
                          Update Profile
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Form>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default Login;
