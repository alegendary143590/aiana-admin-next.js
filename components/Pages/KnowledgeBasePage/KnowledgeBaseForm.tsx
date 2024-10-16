import React, { useState, useRef } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { FaArrowLeft } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { toast } from "react-toastify"
import { AUTH_API } from "@/components/utils/serverURL"
import { setExpiryTime } from "@/components/utils/common"
import Spinner from "@/components/Spinner"
import Document from "./Document"
import Website from "./Website"
import Text from "./Text"

// Define the interface for the base object
interface Base {
  created_at: string;
  id: number;
  name: string;
  unique_id: string;
  user_id: number;
}

const KnowledgeBaseForm = ({ baseId }) => {
  const t = useTranslations('knowledge');
  const toa = useTranslations('toast');
  const router = useRouter();
  const [value, setValue] = useState(0)
  const [nameInputValue, setNameInputValue] = useState("")
  const [oldName, setOldName] = useState("")
  const [documents, setDocuments] = useState([])
  const [files, setFiles] = useState([])
  const [urls, setUrls] = useState([])
  const [questionAnswers, setQuestionAnswers] = useState([])
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [length, setLength] = useState(0);
  const [base, setBase] = React.useState<Base>({
    created_at: "",
    id: 0,
    name: "",
    unique_id: "",
    user_id: 0,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const documentRef = useRef([]);
  const filesRef = useRef([]);
  const urlsRef = useRef([]);
  const qaRef = useRef([]);

  let newBaseId = baseId;

  React.useEffect(() => {
    // Use a local variable instead of modifying the parameter directly
    if (!newBaseId) {
      const storedBaseId = localStorage.getItem('lastBaseId');
      newBaseId = storedBaseId;
    } else {
      localStorage.setItem('lastBaseId', newBaseId);
    }
  }, [baseId]);
  React.useEffect(() => {
    localStorage.setItem('isSaved', 'false');
    if (newBaseId !== "-1") {
      const fetchData = async () => {
        if (newBaseId && newBaseId !== "-1") {
          setIsLoading(true);
          try {
            const requestOptions = {
              headers: new Headers({
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': "1",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              })
            };
            const response = await fetch(`${AUTH_API.GET_KNOWLEDGE_BASE}?baseId=${newBaseId}`, requestOptions);
            setExpiryTime();
            const data = await response.json();
            if(data.msg ==="Token has expired"){
              router.push("/signin")
            }
            setBase(data.base || {
              created_at: "",
              id: 0,
              name: "",
              unique_id: "",
              user_id: 0,
            });
            setNameInputValue(data.base.name)
            setOldName(data.base.name)
            setDocuments(data.documents || []);
            documentRef.current = data.documents;
            filesRef.current = []
            setUrls(data.websites || []);
            urlsRef.current = data.websites;
            setQuestionAnswers(data.texts || []);
            qaRef.current = data.texts;
          } catch (error) {
           
            if (error.response) {
              console.log('Error status code:', error.response.status);
              console.log('Error response data:', error.response.data);
             
              if (error.response.status === 401) {
                toast.error(toa('Session_Expired_Please_log_in_again'), { position: toast.POSITION.TOP_RIGHT });
  
                router.push("/signin")
              }
              // Handle the error response as needed
            } else if (error.request) {
              // The request was made but no response was received
              console.log('Error request:', error.request);
              toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });

            } else {
              console.log(error.msg)              
              // Something happened in setting up the request that triggered an Error
              console.log('Error message:', error.msg);
              toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });

            }
            setIsLoading(false)
          }

          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  React.useEffect(() => {
    // Update the local state when the base object changes
    setIsSaved(false);
  }, [nameInputValue]);

  const handleSubmit = async () => {
    toast.dismiss() // Dismiss any existing toasts
    if (nameInputValue === "") {
      toast.error(toa('Please_input_the_name'), { 
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      })
      return
    }

    if (documents.length === 0 && urls.length === 0 && questionAnswers.length === 0) {
      toast.error(toa('Please_input_the_data'), { 
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      })
      return
    }
    
    const userID = localStorage.getItem("userID")
    const formData = new FormData()
    formData.append("name", nameInputValue)
    console.log("Old --->", documentRef.current.length)
    const updatedDocs = documents.filter(doc => !documentRef.current.includes(doc));
    console.log("The length of the updated docs=--=---", updatedDocs.length)
    formData.append("docs", JSON.stringify(updatedDocs));
    const updatedFiles = files.filter(file => !filesRef.current.includes(file));
    console.log("The length of the updated files=--=---", files.length)
    updatedFiles.forEach(doc => formData.append("files", doc))
    const updatedUrls = urls.filter(url => !urlsRef.current.includes(url));
    console.log("The length of the updated URLs=--=---", updatedUrls.length)
    console.log("Upadated URL---> ", updatedUrls)
    formData.append("urls", JSON.stringify(updatedUrls))
    const updatedQa = questionAnswers.filter(qa => !qaRef.current.includes(qa));
    formData.append("qa", JSON.stringify(updatedQa));
    formData.append("userID", userID)
    if(updatedFiles.length + updatedQa.length + updatedUrls.length ===0 && oldName === nameInputValue) return
    // if(length === (updatedDocs.length + updatedFiles.length + updatedQa.length + updatedUrls.length))
    //   {setIsSaved(true);localStorage.setItem('isSaved', 'true')}
    // else {setIsSaved(false);setIsSaving(true); localStorage.setItem('isSaved', 'false')}
    // setLength(updatedDocs.length + updatedFiles.length + updatedQa.length + updatedUrls.length);
    setIsSaving(true)
    try {
      let API = ""
      if (newBaseId === "-1") {
        API = AUTH_API.UPLOAD_DOCUMENT
      } else {
        API = `${AUTH_API.UPDATE_KNOWLEDGE_BASE}`
        formData.append("unique_id", base.unique_id);
      }
      const response = await axios.post(API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': "1",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.status === 200) {
        documentRef.current = documents;
        filesRef.current = files;
        urlsRef.current = urls;
        qaRef.current = questionAnswers;
        let badAlert = ""
        if (!response.data.bad_url) {
          badAlert = "The knowledge base includes invalid url."
        }
        // setIsSaved(true);
        localStorage.setItem('isSaved', 'true')
        setIsSaving(false)
        setIsSaved(true);
        setExpiryTime();

        toast.success(`${toa('Successfully_updated')} ${badAlert}`, { 
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
        })
      }
    } catch (error) {
      setIsSaving(false)
      // setIsSaved(false);
      setExpiryTime();
      localStorage.setItem('isSaved', 'true')
      if (error.response) {
        console.log('Error status code:', error.response.status);
        console.log('Error response data:', error.response.data);
        if (error.response.status && error.response.status === 401) {
  
          toast.error(toa('Session_Expired'), { 
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
          })
          router.push("/signin")
        }
        if (error.response.status && error.response.status === 403) {
  
          toast.error(toa('Need_Ugrade'), { 
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
          })    
        }
        else if (error.response.status && error.response.status === 504) {
  
          toast.error(toa('It_takes_too_much_time_to_retrieve_information_from_your_document'), { 
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
          })
        }
        // Handle the error response as needed
      } else if (error.request) {

        // The request was made but no response was received
        console.log('Error request:', error.request.status);
      } else {

          toast.error(`${toa('Busy_Network_Try_again')}`, { 
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
          })
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }

    }
  };

  if (isLoading) {
    return <div>{t('Loading')}</div>;
  }

  return (
    <div
      className="relative flex h-full flex-col flex-grow sm:w-[90%] w-full mx-auto sm:p-5"
    >
      <div className="bg-none w-full rounded-lg flex items-center gap-3 mb-5">
        <button type="button" aria-label="back" className="bg-[#F4F4F4] text-[#767676] font-[300] p-3 rounded-md" onClick={() => router.push("/knowledge")}>
          <FaArrowLeft />
        </button>

        <h3 className="text-lg font-bold">{newBaseId !== "-1" ? t('Edit_Knowledge_Base') : t('Create_Knowledge_Base')}</h3>
      </div>
      <div className="bg-none w-full rounded-lg flex flex-col mt-1 border border-[#CFCFCF]">
        <div className="flex flex-col w-full items-center">
          <input
            className="w-full rounded-lg py-4 px-7 text-xl font-bold border-none focus:ring-0"
            type="text"
            value={nameInputValue}
            placeholder={t('Enter_name_of_new_knowledge_base')}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
          <hr className="w-full" />
        </div>
        <div className="w-full flex flex-col justify-between my-5 overflow-x-auto">

          <ul
            className="flex justify-start gap-7 ml-7"
          >
            <button type="button" className={`${value === 0 && "border-b-2 text-[#A536FA]"} border-[#A536FA] py-3 cursor-pointer`} onClick={() => setValue(0)}>{t('Document')}</button>
            <button type="button" className={`${value === 1 && "border-b-2 text-[#A536FA]"} border-[#A536FA] py-3 cursor-pointer`} onClick={() => setValue(1)}>{t('Website')}</button>
            <button type="button" className={`${value === 2 && "border-b-2 text-[#A536FA]"} border-[#A536FA] py-3 cursor-pointer`} onClick={() => setValue(2)}>{t('Questions_Answers')}</button>
          </ul>
          <hr className="w-full" />

        </div>
        <div className="w-full sm:mb-7 mb-3">
          {value === 0 && <Document documents={documents} documentRef={documentRef} setDocuments={setDocuments} setFiles={setFiles} setIsSaved={setIsSaved} />}
          {value === 1 && <Website urls={urls} setUrls={setUrls} websiteRef={urlsRef} setIsSaved={setIsSaved}/>}
          {value === 2 && <Text questionAnswers={questionAnswers} setQuestionAnswers={setQuestionAnswers} setIsSaved={setIsSaved}/>}
        </div>
        <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-end gap-5 sm:px-7 px-3 sm:pb-7 pb-3">
          <button
            type="button"
            className="bg-[url('/images/button-bg-white.png')] max-sm:bg-[length:100%_40px] bg-[length:160px_40px] rounded-md bg-center bg-no-repeat max-sm:w-full w-[160px] h-[40px] text-[#A536FA] font-bold"
            onClick={() => router.push(`/knowledge`)}
          >
            {t('Cancel')}
          </button>
          <button
            type="button"
            className="bg-[#A536FA] max-sm:w-full w-[160px] h-[40px] text-white font-bold rounded-md"

            onClick={isSaving || isSaved ? () => {console.log("isSaving", isSaving, "isSaved", isSaved)} : handleSubmit}
          >
            {isSaving? <Spinner color=""/>:t('Save')}
          </button>
        </div>

      </div>
    </div>
  )
}

export default KnowledgeBaseForm
