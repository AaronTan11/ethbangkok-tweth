"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, MessageSquare, FileText, Shield, Users, Send } from 'lucide-react'
import { ChatView, ChatUIProvider, darkChatTheme, MODAL_POSITION_TYPE } from "@pushprotocol/uiweb";

export default function DealRoom() {
  const [message, setMessage] = useState("")
  const handleCompareOffer = async () => {
    try {
      const dealRoomService = new DealRoomService(window.ethereum);
      const result = await dealRoomService.compareOffer(params.id, offerAmount);
      
      if (result) {
        // Offer is acceptable
        console.log("Offer is acceptable!");
      } else {
        // Offer is too low
        console.log("Offer is too low!");
      }
    } catch (error) {
      console.error("Error comparing offer:", error);
    }
  };
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Project Alpha</h2>
          <Badge variant="outline" className="flex items-center">
            <Shield className="text-green-500 mr-2 h-4 w-4" />
            Secure
          </Badge>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="chat">
              <MessageSquare className="mr-2 h-4 w-4" /> Chat
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="mr-2 h-4 w-4" /> Video Call
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" /> Documents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Encrypted Chat</CardTitle>
              </CardHeader>
              <CardContent className="h-[30rem]">
                 <ChatView
                      chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
                      limit={10}
                      isConnected={true}
                      verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
                  />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Video Call</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded flex items-center justify-center">
                  <Video className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-center mt-4">
                  <Button className="mr-2">Start Call</Button>
                  <Button variant="outline">Invite Participant</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Shared Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {["Contract.pdf", "NDA.docx", "Term Sheet.xlsx"].map((doc) => (
                    <Card key={doc}>
                      <CardContent className="flex items-center p-4">
                        <FileText className="h-8 w-8 mr-4" />
                        <div>
                          <div className="font-semibold">{doc}</div>
                          <div className="text-sm text-muted-foreground">Last modified: 2 days ago</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button className="mt-4">
                  <FileText className="mr-2 h-4 w-4" /> Upload New Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-64 border-l border-border p-4">
        <h3 className="text-xl font-bold mb-4">Participants</h3>
        <div className="space-y-4">
          {["Alice (You)", "Bob"].map((user) => (
            <div key={user} className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user}`} />
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
              <span>{user}</span>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4">
          <Users className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </div>
    </div>
  )
}