import { configureStore } from '@reduxjs/toolkit'
import AssessmentSlice from 'redux/assessment/AssessmentSlice'
import RoleSlice from 'redux/role/RoleSlice'

const store = configureStore({
  reducer: {
    assessment: AssessmentSlice.reducer,
    role: RoleSlice.reducer,
  },
})

export default store
