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
import { Link } from "react-router-dom";
import logo from "../assets/images/favicon-16x16.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser, registerUserSuccessful } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {

const dispatch = useDispatch();
  const navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your First Name"),
      lastName: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
   

        onSubmit: async(values) => {
          
                try {
                  const obj = JSON.parse(localStorage.getItem("authUser"));
                  dispatch(registerUser(values));
                  toast.success("User Registered Successfully, please check your emal for email verification code");
                 // navigate(`/userVerification?email=${obj.email}`)
                } catch (e) {
                  toast.error("User already registered");

                }
        },
  });

  return (
    <div>
<div className="text-center">
  <h3 className="mt-4">Signup Page</h3>
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
                              <Label className="form-label">First Name</Label>
                              <Input
                                name="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.firstName || ""}
                                invalid={
                                  validation.touched.firstName &&
                                    validation.errors.firstName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.firstName &&
                                validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  <div>{validation.errors.firstName}</div>
                                </FormFeedback>
                              ) : null}
                            </Col>
                            <Col md={6}>
                              <Label className="form-label">Last Name</Label>
                              <Input
                                name="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastName || ""}
                                invalid={
                                  validation.touched.lastName &&
                                    validation.errors.lastName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.lastName &&
                                validation.errors.lastName ? (
                                <FormFeedback type="invalid">
                                  <div>{validation.errors.lastName}</div>
                                </FormFeedback>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
              
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
                          </Col></Row>
                        </div>
                        <div className="mb-4">
                        <Row>
                            <Col md={6}>
                          <Label className="form-label">Confirm Password</Label>
                          <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirmPassword || ""}
                            invalid={
                              validation.touched.confirmPassword &&
                                validation.errors.confirmPassword
                                ? true
                                : false
                            }
                          />
                          {validation.touched.confirmPassword &&
                            validation.errors.confirmPassword ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirmPassword}</div>
                            </FormFeedback>
                          ) : null}
                          </Col>
                            <Col md={6}>
                                </Col>
                                </Row>
                        </div>
                      
                        <div className="mt-4 text-center">
                          <button
                            className="btn btn-primary"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-2 text-center">
                <p>
                  Already have an account ?
                  <Link to="/login" className="text-primary">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </p>
                
                  </div>
            </Col>
          </Row>
        </Container>
      </div>
 
  );
};

export default Signup;
