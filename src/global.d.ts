export interface ClientResponse {
  success: boolean
  data: {}
}

export interface BalanceRequest {
  corrId: string
  userId: string
  password: string
  token: string
}

export interface ActivationRequest {
  corrId: string
  userid: string
  password: string
  token: string
  loadAmount: string
  txnDesc: string
}
export interface LoadRequest {
  corrId: string
  userid: string
  password: string
  token: string
  loadAmount: string
  txnDesc: string
}

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
