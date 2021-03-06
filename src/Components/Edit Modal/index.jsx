import React, { useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { editProfile } from "../../store/user/actions";
import { useDispatch,useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
      height: '100%',
      opacity: '0.3',
      zIndex: '-1',
      left: '0',
      top: '0'
    }
  
  };
  
export default function EditModal() {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useSelector(selectUser);
        
    const [city, setCity] = useState(user.city);
    const [isOwner, setIsOwner] = useState(user.owner);
    const [description, setDescription] = useState(user.description);
    const [nameSignUp, setNameSignUp] = useState(user.name);
    const [emailSignUp, setEmailSignUp] = useState(user.email);
    const [pet, setPet] = useState(user.owners ? user.owners[0].pets[0] : null);


    function submitEditProfile(event) {
        event.preventDefault();
        console.log(pet);
        dispatch(editProfile(nameSignUp, emailSignUp,city,isOwner,description,image, pet));
      }
       
      //Cloudinary image
    const [image, setImage] = useState(user.imageUrl);
  
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

    return(
    <div>
      <button className="pixel-borders pixel-borders--2-inset"  onClick={handleOpen}>Edit</button>
      <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >

      <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Edit your Profile</h1>
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
            checked={isOwner}
          />
        </Form.Group> 

          {(isOwner && user.owners) &&
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
              checked={pet.available}
              required
            />
            </Form.Group>

            <Form.Group controlId='formBasicPets'>
            <Form.Label><strong>Specie</strong></Form.Label>
            <Form.Control size="sm"
              as="select"
              value={pet.speciesId}
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
          <Button variant="primary" type="submit" onClick={submitEditProfile}>
            Edit
          </Button>
        </Form.Group>
        <br/>
      </Form>

          </Typography>
        </Box>
      </Modal>
    </div>
    )
}