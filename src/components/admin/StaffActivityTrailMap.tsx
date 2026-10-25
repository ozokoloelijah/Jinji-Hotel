import React, { useState } from 'react';
import { 
  Footprints, 
  MapPin, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Zap, 
  UtensilsCrossed, 
  Calendar, 
  Waves, 
  Search, 
  Download, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  User, 
  Tag, 
  ArrowUpRight,
  Eye,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { StaffActivityLog, StaffMember } from '../../types/hotel';

interface StaffActivityTrailMapProps {
  activityLogs: StaffActivityLog[];
  staffList: StaffMember[];
  onLogActivity: (action: string, category: any, details: string, staffName?: string, location?: string) => void;
}

interface HotelStation {
  id: string;
  name: string;
  zone: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
}

const HOTEL_STATIONS: HotelStation[] = [
  { id: 'reception', name: 'Main Reception & Front Desk', zone: 'Ground Floor Lobby', icon: Building2, color: 'text-amber-400', bgLight: 'bg-amber-500/10 border-amber-500/30' },
  { id: 'suites', name: 'Presidential & Executive Suites', zone: 'Floors 1 & 2 Wing', icon: Tag, color: 'text-purple-400', bgLight: 'bg-purple-500/10 border-purple-500/30' },
  { id: 'kitchen', name: 'Royal Palm Restaurant & Kitchen', zone: 'Dining Terrace', icon: UtensilsCrossed, color: 'text-orange-400', bgLight: 'bg-orange-500/10 border-orange-500/30' },
  { id: 'ballroom', name: 'Grand Crystal Ballroom', zone: 'Events Center East', icon: Calendar, color: 'text-pink-400', bgLight: 'bg-pink-500/10 border-pink-500/30' },
  { id: 'pool', name: 'Olympic Pool & Garden Terrace', zone: 'Outdoor Resort Yard', icon: Waves, color: 'text-cyan-400', bgLight: 'bg-cyan-500/10 border-cyan-500/30' },
  { id: 'power', name: 'Cummins Generator & Solar Plant', zone: 'Utility Complex', icon: Zap, color: 'text-yellow-400', bgLight: 'bg-yellow-500/10 border-yellow-500/30' },
  { id: 'security', name: 'Gatehouse & CCTV Command Room', zone: 'Perimeter Boundary', icon: ShieldCheck, color: 'text-emerald-400', bgLight: 'bg-emerald-500/10 border-emerald-500/30' },
  { id: 'admin', name: 'Executive Operations Office', zone: 'Admin Suite A1', icon: User, color: 'text-blue-400', bgLight: 'bg-blue-500/10 border-blue-500/30' },
];

export const StaffActivityTrailMap: React.FC<StaffActivityTrailMapProps> = ({
  activityLogs,
  staffList,
  onLogActivity,
}) => {
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
  const [selectedStationFilter, setSelectedStationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New Activity Log Form State
  const [newStaffName, setNewStaffName] = useState(staffList[0]?.name || 'Grace Joshua');
  const [newAction, setNewAction] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Reservations');
  const [newStation, setNewStation] = useState('Main Reception & Front Desk');
  const [newDetails, setNewDetails] = useState('');

  // Find selected staff member info
  const selectedStaffObj = staffList.find((s) => s.name === selectedStaffFilter);

  // Filter logs
  const filteredLogs = activityLogs.filter((log) => {
    const matchesStaff = selectedStaffFilter === 'all' || log.staffName === selectedStaffFilter;
    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.location && log.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStation =
      selectedStationFilter === 'all' ||
      (log.stationId && log.stationId === selectedStationFilter) ||
      (log.location && log.location.toLowerCase().includes(selectedStationFilter.toLowerCase()));

    return matchesStaff && matchesCategory && matchesSearch && matchesStation;
  });

  // Calculate station activity distribution
  const stationStats = HOTEL_STATIONS.map((station) => {
    const count = activityLogs.filter((l) => {
      const matchStaff = selectedStaffFilter === 'all' || l.staffName === selectedStaffFilter;
      const matchStation = l.stationId === station.id || (l.location && l.location.toLowerCase().includes(station.name.split(' ')[0].toLowerCase()));
      return matchStaff && matchStation;
    }).length;

    return {
      ...station,
      count,
    };
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Staff Name', 'Role', 'Action', 'Category', 'Timestamp', 'Location', 'Details'];
    const rows = filteredLogs.map((log) => [
      log.id,
      `"${log.staffName}"`,
      `"${log.staffRole || ''}"`,
      `"${log.action.replace(/"/g, '""')}"`,
      log.category,
      `"${log.timestamp}"`,
      `"${log.location || 'Jinji Hotels'}"`,
      `"${log.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jinji_hotels_staff_activity_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction.trim() || !newDetails.trim()) return;

    onLogActivity(newAction.trim(), newCategory, newDetails.trim(), newStaffName, newStation);
    setIsLogModalOpen(false);
    setNewAction('');
    setNewDetails('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
              Staff Activity Trail Map & Spatial Audit Footprint
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Monitor chronological movements, station check-ins, guest interactions, rate revisions, and operational tasks for every staff member.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-sm bg-stone-900 border border-stone-700 hover:border-amber-500/40 text-stone-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Download CSV Audit Report"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Trail Report (CSV)</span>
          </button>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-4 py-2 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>Record Activity Event</span>
          </button>
        </div>
      </div>

      {/* Staff Filter Selector Dropdown & Staff Card */}
      <div className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-[11px] uppercase font-bold text-amber-400 tracking-wider mb-1.5">
            Select Staff Member to Track Trail:
          </label>
          <div className="relative">
            <select
              value={selectedStaffFilter}
              onChange={(e) => setSelectedStaffFilter(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none font-medium cursor-pointer"
            >
              <option value="all">🌐 All Hotel Staff (Global Audit Trail - {activityLogs.length} events)</option>
              {staffList.map((stf) => (
                <option key={stf.id} value={stf.name}>
                  👤 {stf.name} — {stf.role} ({stf.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedStaffObj && (
          <div className="flex items-center gap-3 bg-stone-950 p-2.5 rounded-sm border border-stone-800 w-full md:w-auto">
            <img
              src={selectedStaffObj.avatar}
              alt={selectedStaffObj.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-stone-100">{selectedStaffObj.name}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold">
                  {selectedStaffObj.shiftStatus}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">{selectedStaffObj.assignedArea}</p>
            </div>
          </div>
        )}
      </div>

      {/* Spatial Hotel Station Trail Map Nodes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Hotel Operational Stations & Spatial Activity Heatmap
          </span>
          <span className="text-[11px] text-stone-500">
            Click any station to filter activities
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {stationStats.map((station) => {
            const Icon = station.icon;
            const isSelected = selectedStationFilter === station.id;
            return (
              <button
                key={station.id}
                onClick={() => setSelectedStationFilter(isSelected ? 'all' : station.id)}
                className={`p-3 rounded-sm border text-left transition-all flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 shadow-md scale-102 ring-1 ring-amber-400'
                    : 'border-stone-800 bg-stone-900/90 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-4 h-4 ${station.color}`} />
                    <span className="px-1.5 py-0.5 rounded-full bg-stone-950 border border-stone-800 text-[10px] font-mono font-bold text-amber-300">
                      {station.count}
                    </span>
                  </div>
                  <h5 className="font-bold text-stone-100 text-[11px] leading-tight group-hover:text-amber-300">
                    {station.name}
                  </h5>
                </div>
                <span className="text-[9px] text-stone-500 block mt-2 truncate">
                  {station.zone}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-stone-900 border border-stone-800 rounded-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search activity notes, staff, actions, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm pl-9 pr-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Reservations', 'Rates', 'Security', 'Food & Beverage', 'Events', 'Maintenance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Step-by-Step Chronological Breadcrumb Trail Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h4 className="font-serif-luxury text-sm font-bold text-stone-100 uppercase tracking-wider">
              {selectedStaffFilter === 'all' ? 'Chronological Hotel Activity Trail' : `Activity Trail for ${selectedStaffFilter}`} ({filteredLogs.length} Records)
            </h4>
          </div>

          {selectedStationFilter !== 'all' && (
            <button
              onClick={() => setSelectedStationFilter('all')}
              className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Filtered by station</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center bg-stone-900 border border-stone-800 rounded-sm text-stone-400 text-xs">
            No activity trail logs found for the selected filters.
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-stone-700 before:to-stone-900">
            {filteredLogs.map((log, index) => {
              const stepNumber = index + 1;
              return (
                <div key={log.id} className="relative group">
                  {/* Trail Step Node Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-300 shadow group-hover:scale-110 transition-transform">
                    {stepNumber}
                  </div>

                  {/* Activity Detail Card */}
                  <div className="p-4 bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-sm space-y-2 shadow-md transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold uppercase">
                          {log.category}
                        </span>
                        <h5 className="font-bold text-stone-100 text-sm">{log.action}</h5>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {log.location && (
                          <span className="flex items-center gap-1 text-stone-400 bg-stone-950 px-2 py-0.5 rounded-sm border border-stone-800 text-[11px]">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            {log.location}
                          </span>
                        )}
                        <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-stone-500" />
                          {log.timestamp}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-sm border border-stone-850/80">
                      {log.details}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                      <div className="flex items-center gap-2">
                        <span>Staff Officer:</span>
                        <strong className="text-amber-300 font-medium">
                          {log.staffName}
                        </strong>
                        {log.staffRole && <span className="text-stone-400">({log.staffRole})</span>}
                      </div>

                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[10px] uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        Audit Verified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RECORD ACTIVITY MODAL */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <div className="flex items-center gap-2">
                <Footprints className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-luxury text-base font-bold text-stone-100">
                  Record Staff Activity & Operational Trail
                </h3>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                    Staff Member *
                  </label>
                  <select
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  >
                    {staffList.map((stf) => (
                      <option key={stf.id} value={stf.name}>
                        {stf.name} ({stf.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                    Activity Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  >
                    <option value="Reservations">Reservations & Check-In</option>
                    <option value="Rates">Room Rates & Discounts</option>
                    <option value="Security">Security Patrol & CCTV</option>
                    <option value="Maintenance">Maintenance & Power</option>
                    <option value="Food & Beverage">Dining & Kitchen</option>
                    <option value="Events">Banquet & Events</option>
                    <option value="Staff">Staff Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Hotel Station / Location *
                </label>
                <select
                  value={newStation}
                  onChange={(e) => setNewStation(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {HOTEL_STATIONS.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name} ({st.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Action Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Keycard Issued or Routine Generator Inspection"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                  Detailed Operational Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide precise details of the action taken, guest reference, or room number..."
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 text-xs rounded-sm hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm hover:from-amber-400"
                >
                  Log & Append to Trail Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
