export interface ClientResponse {
  success: true
  data: {}
}

export interface BalanceRequest {
  corrId: string
  userId: string
  password: string
  token: string
}

export interface ParsedBalanceResponse {}

export interface ActivationRequest {
  corrId: string
  userid: string
  password: string
  token: string
  loadAmount: string
  txnDesc: string
}

export interface ActivationResponse {}

export interface LoadRequest {
  corrId: string
  userid: string
  password: string
  token: string
  loadAmount: string
  txnDesc: string
}

export interface ParsedLoadResponse {}

export interface RegisterRequest {
  corrId: string
  userid: string
  password: string
  token: string
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  StateProvince: string
  countryIso: string
  phone: string
  securityQ: string
  securityA: string
  zipPostal: string
  memberId: string
  loyaltyPassword: string
  IDType: string
  IDNumber: string
  address2: string
}

export interface ParsedRegisterResponse {}
