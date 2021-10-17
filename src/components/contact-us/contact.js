
import React, { useContext, useState } from "react";
import { Container, Row, Col, Media, Form, Label, Input } from "reactstrap";
import CommonLayout from "../Layout/CommonLayout";
import emailjs from 'emailjs-com';
import swal from 'sweetalert';






const ContactDetail = ({ img, title, desc1, desc2 }) => {
  return (
    <li>
      <div className="contact-icon">
        <i className={`fa ${img}`} aria-hidden="true"></i>
        <h6>{title}</h6>
      </div>
      <div className="media-body">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </li>
  );
};
const templateParams = {
    from_name: 'sanman',
    to_name: 'test@gmail.com',
    subject: '',
    message: 'Hello world!!',
    user_phone:'',
    user_email:''
   }

const Contact = (props) => {

  const contactUsInformation=[
    {
      desc1: "+91-9833305492",
      img: "fa-phone",
      title: "Contact us",
    },
    {
      desc1: "Taximen's Colony, Near Bandra Kurla Complex",
      desc2: "Kurla West, Mumbai-400070",
      img: "fa-map-marker",
      title: "Address",
    },
    {
      desc1: "maaz.ansari0108@gmail.com",
      img: "fa-envelope-o",
      title: "email Address",
    },
    {
      desc1: "6pm to 9pm",
      img: "fa-clock-o",
      title: "Timing",
    },
  ]
const emailJsInformation={
  "onwerName":"Maaz Ansari"
  ,"serviceId":"gmail"
  ,"templateId":"contact_us_template"
  ,"userId":"user_Wqt0nf64PrqwcEYf2cPRt"
}

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userMessage, setUserMessage] = useState('');

   
    const clearInput=()=>{
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
    setEmail('')
    setUserMessage('')
    }
    
    const sendFeedback =(templateId,service_Id, variables,userId)=> {
          emailjs.send(
          service_Id, templateId,
          variables,userId
          ).then(res => {
            console.log('Email successfully sent!')
            swal("Good job!", "Email successfully sent!", "success");
            clearInput()
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => {console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
          swal("ohh", "Email Error!", "warning");
        })
      }
    const sendEmail=(e)=> {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        let template_Id = emailJsInformation.templateId
        let service_Id =emailJsInformation.serviceId
        let user_Id =emailJsInformation.userId
        templateParams.from_name=firstName +' '+ lastName 
         templateParams.to_name=emailJsInformation.onwerName
         
         templateParams.user_phone=phoneNumber
         templateParams.user_email=email
         templateParams.subject='Test'

         templateParams.message= userMessage

    	sendFeedback(template_Id,service_Id, templateParams,user_Id)
     
      }
   return (
    <CommonLayout parent="home" title="Contact">
      <section className="contact-page section-b-space">
        <Container>
          <Row className="section-b-space">
            <Col lg="7" >
              

            <form className="theme-form" onSubmit={sendEmail}>
                <Row>
                  <Col md="6">
                    <Label for="name">First Name</Label>
                    <Input
                      type="text"
                      onChange={e => setFirstName(e.target.value)}
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter Your name"
                      required=""
                      value={firstName}

                    />
                  </Col>
                  <Col md="6">
                    <Label for="name">Last Name</Label>
                    <Input
                      type="text"
                      onChange={e => setLastName(e.target.value)}
                      className="form-control"
                      id="lastName"          
                      name="lastName"
                      placeholder="Enter Your Last Name"
                      required=""    
                      value={lastName}

                    />
                  </Col>
                  <Col md="6">
                    <Label for="review">Phone number</Label>
                    <Input
                      type="text"
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your number"
                      required=""
                      value={phoneNumber}

                    />
                  </Col>
                  <Col md="6">
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      onChange={e => setEmail(e.target.value)}
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required=""
                      value={email}

                    />
                  </Col>
                  <Col md="12">
                    <Label for="review">Write Your Message</Label>
                    <textarea
                      className="form-control"
                      onChange={e => setUserMessage(e.target.value)}
                      placeholder="Write Your Message"
                      id="userMessage"
                      name="userMessage"
                      rows="6"
                     value={userMessage}

                    ></textarea>
                  </Col>
                  <Col md="12">
                    <button className="btn btn-solid"  type="submit"//onClick={sendEmail}
                    >
                      Send Your Message
                    </button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col lg="5">
              <div className="contact-right">
                <ul>
                  {contactUsInformation.map((data, i) => {
                    return (
                      <ContactDetail
                        key={i}
                        img={data.img}
                        title={data.title}
                        desc1={data.desc1}
                        desc2={data.desc2}
                      />
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Contact;
