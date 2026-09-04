import React, { useState, useEffect } from 'react';
import { NearbyStore } from '../../types/store';
import { apiService } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import {
  Search,
  MapPin,
  Navigation,
  Phone,
  QrCode,
  X,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Loader2,
  Sparkles,
} from 'lucide-react';

export const NearbyStoresView: React.FC = () => {
  const [stores, setStores] = useState<NearbyStore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pincode, setPincode] = useState<string>('122002');
  const [selectedArea, setSelectedArea] = useState<string>('Gurugram Cyber Hub');

  // Location Drawer modal state
  const [showLocationDrawer, setShowLocationDrawer] = useState<boolean>(false);
  const [pincodeInput, setPincodeInput] = useState<string>('');
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // In-Store Pay at Store modal
  const [activeStore, setActiveStore] = useState<NearbyStore | null>(null);
  const [billAmount, setBillAmount] = useState<number>(35000);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentResult, setPaymentResult] = useState<{
    transactionId: string;
    merchantName: string;
    amount: number;
    monthlyEMI: number;
    tenureMonths: number;
    status: string;
    qrReference: string;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    apiService.getNearbyStores({ query: searchQuery, pincode }).then((data) => {
      setStores(data);
      setLoading(false);
    });
  }, [searchQuery, pincode]);

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setSelectedArea('Gurugram Sector 24');
      setPincode('122002');
      setIsDetectingLocation(false);
      setShowLocationDrawer(false);
    }, 800);
  };

  const handleApplyPincode = () => {
    if (pincodeInput.trim().length >= 3) {
      setPincode(pincodeInput.trim());
      setSelectedArea(`Pincode ${pincodeInput.trim()}`);
      setShowLocationDrawer(false);
      setPincodeInput('');
    }
  };

  const handleProcessInStorePay = async () => {
    if (!activeStore) return;
    setIsProcessingPayment(true);
    const result = await apiService.processInStorePayment(
      activeStore.id,
      billAmount,
      selectedTenure
    );
    setPaymentResult(result);
    setIsProcessingPayment(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#712CDC', '#8c27fc', '#10B981'],
    });
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Search & Location Bar */}
      <div className="flex gap-2 items-center">
        {/* Search Bar */}
        <div className="flex-1 relative flex items-center gap-2 h-[46px] rounded-full border border-gray-200/90 bg-white px-4 shadow-[0_2px_8px_rgba(20,14,50,0.04)]">
          <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores, brands, malls..."
            className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Location selector button matching app.1fi.in */}
        <button
          type="button"
          onClick={() => setShowLocationDrawer(true)}
          className="flex items-center gap-1 shrink-0 rounded-full border border-[#dcd2ff] bg-white px-3 py-2.5 text-[12px] font-semibold text-[#5f2fd1] shadow-sm hover:bg-[#f7f3ff] transition-colors"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span className="max-w-[110px] truncate">{selectedArea}</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Value Prop Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-50 via-[#f0fdf4] to-emerald-50 p-3 border border-emerald-200/60">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-gray-900">
            Offline Store Checkout (Scan & Pay)
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
          Instant POS Approval
        </span>
      </div>

      {/* Stores List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-white border border-gray-100 p-4 animate-pulse"
            />
          ))}
        </div>
      ) : stores.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
          <p className="text-sm font-bold text-gray-800">No stores found near {selectedArea}</p>
          <p className="text-xs text-gray-500 mt-1">
            Try a different pincode or search for a major electronics store.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm hover:shadow-md hover:border-[#712CDC]/40 transition-all duration-200 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-950 group-hover:text-[#712CDC] transition-colors leading-tight">
                      {store.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{store.category}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    <MapPin className="w-3 h-3" />
                    {store.distanceKm} km
                  </span>
                </div>
              </div>

              {/* Address & Status */}
              <div className="space-y-1 text-xs text-gray-600 bg-gray-50/70 p-2.5 rounded-xl">
                <p className="text-[11.5px] leading-snug">{store.address}</p>
                <div className="flex items-center justify-between text-[10.5px] text-gray-500 pt-1">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Clock className="w-3 h-3" /> {store.timing}
                  </span>
                  <a
                    href={`tel:${store.phone}`}
                    className="flex items-center gap-1 text-[#712CDC] hover:underline"
                  >
                    <Phone className="w-3 h-3" /> Call Store
                  </a>
                </div>
              </div>

              {/* Footer action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {store.acceptedFinancing}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStore(store);
                    setPaymentResult(null);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#712CDC] hover:bg-[#6224c2] px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pay at Counter</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Location Selection Drawer matching app.1fi.in */}
      {showLocationDrawer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 animate-in fade-in duration-200">
          <div className="relative w-full max-w-[420px] bg-white rounded-[28px] overflow-hidden shadow-2xl my-auto p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-base font-bold text-gray-900">Select Your Location</h3>
              <button
                type="button"
                onClick={() => setShowLocationDrawer(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Use Current Location Button */}
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="w-full flex items-center gap-3 rounded-2xl border-[1.5px] border-[#712CDC] bg-purple-50/40 p-3.5 text-left text-[#712CDC] hover:bg-purple-50 transition-colors"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
                {isDetectingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#712CDC]" />
                ) : (
                  <Navigation className="h-4 w-4 text-[#712CDC]" />
                )}
              </span>
              <div>
                <span className="block text-sm font-bold text-gray-900">
                  {isDetectingLocation ? 'Detecting GPS...' : 'Use Current Location'}
                </span>
                <span className="block text-[11px] text-gray-500">
                  Grant location access to sort nearby stores
                </span>
              </div>
            </button>

            {/* Separator */}
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-semibold justify-center">
              <span className="h-px w-16 bg-gray-200" />
              <span>OR</span>
              <span className="h-px w-16 bg-gray-200" />
            </div>

            {/* Pincode Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                Enter Pincode
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 122002"
                  className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold outline-none focus:border-[#712CDC]"
                />
                <button
                  type="button"
                  onClick={handleApplyPincode}
                  className="px-4 py-2 rounded-xl bg-[#712CDC] text-white font-bold text-xs"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Pay at Store (POS) Counter Modal */}
      {activeStore && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 animate-in fade-in duration-200">
          <div className="relative w-full max-w-[440px] bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-[#712CDC]" />
                <h3 className="text-sm font-bold text-gray-900">
                  Pay at Counter • {activeStore.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveStore(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!paymentResult ? (
              <>
                {/* Enter Counter Bill Amount */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Enter Cashier Bill Amount:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 font-bold text-base">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(Number(e.target.value))}
                      className="w-full rounded-xl border border-gray-300 pl-8 pr-3 py-2.5 text-lg font-black text-gray-900 outline-none focus:border-[#712CDC] focus:ring-1 focus:ring-[#712CDC]"
                    />
                  </div>
                </div>

                {/* Tenure Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Choose 0% Interest Tenure:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 6, 12].map((tenure) => (
                      <button
                        key={tenure}
                        type="button"
                        onClick={() => setSelectedTenure(tenure)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedTenure === tenure
                            ? 'border-[#712CDC] bg-purple-50 text-[#712CDC] font-bold'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xs block">{tenure} Months</span>
                        <span className="text-[10px] text-gray-400 block font-normal">
                          {formatINR(Math.round(billAmount / tenure))}/mo
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mutual Fund Guarantee */}
                <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                  <p className="font-semibold flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" /> Backed by your Mutual Funds:
                  </p>
                  <p className="text-[11px] text-gray-600">
                    No credit card or cash required. Lien will be marked on{' '}
                    <strong>{formatINR(Math.round(billAmount * 1.25))}</strong> of units.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isProcessingPayment || billAmount <= 0}
                  onClick={handleProcessInStorePay}
                  className="w-full py-3 px-4 rounded-xl bg-[#712CDC] hover:bg-[#6224c2] text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Merchant QR...</span>
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      <span>Generate Merchant In-Store QR</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              /* POS Payment Confirmation */
              <div className="space-y-4 text-center py-2">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="text-base font-black text-gray-900">
                    In-Store Payment Authorized!
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Show this QR or code to the cashier at <strong>{activeStore.name}</strong>.
                  </p>
                </div>

                {/* Simulated QR Box */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center space-y-2">
                  <div className="h-32 w-32 bg-white p-2 border border-gray-200 rounded-xl shadow-xs flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-900" />
                  </div>
                  <span className="font-mono text-sm font-black tracking-widest text-[#712CDC]">
                    {paymentResult.transactionId}
                  </span>
                  <span className="text-[10.5px] text-gray-400">
                    Valid for 15 minutes at cashier terminal
                  </span>
                </div>

                <div className="text-left text-xs bg-purple-50/50 p-3 rounded-xl border border-purple-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount Paid to Store:</span>
                    <span className="font-bold text-gray-900">{formatINR(paymentResult.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Your Monthly Installment:</span>
                    <span className="font-bold text-[#712CDC]">
                      {formatINR(paymentResult.monthlyEMI)} / mo ({paymentResult.tenureMonths}M)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStore(null)}
                  className="w-full py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
