export const constants = {
    url:
        process.env.NODE_ENV === "development"
            ?"http://localhost:3000"
            :"https://login.aiana.io",
    paymentLinks:{
        lifetimeMembership:
            process.env.NODE_ENV === "development"
                ? "https://buy.stripe.com/test_eVa00dgy7fLyemQ9AA"
                :"",
            preOrderBasicLink:
            process.env.NODE_ENV === "development"
                ?"https://buy.stripe.com/test_eVa00dgy7fLyemQ9AA"
                :"",
    }
}