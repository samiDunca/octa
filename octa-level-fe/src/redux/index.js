import { configureStore } from '@reduxjs/toolkit'
import AssessmentSlice from 'redux/assessment/AssessmentSlice'
import RoleSlice from 'redux/role/RoleSlice'
import AuthSlice from 'redux/authentication/(re)setPassword/SetPasswordSlice'
import EmployeeSlice from 'redux/employee/EmployeeSlice'

const store = configureStore({
  reducer: {
    assessment: AssessmentSlice.reducer,
    role: RoleSlice.reducer,
    employee: EmployeeSlice.reducer,
    auth: AuthSlice.reducer,
  },
})

export default store
