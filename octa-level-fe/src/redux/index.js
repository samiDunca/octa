import { configureStore } from '@reduxjs/toolkit'
import AssessmentSlice from 'redux/assessment/AssessmentSlice'
import RoleSlice from 'redux/role/RoleSlice'
import AuthSlice from 'redux/authentication/AuthSlice'
import EmployeeSlice from 'redux/employee/EmployeeSlice'
import OfferSlice from 'redux/offer/OfferSlice'
import ClientSlice from 'redux/client/ClientSlice'
import OrderSlice from 'redux/order/OrderSlice'
import MontageSlice from 'redux/montage/MontageSlice'
import TeamSlice from 'redux/team/TeamSlice'

const store = configureStore({
  reducer: {
    assessment: AssessmentSlice.reducer,
    role: RoleSlice.reducer,
    employee: EmployeeSlice.reducer,
    auth: AuthSlice.reducer,
    offer: OfferSlice.reducer,
    client: ClientSlice.reducer,
    order: OrderSlice.reducer,
    montage: MontageSlice.reducer,
    team: TeamSlice.reducer,
  },
})

export default store
