import React from 'react';
import { useRouter } from 'next/router';
import ChatBot from '@/components/ChatBot'; // Ensure Chatbot can accept props for customization

const ChatbotPage = () => {
  const router = useRouter();
  const { userIndex, botId, website } = router.query;
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ChatBot userIndex={userIndex} botId={botId} website={website} />
    </div>
  );
};

export default ChatbotPage;