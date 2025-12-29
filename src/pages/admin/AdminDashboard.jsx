import React from 'react';
import { Users, Calendar, TrendingUp, UserPlus, CreditCard, IndianRupee } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

import { useOrganisers } from '@/context/OrganiserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { organisers  } = useOrganisers();

  const statsData = {
    total: organisers.length,
    active: organisers.filter((o) => o.status === 'active').length,
    pending: organisers.filter((o) => o.status === 'pending').length,
    events: organisers.reduce((sum, o) => sum + o.eventsManaged, 0),
    activeSubscriptions: organisers.filter((o) => o.subscription.status === 'active').length,
    totalRevenue: organisers
      .filter((o) => o.subscription.status === 'active')
      .reduce((sum, o) => sum + o.subscription.amount, 0),
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    { icon: Users, label: 'Total Organisers', value: statsData.total, color: 'text-primary' },
    { icon: UserPlus, label: 'Active Organisers', value: statsData.active, color: 'text-success' },
    { icon: CreditCard, label: 'Active Subscriptions', value: statsData.activeSubscriptions, color: 'text-accent-foreground' },
    { icon: IndianRupee, label: 'Total Revenue', value: formatCurrency(statsData.totalRevenue), color: 'text-primary' },
    { icon: Calendar, label: 'Pending Approvals', value: statsData.pending, color: 'text-muted-foreground' },
    { icon: TrendingUp, label: 'Events Managed', value: statsData.events, color: 'text-success' },
  ];

  const recentOrganisers = [...organisers]
    .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    .slice(0, 5);

  const getSubscriptionBadge = (status) => {
    if (status === 'active') {
      return <Badge className="bg-success/10 text-success border border-success/20">Active</Badge>;
    } else if (status === 'expired') {
      return <Badge className="bg-destructive/10 text-destructive border border-destructive/20">Expired</Badge>;
    } else {
      return <Badge className="bg-accent/10 text-accent-foreground border border-accent/20">Pending</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="glass hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Organisers */}
        <Card className="glass animate-fade-in-up delay-400">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-display">Recent Organisers</CardTitle>
            <Link
              to="/admin/organisers"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrganisers.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getSubscriptionBadge(org.subscription.status)}
                    <span className="text-sm text-muted-foreground">
                      {org.eventsManaged} / {org.subscription.eventsAllowed} events
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
