"use client";

import { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import MissionCard from "../components/mission-card";
import AddMissionModal from "../components/add-mission-modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Mission() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [missions, setMissions] = useState([
    {
      _id: "1",
      title: "Operation: Ultron Cleanup",
      description: "Secure and dispose of remaining Ultron tech in Sokovia.",
      status: "ongoing",
      assignedTo: [
        {
          _id: "1",
          name: "Tony Stark",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          _id: "2",
          name: "Bruce Banner",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-20"),
    },
    {
      _id: "2",
      title: "Infinity Stone Research",
      description:
        "Study the properties of recovered infinity stone fragments.",
      status: "completed",
      assignedTo: [
        {
          _id: "3",
          name: "Stephen Strange",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          _id: "4",
          name: "Shuri",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-09-05"),
      updatedAt: new Date("2023-09-25"),
    },
    {
      _id: "3",
      title: "Hydra Base Infiltration",
      description: "Gather intel on suspected Hydra operations in Budapest.",
      status: "failed",
      assignedTo: [
        {
          _id: "5",
          name: "Natasha Romanoff",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          _id: "6",
          name: "Clint Barton",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-08-12"),
      updatedAt: new Date("2023-08-15"),
    },
    {
      _id: "4",
      title: "Battle of New York Memorial",
      description:
        "Establish memorial for those lost during the Chitauri invasion.",
      status: "completed",
      assignedTo: [
        {
          _id: "7",
          name: "Steve Rogers",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-07-04"),
      updatedAt: new Date("2023-07-10"),
    },
    {
      _id: "5",
      title: "Asgardian Refugee Settlement",
      description: "Coordinate housing and resources for Asgardian refugees.",
      status: "ongoing",
      assignedTo: [
        {
          _id: "8",
          name: "Thor Odinson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          _id: "9",
          name: "Valkyrie",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-11-01"),
      updatedAt: new Date("2023-11-05"),
    },
    {
      _id: "6",
      title: "Vormir Sacrifice Investigation",
      description: "Investigate the soul stone exchange on Vormir.",
      status: "martyred",
      assignedTo: [
        {
          _id: "10",
          name: "Gamora",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      createdAt: new Date("2023-05-20"),
      updatedAt: new Date("2023-05-21"),
    },
  ]);

  const currentUser = {
    _id: "1",
    name: "Tony Stark",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const mockUsers = [
    {
      _id: "1",
      name: "Tony Stark",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "2",
      name: "Bruce Banner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "3",
      name: "Stephen Strange",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    { _id: "4", name: "Shuri", avatar: "/placeholder.svg?height=40&width=40" },
    {
      _id: "5",
      name: "Natasha Romanoff",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "6",
      name: "Clint Barton",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "7",
      name: "Steve Rogers",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "8",
      name: "Thor Odinson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "9",
      name: "Valkyrie",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "10",
      name: "Gamora",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const filteredMissions = missions.filter((mission) => {
    const matchesTab = activeTab === "all" || mission.status === activeTab;
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sortOrder === "newest") return b.createdAt - a.createdAt;
    if (sortOrder === "oldest") return a.createdAt - b.createdAt;
    if (sortOrder === "alphabetical") return a.title.localeCompare(b.title);
    return 0;
  });

  const handleAddMission = (mission) => {
    const newMission = {
      ...mission,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMissions([...missions, newMission]);
    setIsAddModalOpen(false);
  };

  const handleStatusChange = (missionId, newStatus) => {
    setMissions(
      missions.map((mission) =>
        mission._id === missionId
          ? { ...mission, status: newStatus, updatedAt: new Date() }
          : mission
      )
    );
  };

  return (
    <>
      <Navbar
        currentUserName={currentUser?.name || "GUEST"}
        showNavbar={true}
        isLoggedIn={true}
        isAdmin={true}
        onNavAttempt={() => {}}
      />
      <div className="pt-[133px]"></div>
      <div className="min-h-screen bg-[#0D1117] text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/80 to-[#0D1117] z-10"></div>
            <div className="w-full h-full bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-5xl md:text-7xl tracking-wider text-center mb-2 font-bebas text-[#ED1D24]">
              MISSIONS
            </h1>
            <p className="text-center text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto font-bebas">
              Track, Manage, and Assign Heroic Duties
            </p>
            <p className="text-center text-sm text-[#A0A0A0] mt-2">
              Logged in as:{" "}
              <span className="text-[#ED1D24] font-medium font-bebas">
                {currentUser?.name}
              </span>
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 z-20 bg-[#202020]/95 backdrop-blur-sm border-b border-[#2E2E2E] py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Tabs
                defaultValue="all"
                className="w-full md:w-auto"
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full md:w-auto grid grid-cols-5 bg-[#2E2E2E]">
                  <TabsTrigger
                    value="all"
                    className="font-bebas text-[#FFFFFF] data-[state=active]:text-[#ED1D24]"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="ongoing"
                    className="font-bebas text-[#FFFFFF] data-[state=active]:text-[#ED1D24]"
                  >
                    Ongoing
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="font-bebas text-[#FFFFFF] data-[state=active]:text-[#ED1D24]"
                  >
                    Completed
                  </TabsTrigger>
                  <TabsTrigger
                    value="failed"
                    className="font-bebas text-[#FFFFFF] data-[state=active]:text-[#ED1D24]"
                  >
                    Failed
                  </TabsTrigger>
                  <TabsTrigger
                    value="martyred"
                    className="font-bebas text-[#FFFFFF] data-[state=active]:text-[#ED1D24]"
                  >
                    Martyred
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A0]" />
                  <Input
                    placeholder="Search missions..."
                    className="pl-8 bg-[#2E2E2E] border-[#2E2E2E] focus:border-[#ED1D24] text-[#FFFFFF] placeholder-[#A0A0A0]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#2E2E2E] border-[#2E2E2E] text-[#FFFFFF] hover:bg-[#ED1D24] hover:text-[#FFFFFF]"
                    >
                      Sort by
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#2E2E2E] border-[#2E2E2E] text-[#FFFFFF]">
                    <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                      Oldest
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortOrder("alphabetical")}
                    >
                      Alphabetical
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMissions.map((mission) => (
              <MissionCard
                key={mission._id}
                mission={mission}
                currentUser={currentUser}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {sortedMissions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#A0A0A0] text-lg font-bebas">
                No missions found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Add Mission Button */}
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#ED1D24] hover:bg-[#A0A0A0] shadow-lg"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add new mission</span>
        </Button>

        {/* Add Mission Modal */}
        <AddMissionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddMission}
          users={mockUsers}
        />
      </div>
      <Footer />
    </>
  );
}
