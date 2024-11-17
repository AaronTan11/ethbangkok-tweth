"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Video, FileText, MessageSquare } from 'lucide-react'
import { CreateRoomDialog } from "./create-room-dialog"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DealRoomService } from './deal-room/[id]/DealRoomService'
import { toast } from "sonner"

export default function Dashboard() {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    if (!window.ethereum) {
      toast.error("Please install a Web3 wallet like MetaMask")
      return
    }

    try {
      setIsLoading(true)
      const dealRoomService = new DealRoomService(window.ethereum)
      const fetchedRooms = await dealRoomService.getAllRooms()
      setRooms(fetchedRooms)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      toast.error("Failed to fetch deal rooms")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-4">
        <h1 className="text-2xl font-bold mb-8">Secure Deal Room</h1>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Lock className="mr-2 h-4 w-4" /> My Deal Rooms
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Video className="mr-2 h-4 w-4" /> Video Calls
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" /> Documents
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Deal Rooms</h2>
          <CreateRoomDialog />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link 
                href={`/dashboard/deal-room/${room.id}`} 
                key={room.id}
                className="block transition-transform hover:scale-105"
              >
                <Card className="cursor-pointer hover:border-primary">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {room.name}
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          room.status === "active"
                            ? "bg-green-500 text-green-950"
                            : room.status === "pending"
                            ? "bg-yellow-500 text-yellow-950"
                            : "bg-blue-500 text-blue-950"
                        }`}
                      >
                        {room.status}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Created: {new Date(room.createdAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-4">
                      <p className="truncate">Creator: {room.creator}</p>
                      <p className="truncate">Participant: {room.participant}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                      {room.features.video && (
                        <Button variant="outline" size="icon" className="pointer-events-none">
                          <Video className="h-4 w-4" />
                        </Button>
                      )}
                      {room.features.chat && (
                        <Button variant="outline" size="icon" className="pointer-events-none">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                      {room.features.documents && (
                        <Button variant="outline" size="icon" className="pointer-events-none">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}