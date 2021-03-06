import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login, signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { Col } from "react-bootstrap";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',  
  transform: 'translate(-50%, -50%)',
  width: 550,
  borderRadius:"20px",
  bgcolor: 'background.paper',
  border: '4px solid #FF9B49',
  boxShadow: 24,
  p: 4,
  maxHeight: '90%',
  overflow: 'auto',
  "&::before": {
    content: '""',
    background: `url('${process.env.PUBLIC_URL}/assets/backgrounddog.webp')`,
    backgroundSize: 'contain',
    position: 'absolute',
    width: '100%',
    height: '157%',
    opacity: '0.3',
    zIndex: '-1',
    left: '0',
    top: '0',
    
  }

};

export default function ModalLogin() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [description, setDescription] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  //pet
  const [pet, setPet] = useState({});

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [displayOnRegister, setDisplayOnRegister] = useState(false)

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  function submitFormLogin(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  function submitFormSignUp(event) {
    event.preventDefault();
    console.log(pet);
    dispatch(signUp(nameSignUp, emailSignUp, passwordSignUp,city,isOwner,description,image, pet));
  }
 //Cloudinary image
  const [image, setImage] = useState("");
  
  const uploadImage = async(e) => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    //first parameter is always upload_preset, second is the name of the preset
    data.append('upload_preset', "ryzmmtyg")
    
    //post request to Cloudinary, remember to change to your own link
    const res = await fetch("https://api.cloudinary.com/v1_1/dcllwpbxp/image/upload", 
    {
      method: "POST",
      body: data
    }
    );
   // we can use Axios(first import it) request instead of Fetch
    // axios.post("https://api.cloudinary.com/v1_1/dwpyp7i9h/image/upload", data);
    const file = await res.json()
    console.log("file", file) //check if you are getting the url back
    setImage(file.url) //put the url in local state, next step you can send it to the backend
  };
  // Cloudinary part


  return (
    <div>
      <button className="links pixel-borders pixel-box--primary" onClick={handleOpen}>Login</button>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {//se displayOnRegister for negativo entao eu mostro o formulario pra logar
        !displayOnRegister ?
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
              <h1 className='mt-5 mb-5'>Login</h1>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label><strong> Email address</strong></Form.Label>
                <Form.Control
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type='email'
                  placeholder='Enter email'
                  required
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type='password'
                  placeholder='Password'
                  required
                />
              </Form.Group>
              <Form.Group className='mt-5'>
                <Button variant='primary' type='submit' onClick={submitFormLogin}>
                  Log in
                </Button>
              </Form.Group>
              <br/>
              <Button onClick={() => setDisplayOnRegister(true)} style={{ textAlign: "center" }}>
                Click here to register
              </Button>
            </Form>
          </Typography>
        </Box>
        //se displayOnRegister is positive I show form to register 
        : 
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label><strong>Name</strong></Form.Label>
          <Form.Control
            value={nameSignUp}
            onChange={(event) => setNameSignUp(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label><strong>Email address</strong></Form.Label>
          <Form.Control
            value={emailSignUp}
            onChange={(event) => setEmailSignUp(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          /> 
        </Form.Group>

        <Form.Group controlId="formBasicCity">
          <Form.Label><strong>City</strong></Form.Label>
          <Form.Control
            value={city}
            onChange={(event) => setCity(event.target.value)}
            type="text"
            placeholder="Enter city"
            required
          /> 
          
          <Form.Group controlId="formBasicPassword">
          <Form.Label><strong>Password</strong></Form.Label>
          <Form.Control
            value={passwordSignUp}
            onChange={(event) => setPasswordSignUp(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        </Form.Group>
{/* uploadImage*/}
      <br/>
      <input type="file" onChange={uploadImage}/>
      <div>
        <img style={{width:150,height:150}}src={image ? image : "https://www.housesitmatch.com/wp-content/themes/petsitter/images/job-placeholder.gif"} alt="user-img"/>
        {image ? <title style={{fontSize: 20}}>Succesfully uploaded!</title> : ""}
      </div>

        <Form.Group controlId="formBasicDescription">

          <Form.Label><strong>Add Description</strong></Form.Label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder="About you"
            required
          /> 
        </Form.Group>
        <br/>

{/* checkbox input  */}
        <Form.Label><strong>I'm a pet owner </strong> </Form.Label>
         <Form.Group controlId="formBasicIsOwner">
          <Form.Check 
            value={isOwner}
            onChange={(event) => setIsOwner(event.target.checked)}
            type="checkbox"
          />
        </Form.Group> 

          {isOwner &&
          <div>
             <Form.Group controlId='formBasicPets'>
             <Form.Label><strong>Name</strong></Form.Label>
             <Form.Control
               value={pet.name}
               onChange={(event) => setPet({...pet, name: event.target.value})}
               type='text'
               placeholder='Pet Name'
               required
             />
           </Form.Group>

            <Form.Group controlId='formBasicPets'>
            <Form.Label><strong>Description</strong></Form.Label>
            <textarea
              value={pet.description}
              onChange={(event) => setPet({...pet, description: event.target.value})}
              type='text'
              placeholder='About your pet'
              required
            />
            </Form.Group>

            <Form.Group controlId='formBasicPets'>
            <Form.Label><strong>Age</strong></Form.Label>
            <Form.Control 
              value={pet.age}
              onChange={(event) => setPet({...pet, age: event.target.value})}
              type='number'
              placeholder='Age'
              required
            />
            </Form.Group>

            <Form.Group controlId='formBasicPets'>
            <Form.Label><strong>Available</strong></Form.Label>
            <Form.Check 
              value={pet.available}
              onChange={(event) => setPet({...pet, available: event.target.checked})}
              type='switch'
              required
            />
            </Form.Group>

            <Form.Group controlId='formBasicPets'>
            <Form.Label><strong>Specie</strong></Form.Label>
            <Form.Control size="sm"
              as="select"
              value={pet.specie}
              onChange={(event) => setPet({...pet, specie: event.target.value})}
              placeholder='Specie'
              required
            >
            <option value="1">Dog</option>
            <option value="2">Cat</option>
            <option value="3">Bunny</option>
            <option value="4">Bird</option>
            <option value="5">reptile</option>
            <option value="6">Other</option>
            </Form.Control>
            </Form.Group>
          </div>   
        }
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitFormSignUp}>
            Sign up
          </Button>
        </Form.Group>
        <br/>
        <Button onClick={() => setDisplayOnRegister(false)}>Click here to log in</Button>
      </Form>

          </Typography>
        </Box>
      }
      </Modal>
    </div>
  );
}
