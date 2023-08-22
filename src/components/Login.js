import React, { useEffect } from "react";
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
import api from "../api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
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
        onSubmit: async(values) => {
                try {
                    dispatch(loginUser(values));
                    toast.success("User Loggedin Successfully");
                    navigate("/dashboard");
                } catch (e) {
                  toast.error("Authentication failed");
              }
           
          
        },
  });

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
                    <Link to="/" style={{color:'black', textDecoration:"none"}}>
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
