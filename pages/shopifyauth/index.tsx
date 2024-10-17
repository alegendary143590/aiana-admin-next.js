import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { AUTH_API } from "@/components/utils/serverURL";

const ShopifyAuth = () => {
    const router = useRouter();
    const fetchRef = useRef(false);
    useEffect(() => {
        if(fetchRef.current) return;
        fetchRef.current = true;
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const requestOptions = {
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': "1",
                    })
                };
                const response = await fetch(`${AUTH_API.SHOPIFY_AUTH}?${queryParams.toString()}`, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                const { status, message } = data;
                if (status === "success") {
                    toast.success(message, { position: toast.POSITION.TOP_RIGHT });
                    router.push("/");
                }
            } catch (error) {
                toast.error(`Failed to authenticate with Shopify: ${error}`, { position: toast.POSITION.TOP_RIGHT });
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default ShopifyAuth;