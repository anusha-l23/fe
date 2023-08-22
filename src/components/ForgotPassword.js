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
import api from "../api";
import logo from "../assets/images/favicon-16x16.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { userForgetPassword } from "../store/actions";
import { UseSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
        onSubmit: async(values) => {
                try {
                    dispatch(userForgetPassword(values));
                    toast.success("Sent email for resetting password, please check your mail to get reset password link");
                } catch (e) {
                  toast.error("Email sending failed...");
              }
           
          
        },
  });



  return (
    <div>
<div className="text-center">
  <h3 className="mt-4">Forgot Password Page</h3>
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
            
                        <div className="mb-4 w-50">
                   
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
                     
                        </div>
                      
                        <div className="mt-4 text-center">
                          <button
                            className="btn btn-primary"
                            type="submit"
                          >
                            Forgot Password
                          </button>
                        </div>
                      
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
 
  );
};

export default ForgotPassword;
