import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import swal from 'sweetalert'
import EditUser from './EditUser'

import axios from 'axios'

const UserTable = ({ user, getData, sortingTable, manager }) => {
  const [order, setOrder] = useState('desc')
  const [userToEdit, setUserToEdit] = useState()
  const [showEdit, setShowEdit] = useState(false)

  const deleteUser = async user => {
    try {
      if (user.role === 'manager') {
        swal('No!', 'Impossible to delete a user that is a manager', 'info')
      } else {
        swal({
          title: 'Are you sure?',
          text: 'Once you delete, you will not be able to recover this user!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then(confirmDelete => {
          if (confirmDelete) {
            axios.post(`http://localhost:3000/deleteUser/${user._id}`)
            getData()
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const sortData = col => {
    try {
      if (order === 'asc') {
        switch (col) {
          case 'firstName':
            const sortByFirstName = user.sort((a, b) =>
              a.firstName === b.firstName
                ? 0
                : a.firstName < b.firstName
                ? -1
                : 1
            )
            sortingTable(sortByFirstName)
            setOrder('desc')
            break

          case 'lastName':
            const sortByLastName = user.sort((a, b) =>
              a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1
            )
            sortingTable(sortByLastName)
            setOrder('desc')
            break

          case 'email':
            const sortByEmail = user.sort((a, b) =>
              a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1
            )
            sortingTable(sortByEmail)
            setOrder('desc')
            break

          case 'dateStarted':
            const sortByDate = user.sort(
              (a, b) => new Date(b.dateStarted) - new Date(a.dateStarted)
            )
            sortingTable(sortByDate)
            setOrder('desc')
            break

          case 'role':
            const sortByRole = user.sort((a, b) =>
              a.role === b.role ? 0 : a.role < b.role ? -1 : 1
            )
            sortingTable(sortByRole)
            setOrder('desc')
            break

          case 'salary':
            const sortBySalary = user.sort((a, b) =>
              a.salary === b.salary ? 0 : a.salary < b.salary ? -1 : 1
            )
            sortingTable(sortBySalary)
            setOrder('desc')
            break

          default:
            break
        }
      } else if (order === 'desc') {
        switch (col) {
          case 'firstName':
            const sortByFirstName = user.sort((a, b) =>
              b.firstName === a.firstName
                ? 0
                : b.firstName < a.firstName
                ? -1
                : 1
            )
            sortingTable(sortByFirstName)
            setOrder('asc')
            break

          case 'lastName':
            const sortByLastName = user.sort((a, b) =>
              b.lastName === a.lastName ? 0 : b.lastName < a.lastName ? -1 : 1
            )
            sortingTable(sortByLastName)
            setOrder('asc')
            break

          case 'email':
            const sortByEmail = user.sort((a, b) =>
              b.email === a.email ? 0 : b.email < a.email ? -1 : 1
            )
            sortingTable(sortByEmail)
            setOrder('asc')
            break

          case 'dateStarted':
            const sortByDate = user.sort(
              (a, b) => new Date(a.dateStarted) - new Date(b.dateStarted)
            )
            sortingTable(sortByDate)
            setOrder('asc')
            break

          case 'role':
            const sortByRole = user.sort((a, b) =>
              b.role === a.role ? 0 : b.role < a.role ? -1 : 1
            )
            sortingTable(sortByRole)
            setOrder('asc')
            break

          case 'salary':
            const sortBySalary = user.sort((a, b) =>
              b.salary === a.salary ? 0 : b.salary < a.salary ? -1 : 1
            )
            sortingTable(sortBySalary)
            setOrder('asc')
            break

          default:
            break
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editUser = userId => {
    setUserToEdit(userId)
    handleShow()
  }

  const handleClose = () => setShowEdit(false)

  const handleShow = () => setShowEdit(true)

  const searchManager = managerId => {
    let managerPerson = manager.find(person => person._id === managerId)
    if (managerPerson)
      return `${managerPerson.firstName} ${managerPerson.lastName}`
  }

  return (
    <>
      <Table striped bordered hover responsive='xl' variant='dark'>
        <thead>
          <tr>
            <th onClick={() => sortData('firstName')}>
              First Name <i className='fa fa-fw fa-sort' role='button'></i>{' '}
            </th>
            <th onClick={() => sortData('lastName')}>
              Last Name<i className='fa fa-fw fa-sort' role='button'></i>
            </th>
            <th onClick={() => sortData('email')}>
              Email<i className='fa fa-fw fa-sort' role='button'></i>
            </th>
            <th onClick={() => sortData('dateStarted')}>
              Date Started<i className='fa fa-fw fa-sort' role='button'></i>
            </th>
            <th onClick={() => sortData('role')}>
              Role<i className='fa fa-fw fa-sort' role='button'></i>
            </th>
            <th onClick={() => sortData('salary')}>
              Salary<i className='fa fa-fw fa-sort' role='button'></i>
            </th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map(item => (
            <tr key={item._id}>
              <td className='text-capitalize'>{item.firstName}</td>
              <td className='text-capitalize'>{item.lastName}</td>
              <td>{item.email}</td>
              <td>
                <Moment format='DD/MM/YYYY'>{item.dateStarted}</Moment>
              </td>
              <td className='text-capitalize'>{item.role}</td>
              <td>${item.salary}</td>
              <td>{item.managerId ? searchManager(item.managerId) : null}</td>
              <td>
                <i
                  role='button'
                  className='fa fa-fw fa-pencil'
                  onClick={() => editUser(item._id)}
                ></i>
                <i
                  role='button'
                  className='fa fa-fw fa-trash'
                  onClick={() => deleteUser(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditUser
        {...{ showEdit, userToEdit, handleClose, handleShow, getData, manager }}
      />
    </>
  )
}

export default UserTable
