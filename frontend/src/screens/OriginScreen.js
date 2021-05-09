import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveOriginInfo } from '../actions/cartActions'
import "../index.css"

const OriginScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { originInfo } = cart

  const [account, setAccount] = useState(originInfo.account)
  const [password, setPassword] = useState(originInfo.password)
  const [securityCode, setSecurityCode] = useState(originInfo.securityCode)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveOriginInfo({ account, password, securityCode }))
    history.push('/placeOrder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Origin Information</h1>
      <Form onSubmit={submitHandler} className="formContainer">
        <Form.Group controlId='account'>
          <Form.Label>Account</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter account'
            value={account}
            required
            onChange={(e) => setAccount(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='securityCode'>
          <Form.Label>Security Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter security code'
            value={securityCode}
            required
            onChange={(e) => setSecurityCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default OriginScreen
