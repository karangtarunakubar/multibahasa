// Global State Object
const donationState = {
    userId: null,           // Populate dynamically from session/auth (e.g., 'usr_98765')
    frequency: 'one-time',  // 'one-time' or 'monthly'
    amount: 250000,         // Selected amount in IDR
    paymentMethod: 'qris',  // 'qris', 'transfer', or 'ewallet'
    permissions: {
        terms: false,       // Terms & Conditions agreed
        billingAuth: false  // Recurring / Single payment authorization
    }
};

// Initialize State & Events on Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set user_id if logged in (Example: fetch from window metadata or dataset)
    donationState.userId = window.currentUserId || 'guest_user';

    // 2. Add event listeners to permissions checkboxes
    document.getElementById('perm-terms').addEventListener('change', (e) => {
        donationState.permissions.terms = e.target.checked;
        hideError();
    });

    document.getElementById('perm-recurring').addEventListener('change', (e) => {
        donationState.permissions.billingAuth = e.target.checked;
        hideError();
    });

    // 3. Initial UI Sync
    updateDonateButtonUI();
});

// Toggle Frequency (One-Time / Monthly)
function setFrequency(type) {
    donationState.frequency = type;

    const btnOneTime = document.getElementById('freq-one-time');
    const btnMonthly = document.getElementById('freq-monthly');
    const recurringLabel = document.getElementById('recurring-permission-label');

    if (type === 'one-time') {
        btnOneTime.className = 'py-2.5 px-4 text-sm font-medium rounded-xl transition-all bg-white text-emerald-700 shadow-sm';
        btnMonthly.className = 'py-2.5 px-4 text-sm font-medium rounded-xl transition-all text-slate-600 hover:text-slate-900';
        recurringLabel.textContent = 'Saya menyetujui pemotongan saldo sekali bayar untuk transaksi donasi ini.';
    } else {
        btnMonthly.className = 'py-2.5 px-4 text-sm font-medium rounded-xl transition-all bg-white text-emerald-700 shadow-sm';
        btnOneTime.className = 'py-2.5 px-4 text-sm font-medium rounded-xl transition-all text-slate-600 hover:text-slate-900';
        recurringLabel.textContent = 'Saya mengizinkan pemotongan saldo otomatis setiap bulan sesuai nominal yang dipilih.';
    }
}

// Select Predefined Tier Amount
function selectAmount(amount) {
    donationState.amount = Number(amount);
    
    // Clear Custom Input
    document.getElementById('custom-amount').value = '';

    // Reset Tier Buttons Styling
    const buttons = document.querySelectorAll('.tier-btn');
    buttons.forEach(btn => {
        btn.className = 'tier-btn py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-600 transition-all text-center group bg-white';
        const subtext = btn.querySelector('span:nth-child(2)');
        if (subtext) subtext.className = 'block text-[11px] font-normal text-slate-400 mt-0.5';
    });

    // Highlight Selected Tier Target
    const selectedBtn = event.currentTarget;
    selectedBtn.className = 'tier-btn py-3 px-4 rounded-2xl border-2 border-emerald-500 font-bold text-emerald-700 bg-emerald-50/50 transition-all text-center group shadow-sm active-tier';
    const activeSubtext = selectedBtn.querySelector('span:nth-child(2)');
    if (activeSubtext) activeSubtext.className = 'block text-[11px] font-normal text-emerald-600/80 mt-0.5';

    updateDonateButtonUI();
}

// Custom Amount Handling
function handleCustomInput(val) {
    const numericVal = parseInt(val, 10);

    // Reset Tier Styles since custom input is used
    document.querySelectorAll('.tier-btn').forEach(btn => {
        btn.className = 'tier-btn py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-600 transition-all text-center group bg-white';
        const subtext = btn.querySelector('span:nth-child(2)');
        if (subtext) subtext.className = 'block text-[11px] font-normal text-slate-400 mt-0.5';
    });

    donationState.amount = isNaN(numericVal) || numericVal <= 0 ? 0 : numericVal;
    updateDonateButtonUI();
}

// Select Payment Method
function selectPayment(method) {
    donationState.paymentMethod = method;

    const paymentButtons = {
        qris: document.getElementById('pay-qris'),
        transfer: document.getElementById('pay-transfer'),
        ewallet: document.getElementById('pay-ewallet')
    };

    // Reset all options
    Object.keys(paymentButtons).forEach(key => {
        paymentButtons[key].className = 'pay-btn flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-slate-200 hover:border-slate-300 text-slate-600 transition-all bg-white';
    });

    // Highlight Active Selection
    paymentButtons[method].className = 'pay-btn flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 text-emerald-700 transition-all';
}

// Format Currency Display
function updateDonateButtonUI() {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(donationState.amount);

    document.getElementById('donate-btn-amount').textContent = formattedAmount;
}

// Validation & Submission Handler
function handleDonate() {
    // 1. Minimum Amount Check
    if (donationState.amount < 10000) {
        showError('Nominal donasi minimal Rp10.000.');
        return;
    }

    // 2. Terms Checkbox Validation
    if (!donationState.permissions.terms) {
        showError('Mohon centang persetujuan Syarat & Ketentuan untuk melanjutkan.');
        return;
    }

    // 3. Billing Authorization Checkbox Validation
    if (!donationState.permissions.billingAuth) {
        showError('Mohon centang otorisasi pemotongan saldo untuk melanjutkan.');
        return;
    }

    // Clear Errors
    hideError();

    // Construct Payload
    const payload = {
        user_id: donationState.userId,
        amount: donationState.amount,
        frequency: donationState.frequency,
        payment_method: donationState.paymentMethod,
        permissions: {
            terms_and_conditions: donationState.permissions.terms,
            billing_authorization: donationState.permissions.billingAuth,
            authorized_at: new Date().toISOString()
        }
    };

    // Submit Action (Example API call)
    console.log('Donation Payload Submitted:', payload);
    
    // Replace with your API Gateway / Payment Endpoint
    /*
    fetch('/api/v1/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => window.location.href = data.payment_url);
    */
}

// UI Alert Helpers
function showError(message) {
    const alertBox = document.getElementById('error-alert');
    const alertText = document.getElementById('error-text');
    alertText.textContent = message;
    alertBox.classList.remove('hidden');
}

function hideError() {
    const alertBox = document.getElementById('error-alert');
    alertBox.classList.add('hidden');
}
