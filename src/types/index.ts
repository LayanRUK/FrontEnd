export type Product = {
  id: string
  name: string
  price:number
  image:string
  description: string
}

export type User=
{
  id: string,
  name: string,
  email: string,
  role: string
}
export const ROLE ={
  Admin :"Admin",
  Customer:"Customer"
} as const
export type DecodedUser={
  aud:string
  emailaddress:string
  exp:string
  iss:string
  name :string
  nameidentifier:string
  role: keyof typeof ROLE
}