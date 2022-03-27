import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Col, Button, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import Error from './Error'

const EditUser = ({ showEdit, userToEdit, handleClose, getData, manager }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    role: '',
    managerId: ''
  })
  const [errorName, setErrorName] = useState(false)
  const [errorLastName, setErrorLastName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorSalary, setErrorSalary] = useState(false)
  const [errorRole, setErrorRole] = useState(false)
  const [errorManagerId, setErrorManagerId] = useState(false)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    try {
      const getUserData = async () => {
        const userEdit = await axios.get(
          `http://localhost:3000/userData/${userToEdit}`
        )

        let managerName
        if (userEdit.data.managerId) {
          let managerPerson = manager.find(
            person => person._id === userEdit.data.managerId
          )
          if (managerPerson)
            managerName = `${managerPerson.firstName} ${managerPerson.lastName}`
        }

        setUserData({
          firstName: userEdit.data.firstName,
          lastName: userEdit.data.lastName,
          email: userEdit.data.email,
          salary: userEdit.data.salary,
          role: userEdit.data.role,
          managerId: managerName
        })
      }
      if (userToEdit) {
        getUserData()
      }
    } catch (error) {
      console.error(error)
    }
  }, [userToEdit])

  const { firstName, lastName, email, salary, role, managerId } = userData

  const onChange = e => {
    try {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      })

      if (userData.role === 'manager') {
        setWarning(true)
      } else {
        setWarning(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeNumber = e => {
    try {
      setUserData({
        ...userData,
        [e.target.name]: e.target.valueAsNumber
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()
      if (userData.firstName.trim() === '') {
        setErrorName(true)
        return
      } else {
        setErrorName(false)
      }

      if (userData.lastName.trim() === '') {
        setErrorLastName(true)
        return
      } else {
        setErrorLastName(false)
      }
      if (userData.email.trim() === '') {
        setErrorEmail(true)
        return
      } else {
        setErrorEmail(false)
      }
      if (isNaN(userData.salary)) {
        setErrorSalary(true)
        return
      } else {
        setErrorSalary(false)
      }
      if (userData.role.trim() === '') {
        setErrorRole(true)
        return
      } else {
        setErrorRole(false)
      }
      if (userData.managerId.trim() === '' && userData.role !== 'manager') {
        setErrorManagerId(true)
        return
      } else {
        setErrorManagerId(false)
      }

      const result = await axios.post(
        `http://localhost:3000/updateUser/${userToEdit}`,
        userData
      )
      swal('Yes!', result.data, 'success')
      handleClose()
      getData()
    } catch (error) {
      console.error(error)
      swal('Oh no!', error.response.data, 'error')
    }
  }

  return (
    <>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {warning ? (
            <Error message="Please use the filters to check if this Manager doesn't have any employee under his charge" />
          ) : null}

          <Form onSubmit={onSubmit}>
            <Form.Group as={Col}>
              <Form.Label htmlFor='firstName'>Name</Form.Label>
              <Form.Control
                className='w-100'
                type='text'
                value={firstName}
                onChange={onChange}
                name='firstName'
                id='firstName'
                placeholder='Enter the name'
                required
              />
            </Form.Group>
            {errorName ? <Error message='Please complete your name' /> : null}

            <Form.Group as={Col}>
              <Form.Label htmlFor='lastName'>Last Name</Form.Label>
              <Form.Control
                className='w-100'
                type='text'
                value={lastName}
                onChange={onChange}
                name='lastName'
                id='lastName'
                placeholder='Enter the last name'
                required
              />
            </Form.Group>
            {errorLastName ? (
              <Error message='Please complete your last name' />
            ) : null}

            <Form.Group as={Col}>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                className='w-100'
                type='email'
                value={email}
                onChange={onChange}
                name='email'
                id='email'
                placeholder='Enter the email'
                required
              />
            </Form.Group>
            {errorEmail ? <Error message='Please complete your email' /> : null}

            <Form.Group as={Col}>
              <Form.Label htmlFor='salary'>Salary</Form.Label>
              <Form.Control
                className='w-100'
                type='number'
                value={salary}
                onChange={onChangeNumber}
                name='salary'
                id='salary'
                placeholder='Enter the salary'
                min='0'
              />
            </Form.Group>
            {errorSalary ? (
              <Error message='Please complete your salary' />
            ) : null}

            <Form.Group as={Col}>
              <Form.Label htmlFor='role'>Role</Form.Label>
              <Form.Select
                name='role'
                id='role'
                value={userData.role}
                onChange={onChange}
                required
              >
                <option value='manager'>Manager</option>
                <option value='worker'>Worker</option>
                <option value='driver'>Driver</option>
              </Form.Select>
            </Form.Group>
            {errorRole ? <Error message='Please select a role' /> : null}

            <Form.Group as={Col}>
              <Form.Label htmlFor='managerId'>Manager</Form.Label>
              <Form.Select
                name='managerId'
                id='managerId'
                required={userData.role !== 'manager'}
                disabled={userData.role === 'manager'}
                defaultValue={managerId}
                onChange={onChange}
              >
                {manager.map(item => (
                  <option key={item._id} value={item._id}>
                    {item.firstName} {item.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {errorManagerId ? (
              <Error message="A manager couldn't have a manager" />
            ) : null}

            <div className='d-flex justify-content-around mt-4'>
              <Button variant='success' type='submit'>
                Edit user
              </Button>
              <Button variant='danger' onClick={handleClose}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditUser
