import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { editProfile } from "../store/actions";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/favicon-16x16.png";
import { APIClient } from "../helpers/api_helper";
import { useSelector, useDispatch } from "react-redux";
import { FILE_UPLOAD } from "../helpers/url_helper";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const api = new APIClient()
  const [picture, setPicture] = useState();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file, "file")
    setPicture(file)
// if(file){
//       const reader = new FileReader(); 
//       reader.onloadend = () => {
//         setPicture({ url: reader.result, file });
//       }
//      reader.readAsDataURL(file);
//     }
  };

  const handleUpload = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    console.log(formData, "formData")
    const response = await axios.post("http://localhost:3002/users/fileUpload",
    formData,
    {
      headers: {
      "Content-Type": "multipart/form-data",
      }
    })
     console.log(response);
  }
  console.log(picture, "picturename")

  
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     console.log(file, "file")
//     setPicture(file)
// if(file){
//       const reader = new FileReader(); 
//       reader.onloadend = () => {
//         setPicture({ url: reader.result, file });
//       }
//      reader.readAsDataURL(file);
//     }
//     const formData = new FormData();
//     formData.append("picture", picture);
//     console.log(formData, "formData")
//     const result = await axios.post("http://localhost:3002/users/fileUpload",
//     formData,
//     {
//       headers: {
//       "Content-Type": "multipart/form-data",
//       }
//     })
//   }
  

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setData(obj);
      console.log(obj, "data")
    }
  }, []);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
    picture: data?.picture || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your First Name"),
      lastName: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().required("Please Enter Your Email"),
      picture: Yup.string(),

    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
      navigate("/dashboard")
    },
  });
  return (

    <div>
      <div className="text-center">
        <h3 className="mt-4">Update Profile Page</h3>
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
                  <Col lg="12">

                    <CardBody>
                      {!picture ? (
                        <div className="">
                          <input
                            type="file"
                            name="picture"
                            className="form-control-file"
                            id="file"
                          accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                      ) : (<div className="d-flex gap-4">
                        <div className="ms-3">
                          <img
                            src={picture.name}
                            alt="Profile Picture"
                            className="avatar-md rounded-circle img-thumbnail w-50"
                          />
                        </div>
                        <button onClick={handleUpload} className="px-4">upload</button>
                      </div>
                      )}
                   
                     
                    </CardBody>

                  </Col>
                </Row>

                <CardBody>
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
                                disabled
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  <div>{validation.errors.email}</div>
                                </FormFeedback>
                              ) : null}
                            </Col>
                            <Col md={6}></Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>

                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        Update Profile
                      </button>

                    </div>
                  </Form>
                </CardBody>
              </CardBody>
            </Card></Col>
        </Row></Container></div>

  );
};

export default UserProfile;
