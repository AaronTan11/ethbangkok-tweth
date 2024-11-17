"use client";
import { ChatView, ChatUIProvider, darkChatTheme, MODAL_POSITION_TYPE } from "@pushprotocol/uiweb";


export default function ChatPage() {
  // you can pass your own signer, if you don't pass a signer
  // then it will automatically use the default onboarding kit i.e. blocknative
  // !pgpPrivatekey && !account && !isConnected => will give the note
  return (
      <ChatView
        chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
        limit={10}
        isConnected={true}
        verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
      />

  );
}