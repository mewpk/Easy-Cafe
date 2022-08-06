import React,{useState} from 'react';
import classNames from 'classnames';


function ToggleCategory() {

    const [isStatus, setStatus] = useState(true);
    // const


  return (
    <div onClick={()=>setStatus(!isStatus)} 
        className={classNames("flex w-20 h-10 bg-gray-600 m-10 rounded-full transition-all duration-500",{
        'bg-green-500' : isStatus,
    })}>
      <span className={classNames('h-10 w-10 bg-white rounded-full transition-all duration-500',{
        'ml-10' : isStatus,
      })}/>
    </div>
  )
}

export default ToggleCategory
