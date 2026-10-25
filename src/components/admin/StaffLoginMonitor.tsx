import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Monitor, 
  Smartphone, 
  Laptop, 
  MapPin, 
  Clock, 
  PowerOff, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  UserCheck, 
  Lock,
  Globe,
  RefreshCw,
  X,
  Radio
} from 'lucide-react';
import { StaffLoginSession, StaffMember } from '../../types/hotel';

interface StaffLoginMonitorProps {
  logins: StaffLoginSession[];
  onTerminateSession: (sessionId: string, staffName: string) => void;
  onRecordLogin: (newSession: StaffLoginSession) => void;
  staffList: StaffMember[];
}

export const StaffLoginMonitor: React.FC<StaffLoginMonitorProps> = ({
  logins,
  onTerminateSession,
  onRecordLogin,
  staffList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);

  // New simulation form
  const [simStaffId, setSimStaffId] = useState(staffList[0]?.id || '');
  const [simTerminal, setSimTerminal] = useState('Front Desk Terminal 02');
  const [simLocation, setSimLocation] = useState('Main Reception Lobby');
  const [simDevice, setSimDevice] = useState('HP ProDesk 400 • Edge Browser (Windows 11)');

  const activeSessionsCount = logins.filter((l) => l.status === 'Active').length;

  const filteredLogins = logins.filter((item) => {
    const matchesSearch =
      item.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.terminal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All' || item.department === selectedDept;

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && item.status === 'Active') ||
      (statusFilter === 'Inactive' && item.status !== 'Active');

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = staffList.find((s) => s.id === simStaffId) || staffList[0];
    if (!staff) return;

    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const randomIp = `192.168.1.${Math.floor(100 + Math.random() * 90)}`;

    const newSession: StaffLoginSession = {
      id: `log-${Date.now()}`,
      staffId: staff.staffId,
      staffName: staff.name,
      staffRole: staff.role,
      department: staff.department,
      loginTime: timeStr,
      terminal: simTerminal,
      device: simDevice,
      ipAddress: `${randomIp} (${simLocation.split(' ')[0]} LAN)`,
      location: simLocation,
      status: 'Active',
      duration: 'Just now',
      avatar: staff.avatar,
    };

    onRecordLogin(newSession);
    setIsSimulateModalOpen(false);
  };

  const getDeviceIcon = (deviceStr: string) => {
    const str = deviceStr.toLowerCase();
    if (str.includes('mobile') || str.includes('phone') || str.includes('tab') || str.includes('scanner')) {
      return <Smartphone className="w-4 h-4 text-emerald-400" />;
    }
    if (str.includes('laptop') || str.includes('macbook') || str.includes('thinkpad')) {
      return <Laptop className="w-4 h-4 text-amber-400" />;
    }
    return <Monitor className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
              Staff Login & Session Monitoring Console
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time tracking of every staff login, authenticated terminal, internal IP address, and active shift duration.
          </p>
        </div>

        <button
          onClick={() => setIsSimulateModalOpen(true)}
          className="px-4 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4 text-stone-950" />
          <span>Register Staff Login Session</span>
        </button>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Active Concurrent Sessions
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                {activeSessionsCount}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Online
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Total Logins Today
            </span>
            <span className="text-2xl font-bold text-amber-400 font-mono">
              {logins.length}
            </span>
          </div>
        </div>

        <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Internal Network LAN
            </span>
            <span className="text-sm font-bold text-blue-300 font-mono">
              192.168.1.0/24 Secure
            </span>
          </div>
        </div>

        <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Security Compliance
            </span>
            <span className="text-sm font-bold text-emerald-400">
              100% Zero Breaches
            </span>
          </div>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by staff name, ID, terminal, IP address, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm pl-9 pr-4 py-2.5 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              All Status ({logins.length})
            </button>
            <button
              onClick={() => setStatusFilter('Active')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                statusFilter === 'Active'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              Active ({activeSessionsCount})
            </button>
            <button
              onClick={() => setStatusFilter('Inactive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                statusFilter === 'Inactive'
                  ? 'bg-stone-700 text-stone-200 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {['All', 'Front Desk', 'Management', 'Food & Beverage', 'Security & Power', 'Events & Banquets', 'Housekeeping'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 rounded-sm text-[11px] transition-colors cursor-pointer ${
                selectedDept === dept
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-850'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Login Sessions List */}
      <div className="space-y-3">
        {filteredLogins.length === 0 ? (
          <div className="p-8 text-center bg-stone-900 border border-stone-800 rounded-sm text-stone-400 text-xs">
            No login records found matching your filters.
          </div>
        ) : (
          filteredLogins.map((session) => (
            <div
              key={session.id}
              className={`p-4 bg-stone-900 border rounded-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                session.status === 'Active'
                  ? 'border-emerald-500/40 hover:border-emerald-500/60 shadow-md'
                  : 'border-stone-800 opacity-75'
              }`}
            >
              {/* Staff Details & Avatar */}
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={session.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                    alt={session.staffName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-stone-700"
                  />
                  {session.status === 'Active' ? (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-stone-900" title="Active Online" />
                  ) : (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-stone-600 rounded-full border-2 border-stone-900" title="Offline" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {session.staffId}
                    </span>
                    <h4 className="font-serif-luxury font-bold text-stone-100 text-sm">
                      {session.staffName}
                    </h4>
                    <span className="px-2 py-0.5 rounded-sm bg-stone-950 border border-stone-700 text-[10px] text-stone-300">
                      {session.department}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">{session.staffRole}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 pt-0.5">
                    <span className="flex items-center gap-1 text-stone-300">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {session.location}
                    </span>
                    <span className="text-stone-600">•</span>
                    <span className="flex items-center gap-1 font-mono text-stone-300">
                      {getDeviceIcon(session.device)}
                      {session.terminal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Login Timing & Network Node */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-stone-950 p-3 rounded-sm border border-stone-850">
                <div>
                  <span className="text-[10px] uppercase text-stone-500 block">Logged In</span>
                  <span className="font-bold text-stone-200">{session.loginTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-500 block">Duration</span>
                  <span className="font-mono text-amber-300">{session.duration || 'Active'}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-stone-500 block">Station IP</span>
                  <span className="font-mono text-emerald-400 text-[11px]">{session.ipAddress}</span>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                <span
                  className={`px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    session.status === 'Active'
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                      : session.status === 'Terminated'
                      ? 'bg-red-950 border border-red-500/40 text-red-300'
                      : 'bg-stone-800 border border-stone-700 text-stone-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${session.status === 'Active' ? 'bg-emerald-400 animate-ping' : 'bg-stone-500'}`} />
                  <span>{session.status}</span>
                </span>

                {session.status === 'Active' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Force terminate login session for ${session.staffName}? They will be immediately disconnected from ${session.terminal}.`)) {
                        onTerminateSession(session.id, session.staffName);
                      }
                    }}
                    className="px-3 py-1 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1"
                    title="Force logout this staff session"
                  >
                    <PowerOff className="w-3.5 h-3.5" />
                    <span>Terminate</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* REGISTER / SIMULATE STAFF LOGIN MODAL */}
      {isSimulateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-luxury text-base font-bold text-stone-100">
                  Register Staff Login Session
                </h3>
              </div>
              <button
                onClick={() => setIsSimulateModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Select Staff Member *
                </label>
                <select
                  value={simStaffId}
                  onChange={(e) => setSimStaffId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {staffList.map((stf) => (
                    <option key={stf.id} value={stf.id}>
                      {stf.name} — {stf.role} ({stf.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Terminal Name *
                </label>
                <input
                  type="text"
                  required
                  value={simTerminal}
                  onChange={(e) => setSimTerminal(e.target.value)}
                  placeholder="e.g. Front Desk Terminal #2"
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Operational Location *
                </label>
                <input
                  type="text"
                  required
                  value={simLocation}
                  onChange={(e) => setSimLocation(e.target.value)}
                  placeholder="e.g. Main Reception Lobby"
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Device Hardware & Browser Profile
                </label>
                <input
                  type="text"
                  value={simDevice}
                  onChange={(e) => setSimDevice(e.target.value)}
                  placeholder="e.g. Dell OptiPlex • Chrome Desktop"
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSimulateModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 text-xs rounded-sm hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm hover:from-amber-400"
                >
                  Authenticate & Start Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
