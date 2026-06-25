import { Avatar } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
const LazyAvatar = ({ src, sx }) => (
    <Avatar
      sx={sx}
    >
      <LazyLoadImage
        alt="Product Image"
        src={src}
        effect="blur" // Optional: You can use other effects like "opacity"
        style={{objectFit:'contain' , width:'100%' }}
      />
    </Avatar>
  );

export default LazyAvatar
