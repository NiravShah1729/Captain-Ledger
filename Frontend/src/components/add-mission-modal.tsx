import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Mission, User } from "../lib/types";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";

interface AddMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mission: Omit<Mission, "_id" | "createdAt" | "updatedAt">) => void;
  users: User[];
}

export default function AddMissionModal({
  isOpen,
  onClose,
  onSubmit,
  users,
}: AddMissionModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "ongoing",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit({
      ...data,
      status: data.status as "ongoing" | "completed" | "failed" | "martyred",
      assignedTo: selectedUsers,
    });
    form.reset();
    setSelectedUsers([]);
  });

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#161B22] text-white border-gray-800 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-wide">
            Add New Mission
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Mission title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Mission Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter mission title"
                      className="bg-[#0D1117] border-gray-700 focus:border-[#E23636] text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#DC3545]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter mission details"
                      className="bg-[#0D1117] border-gray-700 focus:border-[#E23636] text-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#DC3545]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#0D1117] border-gray-700 focus:border-[#E23636] text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0D1117] border-gray-700 text-white">
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="martyred">Martyred</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#DC3545]" />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label className="text-gray-300">Assign To</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-[#0D1117] border-gray-700 text-white hover:bg-[#161B22] hover:text-white"
                  >
                    Select team members
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-[#0D1117] border-gray-700 text-white">
                  <Command className="bg-transparent">
                    <CommandInput
                      placeholder="Search team members..."
                      className="text-white"
                    />
                    <CommandList>
                      <CommandEmpty>No team member found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => {
                          const isSelected = selectedUsers.some(
                            (selectedUser) => selectedUser._id === user._id
                          );
                          return (
                            <CommandItem
                              key={user._id}
                              value={user.name}
                              onSelect={() => {
                                if (isSelected) {
                                  setSelectedUsers(
                                    selectedUsers.filter(
                                      (selectedUser) =>
                                        selectedUser._id !== user._id
                                    )
                                  );
                                } else {
                                  setSelectedUsers([...selectedUsers, user]);
                                }
                              }}
                              className={cn(
                                "flex items-center gap-2 text-white",
                                isSelected ? "bg-[#E23636]/20" : ""
                              )}
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                />
                                <AvatarFallback className="bg-[#E23636] text-white text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  isSelected ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUsers.map((user) => (
                    <Badge
                      key={user._id}
                      className="bg-[#0D1117] text-white hover:bg-[#0D1117]/80 pl-1 pr-1.5 py-1 flex items-center gap-1"
                    >
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-[#E23636] text-white text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeUser(user._id)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-white hover:bg-[#0D1117] hover:text-white bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#E23636] hover:bg-[#c42b2b] text-white"
              >
                Create Mission
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
