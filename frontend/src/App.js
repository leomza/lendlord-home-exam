import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import UserTable from './components/UserTable'
import AddUser from './components/AddUser'
import Filter from './components/Filter'

import axios from 'axios'

function App () {
  const [user, setUser] = useState([])
  const [manager, setManager] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    try {
      if (filter !== '') {
        filterData()
      } else {
        getData()
      }
    } catch (error) {
      console.error(error)
    }
  }, [filter])

  const getData = async () => {
    const allUsers = await axios.get(`http://localhost:3000/getUsers`)
    setUser(allUsers.data)

    const allManagers = allUsers.data.filter(user => user.role === 'manager')
    setManager(allManagers)
  }

  const filterData = async () => {
    const usersFiltered = await axios.get(
      `http://localhost:3000/getManagerAndEmployees/${filter}`
    )
    setUser(usersFiltered.data.inCharge)
  }

  const sortingTable = tableSort => {
    setUser(tableSort)
  }

  const handleFilter = managerId => {
    setFilter(managerId)
  }

  return (
    <>
      <Header />
      <div className='d-flex justify-content-around mt-4 mb-4'>
        <AddUser {...{ getData, manager }} />
        <Filter className='w-50' {...{ manager, setUser, handleFilter }} />
      </div>
      <UserTable {...{ user, getData, sortingTable, manager }} />
    </>
  )
}

export default App
