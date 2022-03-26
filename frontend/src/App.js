import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import UserTable from './components/UserTable'
import AddUser from './components/AddUser'

import axios from 'axios'

function App () {
  const [user, setUser] = useState([])
  const [manager, setManager] = useState([])

  useEffect(() => {
    try {
      getData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const getData = async () => {
    const allUsers = await axios.get(`http://localhost:3000/getUsers`)
    setUser(allUsers.data)

    const allManagers = allUsers.data.filter(user => user.role === 'manager')
    setManager(allManagers)
  }

  const sortingTable = tableSort => {
    setUser(tableSort)
  }

  return (
    <>
      <Header />
      <AddUser {...{ getData, manager }} />
      <UserTable {...{ user, getData, sortingTable, manager }} />
    </>
  )
}

export default App
