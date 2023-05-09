import { createSlice, current } from '@reduxjs/toolkit'

const TeamSlice = createSlice({
  name: 'TeamSlice',
  initialState: {
    teams: [],
  },
  reducers: {
    getAllTeams: (state, { payload }) => {
      return {
        ...state,
        teams: payload.teams,
      }
    },
    getTeam: (state, { payload }) => {},
    addTeam: (state, { payload }) => {
      console.log(payload.newTeam)
      return {
        ...state,
        teams: [...state.teams, payload.newTeam],
      }
    },
    updateTeam: (state, { payload }) => {
      console.log(current(state))
      console.log(payload.updatedTeam)
      const newArray = state.teams.map(element => {
        if (element._id === payload.updatedTeam._id) {
          return payload.updatedTeam
        } else {
          return element
        }
      })

      return {
        ...state,
        teams: newArray,
      }
    },
    deleteTeam: (state, { payload }) => {},
  },
})

export const TeamActions = TeamSlice.actions

export default TeamSlice
