"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card_TP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select_TP";
import { Textarea } from "@/components/ui/textarea_TP";
import { Badge } from "@/components/ui/badge_TP";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Send,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Users,
  CreditCard,
} from "lucide-react";
import axios from "axios";

// Mock current user - in real app, get from auth context
const currentUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  isAdmin: false,
};

export default function TransactionPage() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [balance, setBalance] = useState({
    totalSent: 0,
    totalReceived: 0,
    netBalance: 0,
  });
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("send");
  // Add showNavbar state
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Add isLoggedIn and isAdmin state if needed
  const [isLoggedIn] = useState(true); // Set to true for now, replace with real auth
  const [isAdmin] = useState(currentUser.isAdmin);

  // Send money form state
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadScript();
    fetchUsers();
    fetchUserTransactions();
    fetchBalance();
    if (currentUser.isAdmin) {
      fetchAllTransactions();
    }
  }, []);

  // Handle scroll for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else if (window.scrollY < lastScrollY) {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/all");
      setUsers(
        response.data?.filter((user) => user.id !== currentUser.id) || []
      );
    } catch (error) {
      console.error("Users fetch error:", error);
      setUsers([]);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions/user");
      setUserTransactions(response.data || []);
    } catch (error) {
      console.error("User transactions fetch error:", error);
      setUserTransactions([]);
      toast({
        title: "Error",
        description: "Failed to fetch transactions",
        variant: "destructive",
      });
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data || []);
    } catch (error) {
      console.error("All transactions fetch error:", error);
      setTransactions([]);
      toast({
        title: "Error",
        description: "Failed to fetch all transactions",
        variant: "destructive",
      });
    }
  };

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true);
      const response = await axios.get("/api/transactions/balance");
      setBalance(
        response.data || { totalSent: 0, totalReceived: 0, netBalance: 0 }
      );
    } catch (error) {
      console.error("Balance fetch error:", error);
      setBalance({ totalSent: 0, totalReceived: 0, netBalance: 0 });
      toast({
        title: "Error",
        description: "Failed to fetch balance",
        variant: "destructive",
      });
    } finally {
      setBalanceLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!amount || Number.parseFloat(amount) <= 0) {
      errors.amount = "Amount is required and must be greater than 0";
    }

    if (!currentUser.isAdmin && Number.parseFloat(amount) > 10000) {
      errors.amount = "Maximum amount allowed is ₹10,000";
    }

    if (!recipient) {
      errors.recipient = "Please select a recipient";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const amountInPaise = Number.parseFloat(amount) * 100;
    const recipientUser = users.find((u) => u.id === recipient);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890",
      amount: amountInPaise,
      currency: "INR",
      name: "Transaction App",
      description: `Payment to ${recipientUser?.name}`,
      handler: async (response) => {
        try {
          setLoading(true);
          await axios.post("/api/transactions", {
            to: recipient,
            amount: Number.parseFloat(amount),
            description,
            razorpayPaymentId: response.razorpay_payment_id,
          });

          toast({
            title: "Payment Successful! 🎉",
            description: `₹${amount} sent to ${recipientUser?.name}`,
            className: "bg-green-900 border-green-700 text-green-100",
          });

          // Reset form
          setAmount("");
          setRecipient("");
          setDescription("");

          // Refresh data
          fetchUserTransactions();
          fetchBalance();
          if (currentUser.isAdmin) {
            fetchAllTransactions();
          }
        } catch (error) {
          toast({
            title: "Transaction Failed",
            description: "Failed to record transaction",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.email,
      },
      theme: {
        color: "#dc2626",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      toast({
        title: "Transaction Deleted",
        description: "Transaction has been removed",
        className: "bg-red-900 border-red-700 text-red-100",
      });
      fetchUserTransactions();
      fetchBalance();
      if (currentUser.isAdmin) {
        fetchAllTransactions();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const TransactionItem = ({ transaction, showDelete = false }) => {
    const isSent = transaction.from === currentUser.id;
    const isReceived = transaction.to === currentUser.id;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div
            className={`p-2 rounded-full ${
              isSent ? "bg-red-900/30" : "bg-green-900/30"
            }`}
          >
            {isSent ? (
              <ArrowUpRight className="h-4 w-4 text-red-400" />
            ) : (
              <ArrowDownLeft className="h-4 w-4 text-green-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-white">
              {isSent ? (
                <span className="text-red-400">
                  You paid ₹{transaction.amount} to {transaction.toUser.name}
                </span>
              ) : (
                <span className="text-green-400">
                  You received ₹{transaction.amount} from{" "}
                  {transaction.fromUser.name}
                </span>
              )}
            </p>
            {transaction.description && (
              <p className="text-sm text-gray-400">{transaction.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>
        {showDelete && currentUser.isAdmin && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Delete Transaction
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  Are you sure you want to delete this transaction? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          .font-smoothing-auto {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          .bebas {
            font-family: 'Bebas Neue', cursive, sans-serif;
          }
        `}
      </style>
      <Navbar
        currentUserName={currentUser.name}
        showNavbar={showNavbar}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onNavAttempt={() => {}}
      />
      <div className="pt-[133px]"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-smoothing-auto bebas text-lg tracking-wider leading-relaxed">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl bebas bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-4 tracking-widest leading-tight">
              Transaction Hub
            </h1>
            <p className="text-gray-400 text-3xl bebas tracking-wider leading-relaxed mb-6">
              Manage your payments with style
            </p>
          </div>

          {/* Balance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <ArrowDownLeft className="h-5 w-5" />
                  Total Received
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balanceLoading ? (
                  <div className="h-8 bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-green-400">
                    ₹{(balance?.totalReceived || 0).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5" />
                  Total Sent
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balanceLoading ? (
                  <div className="h-8 bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-red-400">
                    ₹{(balance?.totalSent || 0).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Net Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balanceLoading ? (
                  <div className="h-8 bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  <p
                    className={`text-2xl font-bold ${
                      (balance?.netBalance || 0) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{(balance?.netBalance || 0).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              onClick={() => setActiveTab("send")}
              variant={activeTab === "send" ? "default" : "ghost"}
              className={`${
                activeTab === "send"
                  ? "bg-red-600 hover:bg-red-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Money
            </Button>
            <Button
              onClick={() => setActiveTab("transactions")}
              variant={activeTab === "transactions" ? "default" : "ghost"}
              className={`${
                activeTab === "transactions"
                  ? "bg-red-600 hover:bg-red-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              My Transactions
            </Button>
            {currentUser.isAdmin && (
              <Button
                onClick={() => setActiveTab("all")}
                variant={activeTab === "all" ? "default" : "ghost"}
                className={`${
                  activeTab === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "hover:bg-gray-800"
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                All Transactions
              </Button>
            )}
          </div>

          {/* Send Money Form */}
          {activeTab === "send" && (
            <Card className="bg-gray-800/50 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Money
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Transfer money to another user securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">
                      Amount (₹)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    />
                    {formErrors.amount && (
                      <p className="text-red-400 text-sm">
                        {formErrors.amount}
                      </p>
                    )}
                    {!currentUser.isAdmin && (
                      <p className="text-xs text-gray-500">Maximum: ₹10,000</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient" className="text-white">
                      Recipient
                    </Label>
                    <Select value={recipient} onValueChange={setRecipient}>
                      <SelectTrigger className="bg-gray-900 border-gray-600 text-white focus:border-red-500">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        {users.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.id}
                            className="text-white hover:bg-gray-800"
                          >
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.recipient && (
                      <p className="text-red-400 text-sm">
                        {formErrors.recipient}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add a note for this transaction"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                >
                  {loading ? "Processing..." : "Pay Now with Razorpay"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* My Transactions */}
          {activeTab === "transactions" && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  My Transactions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userTransactions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No transactions found
                    </p>
                  ) : (
                    userTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Transactions (Admin Only) */}
          {activeTab === "all" && currentUser.isAdmin && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Transactions
                  <Badge
                    variant="secondary"
                    className="bg-purple-900/30 text-purple-300"
                  >
                    Admin
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage all system transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No transactions found
                    </p>
                  ) : (
                    transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-purple-900/30">
                            <ArrowUpRight className="h-4 w-4 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {transaction.fromUser.name} →{" "}
                              {transaction.toUser.name}
                            </p>
                            <p className="text-purple-400 font-semibold">
                              ₹{transaction.amount}
                            </p>
                            {transaction.description && (
                              <p className="text-sm text-gray-400">
                                {transaction.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              {formatDate(transaction.createdAt)}
                            </p>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Delete Transaction
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete this
                                transaction? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  deleteTransaction(transaction.id)
                                }
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}
