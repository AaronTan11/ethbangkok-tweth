"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { DealRoomService } from './deal-room/[id]/DealRoomService'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export function CreateRoomDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    participantAddress: '',
    dealValue: '',
    minPrice: '',
    features: {
      video: true,
      chat: true,
      documents: true
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!window.ethereum) {
      toast.error("Please install a Web3 wallet like MetaMask");
      return;
    }
    
    try {
      setIsLoading(true);
      const dealRoomService = new DealRoomService(window.ethereum);
      
      const receipt = await dealRoomService.createRoom(
        formData.name,
        formData.participantAddress,
        formData.dealValue,
        formData.minPrice
      );
      
      console.log("Room created:", receipt);
      toast.success("Deal room created successfully!");
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        participantAddress: '',
        dealValue: '',
        minPrice: '',
        features: {
          video: true,
          chat: true,
          documents: true
        }
      });
      
      setOpen(false);
      
      // Refresh the rooms list
      router.refresh();
      
    } catch (error) {
      console.log("Error creating room:", error);
      toast.error(error.message || "Failed to create deal room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>Create New Deal Room</DialogTitle>
          <DialogDescription>
            Enter the details for your new deal room.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <Label htmlFor="name">Room Name *</Label>
            <Input 
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter room name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter room description"
            />
          </div>

          {/* Participant */}
          <div className="space-y-2">
            <Label htmlFor="participantAddress">Participant Wallet Address *</Label>
            <Input 
              id="participantAddress"
              value={formData.participantAddress}
              onChange={(e) => setFormData({...formData, participantAddress: e.target.value})}
              placeholder="0x..."
              required
            />
          </div>

          {/* Deal Value */}
          <div className="space-y-2">
            <Label htmlFor="dealValue">Deal Value (ETH) *</Label>
            <Input 
              id="dealValue"
              type="number"
              step="0.01"
              value={formData.dealValue}
              onChange={(e) => setFormData({...formData, dealValue: e.target.value})}
              placeholder="Enter deal value"
              required
            />
          </div>

          {/* Minimum Price */}
          <div className="space-y-2">
            <Label htmlFor="minPrice">Minimum Acceptable Price (ETH) *</Label>
            <Input 
              id="minPrice"
              type="number"
              step="0.01"
              value={formData.minPrice}
              onChange={(e) => setFormData({...formData, minPrice: e.target.value})}
              placeholder="Enter minimum price"
              required
            />
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Label>Features</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="video"
                  checked={formData.features.video}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData, 
                      features: {...formData.features, video: checked}
                    })
                  }
                />
                <Label htmlFor="video">1:1 Video Calls</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="chat"
                  checked={formData.features.chat}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData, 
                      features: {...formData.features, chat: checked}
                    })
                  }
                />
                <Label htmlFor="chat">Private Chat</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="documents"
                  checked={formData.features.documents}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData, 
                      features: {...formData.features, documents: checked}
                    })
                  }
                />
                <Label htmlFor="documents">Document Sharing</Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Room"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}