import axios from "axios"
import { atomWithRefresh, unwrap } from "jotai/utils"
import { api } from "../api/api"
import { atom } from "jotai"

export const paramsAtom = atom({ search: "", page: 1, limit: 5, select: "all" })
export const getData = atomWithRefresh(async (get) => {
   const params = get(paramsAtom)
   try {
      const { data } = await axios.get(api, {
         params: {
            name: params.search,
            page: params.page,
            limit: params.limit,
            status: !params?.select || params?.select === 'all' ? undefined : params?.select,
         },
      })
      return data
   } catch (error) {
      console.error(error, "error data get")
      return []
   }
})

export const deleteUser = atom(null, async (get, set, id) => {
   try {
      await axios.delete(`${api}/${id}`)
      set(getData)
   } catch (error) {
      console.error(error, "delete hotoshd")
   }
})

export const addUser = atom(null, async (get, set, user) => {
   try {
      await axios.post(api, user)
      set(getData)
   } catch (error) {
      console.error(error)
   }
})

export const editUser = atom(null, async (get, set, user) => {
   try {
      await axios.put(`${api}/${user?.id}`, user)
      set(getData)
   } catch (error) {
      console.error(error)
   }
})

export const dataJotai = unwrap(getData, (prev) => prev || [])
