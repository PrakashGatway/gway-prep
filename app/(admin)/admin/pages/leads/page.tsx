"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  Eye,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Link as LinkIcon,
  MessageSquare,
  FileText,
  Tag,
  Hash,
} from "lucide-react";
import axiosInstance from "@/app/lib/axios";

interface Lead {
  _id: string;
  path: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Field configuration for better display
const fieldConfig: Record<string, { icon: React.ReactNode; label: string; priority: number }> = {
  fullName: { 
    icon: <User size={18} className="text-orange-500" />, 
    label: "Full Name", 
    priority: 1 
  },
  name: { 
    icon: <User size={18} className="text-orange-500" />, 
    label: "Name", 
    priority: 1 
  },
  email: { 
    icon: <Mail size={18} className="text-orange-500" />, 
    label: "Email", 
    priority: 2 
  },
  phone: { 
    icon: <Phone size={18} className="text-orange-500" />, 
    label: "Phone", 
    priority: 3 
  },
  mobile: { 
    icon: <Phone size={18} className="text-orange-500" />, 
    label: "Mobile", 
    priority: 3 
  },
  city: { 
    icon: <MapPin size={18} className="text-orange-500" />, 
    label: "City", 
    priority: 4 
  },
  topic: { 
    icon: <Tag size={18} className="text-orange-500" />, 
    label: "Topic", 
    priority: 5 
  },
  interest: { 
    icon: <Tag size={18} className="text-orange-500" />, 
    label: "Interest", 
    priority: 5 
  },
  message: { 
    icon: <MessageSquare size={18} className="text-orange-500" />, 
    label: "Message", 
    priority: 6 
  },
  programs: { 
    icon: <FileText size={18} className="text-orange-500" />, 
    label: "Programs", 
    priority: 7 
  },
  consent: { 
    icon: <FileText size={18} className="text-orange-500" />, 
    label: "Consent", 
    priority: 8 
  },
};

const LeadsPage = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchLeads = async () => {
    try {
      setFetchLoading(true);
      const res = await axiosInstance.get('/admin/formDetails');
      setLeads(res?.data?.forms || []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(id);
      // Uncomment when API is ready
      const api = await axiosInstance.delete('/admin/formDetails', { data: { id } });
      console.log('api', api?.data);
      
      // For now, just remove from local state
      setLeads(leads.filter(lead => lead._id !== id));
    } catch (error) {
      console.error("Failed to delete lead:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowInfoSidebar(true);
  };

  const closeSidebar = () => {
    setShowInfoSidebar(false);
    setSelectedLead(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLeadName = (lead: Lead) => {
    return lead.data?.fullName || lead.data?.name || 'N/A';
  };

  const getLeadEmail = (lead: Lead) => {
    return lead.data?.email || 'N/A';
  };

  const getLeadPhone = (lead: Lead) => {
    return lead.data?.phone || lead.data?.mobile || 'N/A';
  };

  const getLeadCity = (lead: Lead) => {
    return lead.data?.city || 'N/A';
  };

  // Get all fields except the ones we want to skip
  const getDynamicFields = (data: Record<string, any>) => {
    const skipFields = ['fullName', 'name', 'email', 'phone', 'mobile', 'city'];
    const dynamicFields: Record<string, any> = {};
    
    Object.keys(data).forEach(key => {
      if (!skipFields.includes(key) && data[key] !== undefined && data[key] !== null && data[key] !== '') {
        dynamicFields[key] = data[key];
      }
    });
    
    return dynamicFields;
  };

  // Format field value based on type
  const formatFieldValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  // Check if a field is a long text (like message)
  const isLongText = (key: string, value: any): boolean => {
    return key === 'message' || key === 'Message' || (typeof value === 'string' && value.length > 200);
  };

  // Get icon for dynamic field
  const getFieldIcon = (key: string) => {
    // Check if key exists in config
    if (fieldConfig[key]) {
      return fieldConfig[key].icon;
    }
    
    // Default icons based on key name
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('email')) return <Mail size={18} className="text-orange-500" />;
    if (lowerKey.includes('phone') || lowerKey.includes('mobile')) return <Phone size={18} className="text-orange-500" />;
    if (lowerKey.includes('city') || lowerKey.includes('address')) return <MapPin size={18} className="text-orange-500" />;
    if (lowerKey.includes('message') || lowerKey.includes('comment')) return <MessageSquare size={18} className="text-orange-500" />;
    if (lowerKey.includes('topic') || lowerKey.includes('interest') || lowerKey.includes('program')) return <Tag size={18} className="text-orange-500" />;
    if (lowerKey.includes('consent') || lowerKey.includes('agree')) return <FileText size={18} className="text-orange-500" />;
    
    return <FileText size={18} className="text-orange-500" />;
  };

  // Get label for field
  const getFieldLabel = (key: string): string => {
    if (fieldConfig[key]) {
      return fieldConfig[key].label;
    }
    
    // Format key as readable label
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Get priority for sorting
  const getFieldPriority = (key: string): number => {
    if (fieldConfig[key]) {
      return fieldConfig[key].priority;
    }
    return 999; // Default high number for dynamic fields
  };

  // Sort fields by priority
  const sortFields = (fields: string[]): string[] => {
    return fields.sort((a, b) => {
      const priorityA = getFieldPriority(a);
      const priorityB = getFieldPriority(b);
      return priorityA - priorityB;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage Ooshas Prep leads and their information.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Total Leads: {leads.length}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {fetchLoading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-gray-500">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center">
            <div className="mb-3 rounded-full bg-orange-50 p-4">
              <User size={28} className="text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No leads have been submitted yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Created At</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">
                    Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead, index) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                          <User size={16} className="text-orange-500" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {getLeadName(lead)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getLeadEmail(lead)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getLeadPhone(lead)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getLeadCity(lead)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(lead)}
                          className="rounded-lg border border-blue-100 p-2 text-blue-600 transition hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          type="button"
                          onClick={() => lead._id && handleDelete(lead._id)}
                          disabled={deleteLoading === lead._id}
                          className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                          title="Delete Lead"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Sidebar */}
      {showInfoSidebar && selectedLead && (
        <div className="fixed inset-0 z-[999] flex justify-end bg-black/30" onClick={closeSidebar}>
          <div className="relative h-full w-full max-w-2xl bg-white shadow-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Lead Information
                </h2>
                <p className="text-xs text-gray-500">
                  Detailed view of lead information
                </p>
              </div>
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="overflow-y-auto h-[calc(100%-73px)] p-6">
              {/* Lead Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <User size={32} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {getLeadName(selectedLead)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Lead ID: {selectedLead._id}
                  </p>
                </div>
              </div>

              {/* Information Grid - Static Fields */}
              <div className="space-y-4">
                {/* Email */}
                {selectedLead.data?.email && (
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedLead.data.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {(selectedLead.data?.phone || selectedLead.data?.mobile) && (
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedLead.data.phone || selectedLead.data.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* City */}
                {selectedLead.data?.city && (
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedLead.data.city}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Path/Page */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <LinkIcon size={18} className="text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted From
                      </p>
                      <p className="text-sm text-gray-900 break-all">
                        {selectedLead.path}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Fields */}
              {Object.keys(getDynamicFields(selectedLead.data)).length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Hash size={16} className="text-orange-500" />
                    Additional Information
                  </h4>
                  <div className="space-y-3">
                    {sortFields(Object.keys(getDynamicFields(selectedLead.data))).map((key) => {
                      const value = selectedLead.data[key];
                      const formattedValue = formatFieldValue(value);
                      const isLong = isLongText(key, value);
                      
                      return (
                        <div key={key} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5">{getFieldIcon(key)}</span>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {getFieldLabel(key)}
                              </p>
                              {isLong ? (
                                <div className="mt-1 text-sm text-gray-900 whitespace-pre-wrap max-h-48 overflow-y-auto">
                                  {formattedValue}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-900">
                                  {formattedValue}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </p>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedLead.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Delete Button at Bottom */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedLead._id) {
                      handleDelete(selectedLead._id);
                      closeSidebar();
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  <Trash2 size={18} />
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles for animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LeadsPage;