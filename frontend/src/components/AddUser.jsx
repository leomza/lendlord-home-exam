import React, { useState } from 'react'
import axios from 'axios'
import { Form, Col, Button, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import Error from './Error'

const AddUser = ({ getData, manager }) => {
  const [show, setShow] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorLastName, setErrorLastName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorSalary, setErrorSalary] = useState(false)
  const [errorRole, setErrorRole] = useState(false)
  const [errorManagerId, setErrorManagerId] = useState(false)

  const handleClose = () => {
    setShow(false)
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      dateStarted: '',
      salary: '',
      role: '',
    })
  }

  const handleShow = () => setShow(true)

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '',
    salary: '',
    role: '',
    managerId: ''
  })

  const { firstName, lastName, email, dateStarted, salary } = user

  const onChange = e => {
    try {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeNumber = e => {
    try {
      setUser({
        ...user,
        [e.target.name]: e.target.valueAsNumber
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()
      if (user.firstName.trim() === '') {
        setErrorName(true)
        return
      } else {
        setErrorName(false)
      }

      if (user.lastName.trim() === '') {
        setErrorLastName(true)
        return
      } else {
        setErrorLastName(false)
      }

      if (user.email.trim() === '') {
        setErrorEmail(true)
        return
      } else {
        setErrorEmail(false)
      }

      if (isNaN(user.salary)) {
        setErrorSalary(true)
        return
      } else {
        setErrorSalary(false)
      }

      if (user.role.trim() === '') {
        setErrorRole(true)
        return
      } else {
        setErrorRole(false)
      }

      if (user.managerId.trim() === '' && user.role !== 'manager') {
        setErrorManagerId(true)
        return
      } else {
        setErrorManagerId(false)
      }

      const result = await axios.post(`http://localhost:3000/newUser`, user)
      swal('Yes!', result.data, 'success')
      setShow(false)
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        salary: '',
        role: '',
        managerId: ''
      })
      getData()
    } catch (error) {
      console.error(error)
      swal('Oh no!', error.response.data, 'error')
    }
  }

  return (
    <>
      <Button className='mb-2 ms-2' variant='primary' onClick={handleShow}>
        <i className='fa fa-fw fa-plus'></i> Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <Form.Label htmlFor='dateStarted'>Date Started</Form.Label>
              <Form.Control
                className='w-100'
                type='date'
                value={dateStarted}
                onChange={onChange}
                name='dateStarted'
                id='dateStarted'
              />
            </Form.Group>

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
              <Form.Select name='role' id='role' onChange={onChange} required>
                <option value={''}>No selected</option>
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
                required={user.role !== 'manager'}
                disabled={user.role === 'manager'}
                onChange={onChange}
              >
                <option value={''}>No selected</option>

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
                Add new user
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

export default AddUser
