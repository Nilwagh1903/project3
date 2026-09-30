import React, { useState } from 'react';
import { X, Phone, MessageCircle, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function ContactOwnerModal({ isOpen, onClose, property }) {
  const { submitInquiry } = useSettleIn();
  const [customMsg, setCustomMsg] = useState("");
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // Hook calls above, condition check below
  if (!isOpen || !property) return null;

  const defaultMsg = customMsg || `Hi ${property.owner?.name || "Owner"}, I saw your listing for ${property.name} on SettleIn. I'm a student joining college this term. Is a bed currently available?`;

  const owner = property.owner || {
    name: "Property Manager",
    role: "Resident Warden",
    phone: "+91 98220 00000",
    responseRate: "Usually responds within 30 mins"
  };

  const handleSend = (e) => {
    e.preventDefault();
    const msgToSend = customMsg.trim() || defaultMsg;

    setIsSending(true);
    setTimeout(() => {
      submitInquiry({
        propertyId: property.id,
        propertyName: property.name,
        ownerName: owner.name,
        studentMessage: msgToSend
      });
      setIsSending(false);
      setStatusMsg("Inquiry delivered! The owner has been notified via SettleIn Direct.");
    }, 600);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(owner.phone);
    setStatusMsg(`Phone number (${owner.phone}) copied to clipboard!`);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(defaultMsg);
    const cleanPhone = owner.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Direct Owner Connect</span>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{property.name}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Owner Profile Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="w-12 h-12 rounded-full bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-lg shrink-0">
              {owner.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-900 truncate">{owner.name}</h4>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Owner
                </span>
              </div>
              <p className="text-xs text-slate-500">{owner.role}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{owner.responseRate}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyPhone}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-slate-600" />
              <span>{owner.phone}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Notification Alert */}
          {statusMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="flex-1">{statusMsg}</p>
            </div>
          )}

          {/* Direct Message Form */}
          <form onSubmit={handleSend} className="space-y-3 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Or send a message via SettleIn (No broker, direct delivery):
            </label>
            <textarea
              rows={3}
              value={customMsg || defaultMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 resize-none bg-slate-50/50"
              placeholder="Type your question about room availability, deposit, or food..."
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Your phone & name from profile will be attached</span>
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-xs hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? "Dispatching..." : "Send Message"}</span>
              </button>
            </div>
          </form>

          {/* Safety Notice */}
          <p className="text-[11px] text-slate-400 leading-normal border-t border-slate-100 pt-3">
            💡 SettleIn does not charge any broker commission. Never pay advance token deposits without physically inspecting the room or having a senior student verify it.
          </p>
        </div>
      </div>
    </div>
  );
}
