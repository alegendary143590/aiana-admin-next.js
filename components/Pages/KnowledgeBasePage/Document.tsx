import React from "react";
import Image from "next/image"
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";

import { AUTH_API } from "@/components/utils/serverURL";
import AlertDialog from "@/components/AlertDialog";
import { formatDateStringOnly } from "@/components/utils/common"
import { useTranslation } from "react-i18next";



const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

const Document = ({ documents, documentRef, setDocuments, setFiles }) => {
  const { t } = useTranslation('knowledge');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [id, setId] = React.useState("");
  const [index, setIndex] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    console.log("Documents: ", documents);
  }, [documents]);

  const handleDocumentChanged = (event) => {
    const fileList = event.target.files;
    const validFiles = [];


    for (let i = 0; i < fileList.length; i += 1) {
      if (fileList[i].size <= MAX_FILE_SIZE) {
        validFiles.push(fileList[i]);
      } else {
        toast.error(
          `File "${fileList[i].name}" exceeds the maximum size of 5MB.`,
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
    }
    setFiles(validFiles); // Only set valid files
    const newDocs = validFiles.map((file: File) => ({
      created_at: new Date().toISOString(),
      filename: file.name,
      id: uuidv4(),
      type: file.type,
      unique_id: "",
    }))
    setDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (_id, _index) => {
    setId(_id);
    setIndex(_index);
    const documentsArray = documentRef.current;

    // Check if any document in the array has an ID matching _id
    const documentExists = documentsArray.some(doc => doc.id === _id);
    if (documentExists) {
      setOpenDialog(true);

    } else {
      setDocuments(documents.filter(doc => doc.id !== _id));
    }
  }

  const handleDeleteDocument = () => {

    axios
      .post(AUTH_API.DELETE_DOCUMENT, { id },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
            'ngrok-skip-browser-warning': "1",
          }
        })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Successfully deleted!", { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.error("Invalid Request!", { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error status code:', error.response.status);
          console.log('Error response data:', error.response.data);
          if (error.response.status === 401) {
            toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });

            router.push("/signin")
          }
          // Handle the error response as needed
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error request:', error.request);
          toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });

        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });

        }
      });
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);

  };

  const handleAgree = () => {
    setOpenDialog(false);
    handleDeleteDocument();
  }

  const handleDisagree = () => {
    setOpenDialog(false);
  }



  return (
    <div className="w-full overflow-y-auto">
      <div className="text-center bg-[#F5E8FF] py-2 sm:mx-7 mx-3">
        <span className="text-[#343434] text-sm text-center">
          <FaInfoCircle className="text-[#A536FA] size-5 inline-block mr-3" />
          {t('Note: Build your Chatbot’s Knowledge Base by uploading documents. These documents train your chatbot to answer questions accurately.')}
        </span>
      </div>

      <div className="flex justify-center items-center my-5 sm:mx-7 mx-3">
        <label
          htmlFor="file_upload"
          className="bg-transparent text-gray-600 rounded-md w-full flex flex-col h-[150px] cursor-pointer items-center justify-center border-dashed border-2 border-gray-200"
        >
          <Image src="/images/icon_file_upload.svg" alt="icon_file_upload" width={50} height={50} />
          <p className="font-bold text-black text-[16px] text-center">
            {t('Drop files here or click to upload')}
          </p>
          <p className="text-[#767676] max-sm:hidden text-sm text-center">
            {t("Upload files in formats (PDF, DOC(X), TXT) with a maximum size of 5MB.")}
          </p>
          <p className="text-[#767676] font-bold text-center text-sm">{t("Please do not upload any confidential data.")}</p>

        </label>
        <input
          type="file"
          id="file_upload"
          accept=".pdf,.txt,.docx"
          onChange={handleDocumentChanged}
          multiple
          style={{ display: "none" }}
        />
      </div>
      <div>
        <div className="w-full justify-between flex my-5 sm:px-7 px-3">
          <h4 className="text-lg font-bold">{t('Uploaded files')}</h4>
          <p className="text-[#767676] text-sm">{documents.length} {t('files uploaded')}</p>
        </div>
        <div className="overflow-auto">
          <table className="min-w-max w-full whitespace-nowrap">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-left text-[#767676] border-b-2">
                <th className="sm:px-7 px-3 py-2">{t('FILENAME')}</th>
                <th className="sm:px-7 px-3 py-2">{t('TYPE')}</th>
                <th className="sm:px-7 px-3 py-2">{t('UPLOADED ON')}</th>
                <th className="sm:px-7 px-3 py-2">{t('ACTION')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc, i) => (
                <tr key={doc.id}>
                  <td className="sm:px-7 px-3 py-2">{doc.filename}</td>
                  <td className="sm:px-7 px-3 py-2">
                    {(() => {
                      switch (doc.type) {
                        case "text/plain":
                        case ".txt":
                          return <Image src="/images/icon_txt.svg" alt="Text Document" width={20} height={20} className="ml-2" />;
                        case "application/pdf":
                        case ".pdf":
                          return <Image src="/images/icon_pdf.svg" alt="PDF Document" width={20} height={20} className="ml-2" />;
                        default:
                          return <Image src="/images/icon_doc.svg" alt="Other Document" width={20} height={20} className="ml-2" />;
                      }
                    })()}
                  </td>
                  <td className="sm:px-7 px-3 py-2">{formatDateStringOnly(doc.created_at)}</td>
                  <td className="sm:px-7 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id, i)}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9] size-9 pt-1 rounded-md flex justify-center items-center"
                    >
                      <Image src="/images/icon_trash.svg" alt="icon_trash" width={18} height={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <AlertDialog
        title="Confirm Delete"
        description="Are you sure you want to delete this item? This action cannot be undone."
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        open={openDialog}
        setOpen={setOpenDialog}
      />
      <ToastContainer />
    </div>
  )
}

export default Document
