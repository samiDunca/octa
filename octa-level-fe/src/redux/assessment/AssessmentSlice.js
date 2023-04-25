import { createSlice, current } from '@reduxjs/toolkit'

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
        assessments: [...state.assessments, action.payload.newAssessment],
      }
    },
    updateAssessment: (state, { payload }) => {
      console.log(current(state.assessments))
      console.log(payload.updatedAssessment.assessment._id)
      const index = state.assessments.findIndex(
        ({ assessment }) => assessment._id === payload.updatedAssessment.assessment._id,
      )
      const newArray = [...state.assessments]
      newArray.splice(index, 1, payload.updatedAssessment)
      return {
        ...state,
        assessments: newArray,
      }
    },
    getAssessmentByID: (state, action) => {},
    storeOneAssessment: (state, action) => {
      return {
        ...state,
        currentAssessment: action.payload,
      }
    },
    deleteAssessment: (state, { payload }) => {
      const index = state.assessments.findIndex(el => el.client._id === payload.clientId)
      const newArray = [...state.assessments]
      newArray.splice(index, 1)
      return {
        ...state,
        assessments: newArray,
      }
    },
  },
})

export const AssessmentActions = AssessmentSlice.actions

export default AssessmentSlice
