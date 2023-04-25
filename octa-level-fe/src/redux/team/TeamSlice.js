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
      return {
        ...state,
        teams: [...state.teams, payload.newTeam],
      }
    },
    updateTeam: (state, { payload }) => {
      const newArray = state.teams.map(element => {
        if (element.team._id === payload.updatedTeam._id) {
          return {
            ...element,
            team: payload.updatedTeam,
          }
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
