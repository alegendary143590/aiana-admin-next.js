import * as React from 'react';
import { useAuth } from "@/providers/AuthProvider"
import Button from "@mui/material/Button"
import GoogleIcon from '@mui/icons-material/Google';

export default function GoogleButton({text}) {
  const { googleSign } = useAuth()
  return (
      <Button className="mt-[20px] h-[48px] w-full 
        font-urwgeometric_bold text-lg
        samsungS8:mt-[25px] 
        xs:mt-[30px]" 
        onClick={googleSign}
        startIcon={<GoogleIcon />}
        style={{backgroundColor:"#6666ff", marginTop:"20px", opacity:"65", color:"#fff", borderRadius:"30px"}}>
        {text} with Google
      </Button>
  );
}