import React, { useState, useEffect, useRef } from "react"; // Import useRef
import {
  BellRing,
  Rocket,
  PlusCircle,
  Sparkles,
  Edit,
  Trash2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
// Dummy data for posts based on your schema
const initialPosts = [
  {
    _id: "1",
    title: "Urgent: New Mission Briefing - Operation Starlight!",
    content:
      "All available heroes are required for an immediate briefing on Operation Starlight. Report to HQ War Room by 0800 hours. This is a critical mission with high stakes. Prepare for deployment. The fate of the galaxy hangs in the balance, and every Avenger's unique skills will be crucial. Ensure your gear is prepped and communication lines are secure. Further details will be provided upon arrival. This mission requires absolute discretion and swift action. Failure is not an option.",
    type: "announcement",
    postedBy: "Tony Stark",
    createdAt: "2025-07-17T10:00:00Z",
    updatedAt: "2025-07-17T10:00:00Z",
  },
  {
    _id: "2",
    title: "Daily Training Regimen Update",
    content:
      "The new advanced combat training simulations are now available in Sector 7. All personnel are encouraged to participate to enhance their skills. See the training schedule for your assigned slots. These simulations are designed to push your limits and prepare you for any threat. Focus on teamwork and adapting to unexpected scenarios. Report any technical issues to the R&D department immediately.",
    type: "public",
    postedBy: "Steve Rogers",
    createdAt: "2025-07-16T14:30:00Z",
    updatedAt: "2025-07-16T14:30:00Z",
  },
  {
    _id: "3",
    title: "Community Outreach Initiative Success!",
    content:
      "Our recent community outreach event in New York was a massive success! Thanks to all heroes who participated and engaged with the public. Your efforts strengthen our bond with the citizens we protect. The positive feedback from the citizens has been overwhelming. We plan to expand these initiatives to other cities soon. Your presence truly makes a difference in fostering trust and goodwill.",
    type: "public",
    postedBy: "Bruce Banner",
    createdAt: "2025-07-15T09:15:00Z",
    updatedAt: "2025-07-15T09:15:00Z",
  },
  {
    _id: "4",
    title: "Reminder: Quarterly Performance Reviews",
    content:
      "Just a friendly reminder that quarterly performance reviews are scheduled for next week. Please ensure all mission logs and personal achievements are updated in the system by end of day Friday. These reviews are essential for tracking progress and identifying areas for development. Come prepared to discuss your contributions and future goals.",
    type: "announcement",
    postedBy: "Natasha Romanoff",
    createdAt: "2025-07-14T11:45:00Z",
    updatedAt: "2025-07-14T11:45:00Z",
  },
  {
    _id: "5",
    title: "New Recruits Orientation - Welcome!",
    content:
      "A warm welcome to our newest recruits! Your orientation program begins Monday at 0900 in the main auditorium. We're excited to have you join the ranks of Earth's mightiest heroes. This comprehensive program will cover essential protocols, combat techniques, and team integration. Embrace the challenge and learn from your mentors. The future of Earth depends on you.",
    type: "public",
    postedBy: "Thor Odinson",
    createdAt: "2025-07-13T16:00:00Z",
    updatedAt: "2025-07-13T16:00:00Z",
  },
];

function PostsPage() {
  // State for search queries
  const [searchByUser, setSearchByUser] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [allPosts, setAllPosts] = useState(initialPosts); // Holds all posts
  const [filteredPosts, setFilteredPosts] = useState(initialPosts); // State to hold filtered posts

  // State for new post form
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState("public"); // Default to 'public'
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login state
  const [isAdmin, setIsAdmin] = useState(true); // Simulate admin state for testing
  const [currentUserName, setCurrentUserName] = useState("NIRAV"); // Simulate current logged-in user name
  const [showPostForm, setShowPostForm] = useState(false); // State to control post form visibility

  // State for editing post
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostTitle, setEditedPostTitle] = useState("");
  const [editedPostContent, setEditedPostContent] = useState("");
  const [editedPostType, setEditedPostType] = useState("public");

  // Ref for the edit post form
  const editFormRef = useRef(null);

  // State for summary modal
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  // State for navbar animation
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State for toggling between All Posts and My Posts
  const [showMyPostsOnly, setShowMyPostsOnly] = useState(false);

  // Effect to filter posts whenever search queries, allPosts, isAdmin, or showMyPostsOnly changes
  useEffect(() => {
    const filterPosts = () => {
      let tempPosts = allPosts;

      // Filter by user
      if (searchByUser) {
        tempPosts = tempPosts.filter((post) =>
          post.postedBy.toLowerCase().includes(searchByUser.toLowerCase())
        );
      }

      // Filter by date
      if (searchByDate) {
        const searchDate = new Date(searchByDate).toDateString();
        tempPosts = tempPosts.filter(
          (post) => new Date(post.createdAt).toDateString() === searchDate
        );
      }

      // Filter by post type based on isAdmin status
      if (!isAdmin) {
        tempPosts = tempPosts.filter((post) => post.type === "public");
      }

      // Filter for My Posts section
      if (showMyPostsOnly) {
        tempPosts = tempPosts.filter(
          (post) => post.postedBy === currentUserName
        );
      }

      setFilteredPosts(tempPosts);
    };

    filterPosts();
  }, [
    searchByUser,
    searchByDate,
    allPosts,
    isAdmin,
    showMyPostsOnly,
    currentUserName,
  ]); // Dependencies for useEffect

  // Scroll to edit form when editingPostId changes (i.e., when edit dialog opens)
  useEffect(() => {
    if (editingPostId && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingPostId]);

  // Function to determine if current user can modify a post
  const canModifyPost = (post) => {
    return isAdmin || post.postedBy === currentUserName;
  };

  // Function to handle adding a new post
  const handleAddPost = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newPostTitle || !newPostContent) {
      alert("Please fill in both title and content."); // Using alert for simplicity, consider custom modal
      return;
    }

    const newPost = {
      _id: String(allPosts.length + 1), // Simple unique ID generation
      title: newPostTitle,
      content: newPostContent,
      type: newPostType,
      postedBy: currentUserName, // Use the current logged-in user's name
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAllPosts([newPost, ...allPosts]); // Add new post to the beginning of the list
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostType("public"); // Reset type to default
    setShowPostForm(false); // Close the form after posting
  };

  // Function to handle clicking the Edit button
  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditedPostTitle(post.title);
    setEditedPostContent(post.content);
    setEditedPostType(post.type);
    setShowPostForm(false); // Hide the create form if open
  };

  // Function to handle saving the edited post
  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!editedPostTitle || !editedPostContent) {
      alert("Please fill in both title and content for the edited post.");
      return;
    }

    setAllPosts(
      allPosts.map((post) =>
        post._id === editingPostId
          ? {
              ...post,
              title: editedPostTitle,
              content: editedPostContent,
              type: editedPostType,
              updatedAt: new Date().toISOString(),
            }
          : post
      )
    );

    setEditingPostId(null);
    setEditedPostTitle("");
    setEditedPostContent("");
    setEditedPostType("public");
  };

  // Function to handle canceling the edit
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedPostTitle("");
    setEditedPostContent("");
    setEditedPostType("public");
  };

  // Function to handle deleting a post
  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Using window.confirm for simplicity
      setAllPosts(allPosts.filter((post) => post._id !== id));
    }
  };

  // Function to handle summarizing a post using Gemini API
  const handleSummarizePost = async (content) => {
    setIsLoadingSummary(true);
    setSummaryError("");
    setSummaryContent(""); // Clear previous summary

    try {
      let chatHistory = [];
      const prompt = `Please provide a concise summary of the following text, focusing on the main points and key information. Keep the summary to a maximum of 3-4 sentences:\n\n${content}`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setSummaryContent(text);
      } else {
        setSummaryError("Failed to generate summary. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      setSummaryError("An error occurred while summarizing the post.");
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoadingSummary(false);
      setShowSummaryModal(true); // Show modal after attempt
    }
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    setSummaryContent("");
    setSummaryError("");
  };

  // Handle scroll for navbar animation
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scrolling down
      setShowNavbar(false);
    } else if (window.scrollY < lastScrollY) {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Re-run effect if lastScrollY changes

  return (
    <>
      {/* Global styles for font smoothing and Bebas Neue */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

          .font-smoothing-auto {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-[#2E2E2E] to-[#202020] font-['Bebas_Neue'] text-white font-smoothing-auto flex flex-col">
        {/* Header Section */}
        <Navbar
          currentUserName={currentUserName}
          showNavbar={showNavbar}
          activeTab="POSTS"
        />
        {/* Padding to prevent content from being hidden by fixed header */}
        <div className="pt-[133px]"></div>{" "}
        {/* Height of header: 51px + 41px + 41px = 133px */}
        {/* Image below Nav Bar */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src="https://placehold.co/1920x256/202020/FFFFFF?text=MARVEL+UNIVERSE"
            alt="Marvel Universe Banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
          {/* Create Post Button */}
          {isLoggedIn && (
            <div className="text-center mb-12">
              <button
                onClick={() => {
                  setShowPostForm(!showPostForm);
                  setEditingPostId(null); // Close edit form if create is opened
                }}
                className="py-3 px-8 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white text-xl uppercase font-bold tracking-widest flex items-center justify-center mx-auto gap-2"
              >
                <PlusCircle size={24} />{" "}
                {showPostForm ? "Hide Post Form" : "Create New Post"}
              </button>
            </div>
          )}

          {/* New Post Form - Visible if logged in and showPostForm is true */}
          {isLoggedIn && showPostForm && (
            <div
              className="mb-12 p-6 rounded-xl shadow-xl
                            bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg
                            border border-white border-opacity-20"
            >
              <h2 className="text-3xl text-red-500 mb-6 flex items-center gap-2 tracking-wider">
                <PlusCircle size={24} /> Create New Post
              </h2>
              <form onSubmit={handleAddPost} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 tracking-wider"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Post Content"
                  rows="4"
                  className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-y tracking-wider"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                ></textarea>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="postType"
                    className="text-gray-300 tracking-wider"
                  >
                    Post Type:
                  </label>
                  <select
                    id="postType"
                    className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white focus:outline-none focus:border-red-500 cursor-pointer tracking-wider"
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value)}
                    disabled={!isAdmin} // Disable if not admin
                  >
                    <option
                      value="public"
                      className="bg-[#202020] text-white tracking-wider"
                    >
                      Mission Update
                    </option>
                    {isAdmin && (
                      <option
                        value="announcement"
                        className="bg-[#202020] text-white tracking-wider"
                      >
                        Announcement
                      </option>
                    )}
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-4 py-3 px-6 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white text-xl uppercase font-bold tracking-widest"
                >
                  Post Update
                </button>
              </form>
            </div>
          )}

          {/* Edit Post Form - Visible if a post is being edited */}
          {editingPostId && (
            <div
              ref={editFormRef} // Attach ref here
              className="mb-12 p-6 rounded-xl shadow-xl
                            bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg
                            border border-white border-opacity-20"
            >
              <h2 className="text-3xl text-red-500 mb-6 flex items-center gap-2 tracking-wider">
                <Edit size={24} /> Edit Post
              </h2>
              <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 tracking-wider"
                  value={editedPostTitle}
                  onChange={(e) => setEditedPostTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Post Content"
                  rows="4"
                  className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-y tracking-wider"
                  value={editedPostContent}
                  onChange={(e) => setEditedPostContent(e.target.value)}
                  required
                ></textarea>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="editPostType"
                    className="text-gray-300 tracking-wider"
                  >
                    Post Type:
                  </label>
                  <select
                    id="editPostType"
                    className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white focus:outline-none focus:border-red-500 cursor-pointer tracking-wider"
                    value={editedPostType}
                    onChange={(e) => setEditedPostType(e.target.value)}
                    disabled={!isAdmin} // Disable if not admin
                  >
                    <option
                      value="public"
                      className="bg-[#202020] text-white tracking-wider"
                    >
                      Mission Update
                    </option>
                    {isAdmin && (
                      <option
                        value="announcement"
                        className="bg-[#202020] text-white tracking-wider"
                      >
                        Announcement
                      </option>
                    )}
                  </select>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white text-xl uppercase font-bold tracking-widest"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 px-6 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors duration-300 text-white text-xl uppercase font-bold tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Toggle between All Posts and My Posts */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowMyPostsOnly(false)}
              className={`py-2 px-6 rounded-md text-xl uppercase font-bold tracking-wider transition-colors duration-300 ${
                !showMyPostsOnly
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All Posts
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setShowMyPostsOnly(true)}
                className={`py-2 px-6 rounded-md text-xl uppercase font-bold tracking-wider transition-colors duration-300 ${
                  showMyPostsOnly
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                My Posts
              </button>
            )}
          </div>

          {/* Combined Search and Posts Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Search Inputs - Now on the left for larger screens, top for small */}
            <div className="flex flex-col gap-4 w-full lg:w-1/3">
              <h2 className="text-3xl text-red-500 mb-2 tracking-wider">
                Search Posts
              </h2>
              <input
                type="text"
                placeholder="Search by User (e.g., Tony Stark)"
                className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 tracking-wider"
                value={searchByUser}
                onChange={(e) => setSearchByUser(e.target.value)}
              />
              <input
                type="date"
                placeholder="Search by Date"
                className="p-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 tracking-wider"
                value={searchByDate}
                onChange={(e) => setSearchByDate(e.target.value)}
              />
            </div>

            {/* Posts Display - Vertical fashion */}
            <div className="flex flex-col gap-8 w-full lg:w-2/3">
              <h2 className="text-3xl text-red-500 mb-2 tracking-wider">
                {showMyPostsOnly ? "My Posts" : "All Posts"}
              </h2>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="relative p-6 rounded-xl overflow-hidden shadow-xl
                               bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg
                               border border-white border-opacity-20
                               hover:border-opacity-50 transition-all duration-300 ease-in-out
                               flex flex-col"
                  >
                    {/* Type Icon */}
                    <div
                      className={`absolute top-0 right-0 p-2 rounded-bl-lg
                                    ${
                                      post.type === "announcement"
                                        ? "bg-red-600"
                                        : "bg-[#202020]"
                                    }`}
                    >
                      {post.type === "announcement" ? (
                        <BellRing size={20} className="text-white" />
                      ) : (
                        <Rocket size={20} className="text-white" />
                      )}
                    </div>

                    <h3 className="text-2xl text-red-500 mb-3 pr-10 leading-tight tracking-wider">
                      {post.title}
                    </h3>
                    <p className="text-gray-200 text-base mb-4 flex-grow tracking-wider">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400 mt-auto pt-4 border-t border-white border-opacity-10">
                      <span className="tracking-wider">
                        {post.type === "announcement"
                          ? "ANNOUNCEMENT"
                          : "MISSION UPDATE"}
                      </span>
                      <span className="tracking-wider">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-auto">
                        {canModifyPost(post) && (
                          <>
                            <button
                              onClick={() => handleEditClick(post)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md text-white text-sm flex items-center gap-1"
                            >
                              <Edit size={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-md text-white text-sm flex items-center gap-1"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleSummarizePost(post.content)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-md text-white text-sm flex items-center gap-1"
                          disabled={isLoadingSummary}
                        >
                          {isLoadingSummary ? (
                            "Summarizing..."
                          ) : (
                            <>
                              Summarize <Sparkles size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 text-xl tracking-wider">
                  No posts found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </main>
        {/* Summary Modal */}
        {showSummaryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#202020] p-8 rounded-xl shadow-2xl max-w-lg w-full border border-gray-700 relative">
              <h2 className="text-3xl text-red-500 mb-4 tracking-wider">
                Post Summary
              </h2>
              {isLoadingSummary ? (
                <div className="text-gray-300 text-lg tracking-wider">
                  Generating summary...
                </div>
              ) : summaryError ? (
                <div className="text-red-500 text-lg tracking-wider">
                  {summaryError}
                </div>
              ) : (
                <p className="text-gray-200 text-lg leading-relaxed tracking-wider">
                  {summaryContent}
                </p>
              )}
              <button
                onClick={closeSummaryModal}
                className="mt-6 py-2 px-5 bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded-md text-white text-lg uppercase font-bold tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
}

export default PostsPage;
