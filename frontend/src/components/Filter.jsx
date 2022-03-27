import React, { useState, useEffect } from 'react'
import { Form, Row } from 'react-bootstrap'
import axios from 'axios'

const Filter = ({ manager, handleFilter }) => {

  const onChange = e => {
    try {
      handleFilter(e.target.value)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Form.Group as={Row}>
        <Form.Select name='managerId' id='managerId' onChange={onChange}>
          <option value={''} disabled>
            Filter by Manager
          </option>
          <option value={''}>ALL DATA</option>

          {manager.map(item => (
            <option key={item._id} value={item._id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  )
}

export default Filter
