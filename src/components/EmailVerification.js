import React, { useEffect, useState } from 'react';
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/images/favicon-16x16.png";
const EmailVerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [expiry, setExpiry] = useState(false)
  const navigate = useNavigate();
  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');
  const code = new URLSearchParams(search).get('code');
  console.log(email, code)
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Please Enter Your Code"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`users/userVerification?email=${email}&code=${code}`, { ...values, code, email });
        console.log(res);
        toast.success("Email verified successfully...");
        navigate("/login")
      }
      catch {
        toast.error("Email verification failed, please check it is either already verified or expired...");
        setExpiry(true);
      }
    },
  });

  const handleResend = async () => {
    const res = await axios.post(`users/resend-email-verify`, { email });
    console.log(res);
    setExpiry(false);
    toast.success("Email resend successfully...");
  }

  return (
    <React.Fragment>

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">

                <CardBody className="pt-0">
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
                  <h3>Email Verification</h3>
                  <div className="p-2">
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
                            <Label className="form-label">email</Label>
                            <Input
                              name="email"
                              type="email"
                              value={email}
                            />
                          </div>

                          <div className="mb-4">
                            <Label className="form-label">Code</Label>
                            <Input
                              name="code"
                              type="code"
                              placeholder="Enter Code"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.code || ""}
                              invalid={
                                validation.touched.code &&
                                  validation.errors.placeholderassword
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.code &&
                              validation.errors.code ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.code}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              Email verify
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                    <div>
                      {expiry &&

                        <div className="mt-4 text-center">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit" onClick={handleResend}
                          >
                            Resend
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Upzet. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesdesign
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>

  );
};

export default EmailVerificationPage;