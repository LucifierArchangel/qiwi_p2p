import { BillAmount } from './BillAmount'
import { BillCustomer } from './BillCustomer'
import { BillCustomFields } from './BillCustomFields'

type BillCreate = {
    amount: BillAmount
    expirationDateTime: string
    customer?: BillCustomer
    comment?: string
    customFields?: BillCustomFields
}

export { BillCreate }
