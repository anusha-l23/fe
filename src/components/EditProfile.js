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
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { editProfile } from "../store/actions";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";


const UserProfile = () => {
const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  const [avatarPreview, setAvatarPreview] = useState({});

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview({ url: reader.result, file });
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`http://localhost:3002/users/fileUpload`);
    console.log(res);
  };

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
    <React.Fragment>
        <div style={{ height: "150vh"}} className="mx-auto w-50 mt-5">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {!avatarPreview?.url ? (
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
                  ) : (    <div className="d-flex">
                  <div className="ms-3">
                    <img
                      src={avatarPreview?.url}
                      alt="Avatar Preview"
                      className="avatar-md rounded-circle img-thumbnail w-50"
                    />
                  </div>
                </div>)}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
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
          </Card>
        </Container>

     
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
