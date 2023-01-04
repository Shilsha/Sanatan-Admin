import React from 'react'

const DigitalTime = () => {

    
    let time = new Date().toLocaleTimeString();
    let [currentTime, changeTime] = React.useState(time);

    function checkTime() {
        time = new Date().toLocaleTimeString();
        changeTime(time);
    }

    setInterval(checkTime, 1000);
  return (
    <div>{currentTime}</div>
  )
}

export default DigitalTime