import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, LogOut, LayoutDashboard, Settings, CalendarDays, IndianRupee, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Organisers', path: '/admin/organisers' },
  { icon: CalendarDays, label: 'Events', path: '/admin/events' },
  { icon: IndianRupee, label: 'Transactions', path: '/admin/transactions' },
];

const SidebarContent = ({ location, handleLogout, onNavClick }) => (
  <>
    {/* Logo */}
    <div className="p-6 border-b border-sidebar-border">
      <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={onNavClick}>
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
          <Calendar className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-display font-bold">
          <span className="text-sidebar-foreground">Event</span>
          <span className="text-gradient">Mitra</span>
        </span>
      </Link>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavClick}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>

    {/* Admin Info & Logout */}
    <div className="p-4 border-t border-sidebar-border">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
          <span className="text-sm font-semibold text-sidebar-accent-foreground">A</span>
        </div>
        <div>
          <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
          <p className="text-xs text-muted-foreground">admin@eventmitra.com</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start text-sidebar-foreground hover:text-destructive hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </Button>
    </div>
  </>
);

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border h-16 flex items-center justify-between px-4">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Calendar className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold">
            <span className="text-sidebar-foreground">Event</span>
            <span className="text-gradient">Mitra</span>
          </span>
        </Link>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
            <div className="h-full flex flex-col">
              <SidebarContent 
                location={location} 
                handleLogout={handleLogout}
                onNavClick={closeMobileMenu}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border fixed h-full flex-col">
        <SidebarContent 
          location={location} 
          handleLogout={handleLogout}
          onNavClick={() => {}}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
