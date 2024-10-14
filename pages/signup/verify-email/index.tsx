import axios from "axios";
import { useEffect } from "react";
import router from "next/router"
import { toast } from "react-toastify";
import {AUTH_API} from "@/components/utils/serverURL";

const VerifyEmailPage = () => {
  useEffect(
    () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log('token', token);
        if (token){
            const requestOptions = {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1",
                },
            }
            axios
            .post(
                AUTH_API.VERIFY_EMAIL,
                {
                    token,
                },requestOptions
            )
            .then((response) => {
                toast.dismiss();
                if (response.status === 200) {
                    toast.success("Email is successfully verified. Please, sign in...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    const isVerified = "true";
                    localStorage.setItem("isVerified", isVerified);
                    router.push("/signin");
                }
                else if(response.status === 400) {
                    router.push("/signup/please-verify");
                }
            })
            .catch((error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 404) {
                    console.log("Unregistered email");
                    } else if (status === 500) {
                    console.log("Internal Server Error: Something went wrong on the server");
                    }
                }
            });
        }
        else {
            router.push("/signin");
        }
    },[]
    );
  return(
    <div>
        this is verify email page
    </div>
  )
}

export default VerifyEmailPage;