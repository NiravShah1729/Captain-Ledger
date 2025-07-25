import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "../lib/utils";

const statusConfig = {
  ongoing: {
    color: "bg-status-ongoing text-black",
    label: "ONGOING",
  },
  completed: {
    color: "bg-status-completed text-white",
    label: "COMPLETED",
  },
  failed: {
    color: "bg-status-failed text-white",
    label: "FAILED",
  },
  martyred: {
    color: "bg-status-martyred text-white",
    label: "MARTYRED",
  },
};

export function MissionCard({ mission, onViewDetails }) {
  const status = statusConfig[mission.status] || statusConfig.ongoing;
  const createdDate = new Date(mission.createdAt).toLocaleDateString();

  return (
    <div className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-card-glow transition-all duration-300 hover:border-primary/30">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge
          className={cn(
            "px-3 py-1 text-xs font-bold font-bebas tracking-wider",
            status.color
          )}
        >
          {status.label}
        </Badge>
        <div className="flex items-center text-xs text-muted-foreground gap-1">
          <Clock className="h-3 w-3" />
          {createdDate}
        </div>
      </div>

      {/* Mission Title */}
      <h3 className="font-bebas text-xl text-foreground mb-2 tracking-wide">
        {mission.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {mission.description}
      </p>

      {/* Assigned Users */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            ASSIGNED TO:
          </span>
          <div className="flex -space-x-2">
            {mission.assignedTo.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                className="h-7 w-7 border-2 border-background"
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {mission.assignedTo.length > 3 && (
              <div className="h-7 w-7 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{mission.assignedTo.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(mission)}
          className="text-primary hover:text-primary-foreground hover:bg-primary font-medium"
        >
          <Eye className="h-4 w-4" />
          VIEW
        </Button>
      </div>
    </div>
  );
}
