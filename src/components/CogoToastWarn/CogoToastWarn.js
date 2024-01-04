import React from 'react'
import cogoToast from 'cogo-toast';
import IconWarning from 'svg/IconWarning'

export default ( message ) => {
  return (
    cogoToast.warn(message, {
      renderIcon: () => <IconWarning/>,
      bar: {
        color: '#ff8716'
      }
    })
  )
}
