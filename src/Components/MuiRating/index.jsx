import { Stack,Rating } from "@mui/material"
import React from "react"
 import { useState } from "react"
 import FavoriteIcon from "@mui/icons-material/Favorite"
 import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

export default function  MuiRating ({ratingValue}){
    const [value, setValue] = useState(ratingValue)
    console.log({value})
    const handleChange = (event,newValue) => {
        setValue(newValue)
    }

    return(
        <Stack spacing = {2}>
            <Rating value={ratingValue} onChange={handleChange} size='large'
            icon={<FavoriteIcon frontSize='inherit' color='error'/>}
            emptyIcon={<FavoriteBorderIcon fontSize='inherit'/>}
            readOnly
            />
            
        </Stack>
    )
}

