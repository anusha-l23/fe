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
import logo from "../images/favicon-16x16.png";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { code } = useParams();
  console.log(code, "code")
  const obj = JSON.parse(localStorage.getItem("authUser"));
  const email = obj.user.email;
  const navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: "",
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),


    onSubmit: async (values) => {
      if (values?.password !== values?.confirmPassword) {
        toast.error("New password should match with confirm password");
      } else {

        try {

          const res = await axios.post(`http://localhost:3002/users/reset-password/${code}`, { ...values, code, email });
          toast.success("Password updated Successfully");
          navigate("/login");
        } catch (e) {
          toast.error("Invalid token");
        }
      }


    },
  });

  return (
    <div style={{ height: "150vh" }}>
      <div className="text-center">
        <h3 className="mt-4">Reset Password Page</h3>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={7} md={10} xl={6}>
            <Card className="mt-5">
              <CardBody className="p-4">
                <div className="m-3">
                  <Link to="/" style={{ color: 'black', textDecoration: "none" }}>
                    <div className="d-flex flex-row">
                      <div className="py-3">
                        <img src={logo} alt="" height="24" className="" />
                      </div>
                      <div className="p-2">
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
                            <Label className="form-label mt-4">Confirm Password</Label>
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
                        </Row>
                      </div>


                      <div className="mt-4 text-center">
                        <button
                          className="btn btn-primary"
                          type="submit"
                        >
                          Reset password
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

export default ResetPassword;