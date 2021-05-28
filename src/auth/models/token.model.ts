export interface PayloadToken {
  role: string;
  sub: SubToken;
}

export interface SubToken {
  userId: number;
  customerId: number;
}
