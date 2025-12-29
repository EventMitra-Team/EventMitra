import React from 'react';
import { Settings, Shield, Bell, Palette } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
 import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: 'Settings Saved', description: 'Your settings have been updated successfully.' });

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8"><h1 className="text-3xl font-display font-bold text-foreground mb-2">Settings</h1><p className="text-muted-foreground">Configure your admin panel preferences</p></div>
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><Shield className="w-5 h-5 text-primary" /></div><div><CardTitle>Security</CardTitle><CardDescription>Manage security settings</CardDescription></div></div></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50"><div><p className="font-medium text-foreground">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Add extra security</p></div><Switch /></div>
              <div className="flex items-center justify-between py-3"><div><p className="font-medium text-foreground">Session Timeout</p><p className="text-sm text-muted-foreground">Auto logout after inactivity</p></div><Switch defaultChecked /></div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center"><Bell className="w-5 h-5 text-accent" /></div><div><CardTitle>Notifications</CardTitle><CardDescription>Configure notifications</CardDescription></div></div></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50"><div><p className="font-medium text-foreground">New Registrations</p><p className="text-sm text-muted-foreground">Get notified</p></div><Switch defaultChecked /></div>
              <div className="flex items-center justify-between py-3"><div><p className="font-medium text-foreground">Weekly Reports</p><p className="text-sm text-muted-foreground">Receive summaries</p></div><Switch defaultChecked /></div>
            </CardContent>
          </Card>
          <div className="flex justify-end pt-4"><Button variant="hero" size="lg" onClick={handleSave}>Save Settings</Button></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
