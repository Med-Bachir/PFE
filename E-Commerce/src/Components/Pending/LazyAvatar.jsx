// LazyAvatar.jsx
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Box from "@mui/material/Box";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyAvatar = ({ src, sx }) => (
  <Box
    sx={{
      ...sx,
      overflow: "hidden",
      borderRadius: 2, // or any desired border-radius
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height:'100%',
      "&>span" : {
       height:'100%',
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       
      }
    }}
  >
    <LazyLoadImage
      alt="Product Image"
      src={src}
      effect="blur"
      style={{
        objectFit: "contain",
        width: "100%",
        
      }}
    />
  </Box>
);

export default LazyAvatar;
