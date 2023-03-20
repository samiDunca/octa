import { createSlice } from '@reduxjs/toolkit'

const AssessmentSlice = createSlice({
  name: 'AssessmentSlice',
  initialState: {
    assessments: [],
    currentAssessment: null,
  },
  reducers: {
    getAllAssessments: (state, action) => {
      return {
        ...state,
        assessments: action.payload.assessments,
      }
    },
    addNewAssessment: (state, action) => {
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      }
    },
    getAssessmentByID: (state, action) => {},
    storeOneAssessment: (state, action) => {
      return {
        ...state,
        currentAssessment: action.payload,
      }
    },
  },
})

export const AssessmentActions = AssessmentSlice.actions

export default AssessmentSlice
