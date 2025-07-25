import { formatDistanceToNow } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Mission, User } from "@/lib/types"

interface MissionCardProps {
  mission: Mission
  currentUser: User
  onStatusChange: (missionId: string, newStatus: Mission["status"]) => void
}

export default function MissionCard({ mission, currentUser, onStatusChange }: MissionCardProps) {
  // Check if current user is assigned to this mission
  const isAssigned = mission.assignedTo.some((user) => user._id === currentUser._id)

  // Status badge styling
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-[#FFD700] text-black hover:bg-[#FFD700]/80"
      case "completed":
        return "bg-[#28A745] hover:bg-[#28A745]/80"
      case "failed":
        return "bg-[#DC3545] hover:bg-[#DC3545]/80"
      case "martyred":
        return "bg-[#6C757D] hover:bg-[#6C757D]/80"
      default:
        return ""
    }
  }

  // Format status for display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get available status options (excluding current status)
  const getStatusOptions = (currentStatus: Mission["status"]) => {
    const allStatuses: Mission["status"][] = ["ongoing", "completed", "failed", "martyred"]
    return allStatuses.filter((status) => status !== currentStatus)
  }

  return (
    <div className="bg-[#161B22] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl tracking-wide text-white flex-1 mr-2">{mission.title}</h3>
          <div className="flex items-center gap-2">
            {isAssigned ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge className={`${getBadgeVariant(mission.status)} font-medium cursor-pointer hover:opacity-80`}>
                    {formatStatus(mission.status)}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161B22] border-gray-700 text-white">
                  {getStatusOptions(mission.status).map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => onStatusChange(mission._id, status)}
                      className="hover:bg-[#E23636]/20 focus:bg-[#E23636]/20"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            status === "ongoing"
                              ? "bg-[#FFD700]"
                              : status === "completed"
                                ? "bg-[#28A745]"
                                : status === "failed"
                                  ? "bg-[#DC3545]"
                                  : "bg-[#6C757D]"
                          }`}
                        />
                        Mark as {formatStatus(status)}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Badge className={`${getBadgeVariant(mission.status)} font-medium`}>{formatStatus(mission.status)}</Badge>
            )}
          </div>
        </div>

        {isAssigned && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs text-[#E23636] border-[#E23636]/50 bg-[#E23636]/10">
              You are assigned
            </Badge>
          </div>
        )}

        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">{mission.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {mission.assignedTo.slice(0, 3).map((user) => (
              <Avatar
                key={user._id}
                className={`border-2 border-[#161B22] h-8 w-8 ${
                  user._id === currentUser._id ? "ring-2 ring-[#E23636] ring-offset-2 ring-offset-[#161B22]" : ""
                }`}
              >
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-[#E23636] text-white text-xs">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            ))}
            {mission.assignedTo.length > 3 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 border-2 border-[#161B22] text-xs text-white">
                +{mission.assignedTo.length - 3}
              </div>
            )}
          </div>

          <span className="text-xs text-gray-500">{formatDistanceToNow(mission.createdAt, { addSuffix: true })}</span>
        </div>
      </div>

      <div className="border-t border-gray-800 p-3">
        <Button
          variant="ghost"
          className="w-full justify-between text-[#E23636] hover:text-white hover:bg-[#E23636]/10"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
