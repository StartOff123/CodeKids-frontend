import React from 'react'
import './forms.scss'

const Сonfirmation = ({ title, object, btnContent, action, onClose }) => {

  const onSubmit = (e) => {
    e.preventDefault()
    action()
    onClose()
  } 

  return (
    <form onSubmit={onSubmit} className='form' style={{ maxWidth: 400 }}>
      <div className='confirmationText'>
        <p>{title}</p>
      </div>
      <div className='confirmationBtn'>
        <button type='submit' className='form-button'>{btnContent}</button>
        <button type='button' onClick={onClose} className='form-button'>Отмена</button>
      </div>
    </form>
  )
}

export default Сonfirmation