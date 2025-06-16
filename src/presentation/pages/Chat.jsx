import AppLayout from "../layout/AppLayout/AppLayout";
import ChatWindow from "../components/Chat/ChatWindow/ChatWindow";

const Chat = () => {
  return (
    <AppLayout pageTitle="AI Financial Advisor Chat">
      <ChatWindow />
    </AppLayout>
  );
};

export default Chat;
