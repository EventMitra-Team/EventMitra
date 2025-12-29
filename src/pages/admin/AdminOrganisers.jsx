import React, {useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
} from "lucide-react";

import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useOrganisers } from "@/context/OrganiserContext";

const AdminOrganisers = () => {
  
;
  const { toast } = useToast();
  const { organisers, setOrganisers } = useOrganisers();
const adminToken = localStorage.getItem("adminToken");


  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] =
    useState(false);

  const [selectedOrganiser, setSelectedOrganiser] = useState(null);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "pending",
  });

  const [subscriptionData, setSubscriptionData] = useState({
    plan: "annual",
    status: "pending",
    amount: 29999,
    eventsAllowed: 50,
  });

useEffect(() => {
  if (adminToken) {
    fetchPendingOrganisers();
  }
}, [adminToken]);

 


  // fetch the organiser

  const fetchPendingOrganisers = async () => {
  try {
    const res = await fetch(
      "http://localhost:2511/admin/organisers/pending",
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

  if (!res.ok) throw new Error("Unauthorized");

const data = await res.json();
setOrganisers(Array.isArray(data) ? data : []);

  } catch (err) {
    toast({
      title: "Error ❌",
      description: "Unable to load organisers",
      variant: "destructive",
    });
  }
};


  /* ================= APPROVE ORGANISER ================= */
 const approveOrganiser = async (organiserId) => {
  try {
    const res = await fetch(
      `http://localhost:2511/admin/organisers/${organiserId}/approve`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (!res.ok) throw new Error();

    toast({
      title: "Approved ✅",
      description: "Organiser can now login",
    });

    // 🔥 VERY IMPORTANT
    fetchPendingOrganisers();

  } catch {
    toast({
      title: "Error ❌",
      description: "Approval failed",
      variant: "destructive",
    });
  }
};


  /* ================= FILTER ================= */
  const safeOrganisers = Array.isArray(organisers) ? organisers : [];

  const filteredOrganisers = safeOrganisers.filter((org) => {
  if (!org || !org.status) return false;

  const matchesSearch =
    org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.company?.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || org.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const getSubscriptionBadge = (subscription) => {
  if (!subscription || !subscription.status) {
    return <Badge className="subscription-pending">Not Assigned</Badge>;
  }

  if (subscription.status === "active") {
    return <Badge className="subscription-active">Active</Badge>;
  }

  if (subscription.status === "expired") {
    return <Badge className="subscription-expired">Expired</Badge>;
  }

  return <Badge className="subscription-pending">Pending</Badge>;
};


  



  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div className="p-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Organisers ({filteredOrganisers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>Organiser</th>
                  <th>Status</th>
                  {/* <th>Subscription</th> */}
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganisers.map((organiser) => (
                  <tr key={organiser._id} className="border-b">
                    <td>{organiser.name}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          organiser.status === "active"
                            ? "bg-green-100 text-green-700"
                            : organiser.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {organiser.status}
                      </span>
                    </td>


                    <td>{getSubscriptionBadge(organiser.subscription ?? null)}</td>



                    <td className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

  {organiser.status === "pending" && (
    <DropdownMenuItem
      onClick={() => approveOrganiser(organiser._id)}
    >
      Approve
    </DropdownMenuItem>
  )}





                          {/* <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrganiser(organiser);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 w-4 h-4" />
                            Edit
                          </DropdownMenuItem> */}
{/* 
                          {organiser.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() =>
                                approveOrganiser(organiser._id)
                              }
                            >
                              Approve
                            </DropdownMenuItem>
                          )} */}

                          {/* <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrganiser(organiser);
                              setIsSubscriptionDialogOpen(true);
                            }}
                          >
                            <CreditCard className="mr-2 w-4 h-4" />
                            Subscription
                          </DropdownMenuItem> */}

                          {/* <DropdownMenuItem
                            onClick={() => handleDelete(organiser)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 w-4 h-4" />
                            Delete
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrganisers;
