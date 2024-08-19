import React, { useState } from "react"
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Text = ({ questionAnswers, setQuestionAnswers }) => {
  const { t } = useTranslation('knowledge');
  const [questionInputValue, setQuestionInputValue] = useState("")
  const [answerInputValue, setAnswerInputValue] = useState("")


  const handleQAAdd = () => {
    if (questionInputValue.trim() !== "" && answerInputValue.trim() !== "") {
      setQuestionAnswers([
        ...questionAnswers,
        { question: questionInputValue, answer: answerInputValue },
      ])
      setQuestionInputValue("")
      setAnswerInputValue("")
    } else {
      toast.error("Question and Answer are required!", { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const handleDeleteQA = (index) => {
    const updatedQuestionAnswers = questionAnswers.filter((_, i) => i !== index)
    setQuestionAnswers(updatedQuestionAnswers)
  }

  return (
    <div className="w-full overflow-y-auto">
      <div className="text-center bg-[#F5E8FF] py-2 sm:mx-7 mx-3">
        <span className="text-[#343434] text-sm text-center">
          <FaInfoCircle className="text-[#A536FA] size-5 inline-block mr-3" />
          {t('Note: Build your Chatbot’s Knowledge Base by uploading urls. The content of these web pages will be used by your chatbot to answer questions accurately.')}
        </span>
      </div>
      <div className="flex max-md:flex-col">
        <div className="w-full md:inline-flex justify-end flex-col p-10 max-md:space-y-5 flex-1">
          <p className="w-[100px] text-lg font-bold mb-2">{t('Question')}</p>
          <textarea
            value={questionInputValue}
            onChange={(e) => setQuestionInputValue(e.target.value)}
            className="w-full border border-[#D9D9D9] rounded-md"
            id="questionInput"
          />
          <p className="w-[100px] text-lg font-bold mt-5 mb-2">{t('Answer')}</p>
          <textarea
            value={answerInputValue}
            onChange={(e) => setAnswerInputValue(e.target.value)}
            className="w-full border border-[#D9D9D9] rounded-md h-32"
            id="answerInput"
          />
          <button className="bg-[#A438FA] ml-auto mt-5 px-2 py-2 text-white text-center rounded-md w-[150px]" type="button" onClick={handleQAAdd}>
            +{t('Add')}
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="w-full justify-between flex mb-5 mt-10 sm:px-7 px-3">
            <h4 className="text-lg font-bold">{t('Questions List')}</h4>
            <p className="text-[#767676] text-sm">{questionAnswers.length} {t('question added')}</p>
          </div>
          <div className="md:px-7 max-h-[300px] overflow-y-auto">
            {questionAnswers && questionAnswers.map((questionAnswer, i) =>
              // {`Q: ${qa.question} `} secondary={`A: ${qa.answer}
              <div key={questionAnswer.id}>
                <p className="text-[#070E0B] my-1"><i className="w-24 inline-block">#{t('Question')} {i + 1}:</i>{questionAnswer.question}
                  <button
                    type="button"
                    onClick={() => handleDeleteQA(i)}
                    className="focus:outline-none focus:ring-2 ml-2 focus:ring-blue-500 bg-[#F2E3FE] size-7 rounded-md inline-flex justify-center items-center"
                  >
                    <Image src="/images/icon_trash_1.svg" alt="trash_icon" width={15} height={15} />
                  </button>
                </p>
                <p className="text-[#070E0B] my-1"><i className="w-24 inline-block">#{t('Answer')} {i + 1}:</i>{questionAnswer.answer}</p>

              </div>
            )
            }
            {
              questionAnswers.length === 0 && (
                <div className="w-full text-center py-5">
                  <p className="text-[#767676]">{t('No question added yet')}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <ToastContainer />

    </div>
  )
}

export default Text
