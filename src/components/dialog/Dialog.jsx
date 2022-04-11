import React, {useState} from 'react'

import './dialog.scss'

const Dialog = (props) => {


  return (
    <div className={`dialog ${props.active ? 'active' : '' }`}>
      <div className="dialog__content">
        <div className="dialog__header">
          {props.title}
        </div>
        <div className="dialog__body">
          {props.content}
        </div>
        <div className="dialog__footer">
          <div onClick={props.confirm} className="dialog__footer__btn confirm">
            {props.text_confirm}
          </div>
          <div onClick={props.cancel} className="dialog__footer__btn cancel">
           {props.text_cancel} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog