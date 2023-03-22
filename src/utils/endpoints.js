// export const BASE_URL = `https://api.onit.services/`; //Production
export const BASE_URL = `https://api.onit.fit/`;   //Testing
export const RAZORPAY_API_KEY = `rzp_live_yr00EgqO9pvjDt`;
export const UPLOAD_URL = `${BASE_URL}common/upload-image/`;

export const GET_ALL_SERVICES = `${BASE_URL}admin/get-all-services`;
export const GET_OPPORTUNITY_IN_YOUR_AREA = `${BASE_URL}technicianApp/get-opportunity-in-your-area`
export const GET_ALL_TECHNICIAN = `${BASE_URL}technicianapp/get-all-technician-center`;
export const REGISTER_CENTER_SEND_OTP = `${BASE_URL}center/register-center-send-otp-via-app`;
export const SEND_OTP = `${BASE_URL}technician/sent-otp`;
export const LOGIN_WITH_OTP = `${BASE_URL}technician/login-with-otp`;
export const GET_USER_DETAILS = `${BASE_URL}technicianapp/get-user-details`;
export const VERIFY_OTP = `${BASE_URL}center/verify-otp-via-app`;
export const UPDATE_TICKET_DETAILS = `${BASE_URL}technicianapp/update-ticket-details`;
export const UPDATE_TECHNICIAN = `${BASE_URL}technicianApp/update_technician`;
export const CREATE_NEW_TECHNICIAN = `${BASE_URL}technicianapp/create-new-technician`;
export const ASSIGN_TECHNICIAN = `${BASE_URL}technicianapp/assign-technician`;

export const CREATE_NEW_TICKET = `${BASE_URL}technicianapp/create-new-ticket`;
export const UPDATE_TICKET = `${BASE_URL}technicianapp/update-ticket-details`;
export const GET_BROADCAST_TICKET = `${BASE_URL}technicianApp/get-pending-tickets`;
export const GET_ACCEPTED_TICKETS = `${BASE_URL}technicianApp/current-tickets?ticketStatus=PENDING&ticketStatus=ACCEPTED`;
export const GET_CLOSED_TICKETS = `${BASE_URL}technicianApp/current-tickets?ticketStatus=CLOSED`;

export const ACCEPT_BROADCAST_TICKET = `${BASE_URL}technicianapp/accepted-broadcast-request`;
export const ACCEPT_TICKET_AFTER_PAYMENT = `${BASE_URL}technicianapp/accept-ticket-after-payment`;

export const PAY_ONBOARDING_KIT = `${BASE_URL}technicianApp/pay-onboarding-kit`;
export const AFTER_PAYMENT_PAY_ONBOARDING_KIT = `${BASE_URL}/technicianApp/after-payment-pay-onboarding-kit`
export const GET_WALLET_BALANCE = `${BASE_URL}payment/wallet-balance`

//Image upload endpoints

export const TECHNICIAN_PAN_CARD = `${UPLOAD_URL}TECHNICIAN_PAN_CARD`;
export const AADHAR_FRONT_IMAGE = `${UPLOAD_URL}AADHAR_FRONT_IMAGE`;
export const AADHAR_BACK_IMAGE = `${UPLOAD_URL}AADHAR_BACK_IMAGE`;
export const TECHNICIAN_COMPANY_WORKED_WITH_CERTIFICATE = `${UPLOAD_URL}TECHNICIAN_COMPANY_WORKED_WITH_CERTIFICATE`;
export const TECHNICIAN_PROFILE_PICTURE = `${UPLOAD_URL}TECHNICIAN_PROFILE_PICTURE`;