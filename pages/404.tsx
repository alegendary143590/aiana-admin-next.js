import { Link } from "@mui/material";

export default function Custom404() {
    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            <div className="flex flex-col text-center items-center">
                <h1 className="text-4xl font-bold text-center">Looking for something?</h1>
                <p className="text-gray-500 mt-2">We can’t find this page. But we can help you find</p> 
                <p className="text-gray-500">new opportunities: 
                    <span><a className="text-green-800 underline text-bold" href="/knowledge">Knowledge Base</a>
                    </span> or <span><a className="text-green-800 underline text-bold" href="/chatbot">Chat Bot</a></span>
                </p>
                <Link href="/">                
                    <button type="button" className="w-max px-6 py-3 bg-[#3eb72e] rounded-full mt-8 text-white">Go to Homepage</button>
                </Link>
            </div>
            <div className="absolute bottom-10 flex flex-col gap-3 text-center text-gray-500">
                <p>Error 404</p>
                <p>Aiana® Global Inc.</p>
            </div>            
        </div>
    );
}