import React from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaMinusCircle } from 'react-icons/fa';


const COLUMN_INFO_NUM = (props) => {

  var col_data = []

  try {
    props.DATA.map((item) => {
      col_data.push(item[props.COLUMN_NAME])
    })
  }
  catch (err) {
    col_data = []
  }

  var col_min = Math.floor(Math.min(...col_data))
  var col_avg = col_data.reduce((a, b) => a + b) / col_data.length;
  var col_max = Math.floor(Math.max(...col_data))


  return (
    <div className='COLUMN_INFO_DIV_01'>
      <div className='COLUMN_INFO_DIV_02'>
        {props.COLUMN_NAME}
      </div>

      <div className='COLUMN_INFO_DIV_03'>

        <div className='COLUMN_INFO_DIV_03_01'>
          <span className='COLUMN_INFO_DIV_03_SPAN_01'>
            <FaArrowAltCircleDown /><span style={{ marginInline: "5px" }}>Min.</span>
          </span>
          <span className='COLUMN_INFO_DIV_03_SPAN_02'>
            {col_min.toFixed(2)}
          </span>
        </div>

        <div className='COLUMN_INFO_DIV_03_01'>
          <span className='COLUMN_INFO_DIV_03_SPAN_01'>
            <FaMinusCircle /><span style={{ marginInline: "5px" }}>Avg.</span>
          </span>
          <span className='COLUMN_INFO_DIV_03_SPAN_02'>
            {col_avg.toFixed(2)}
          </span>
        </div>

        <div className='COLUMN_INFO_DIV_03_01'>
          <span className='COLUMN_INFO_DIV_03_SPAN_01'>
            <FaArrowAltCircleUp /><span style={{ marginInline: "5px" }}>Max.</span>
          </span>
          <span className='COLUMN_INFO_DIV_03_SPAN_02'>
            {col_max.toFixed(2)}
          </span>
        </div>

      </div>


    </div>
  );
}

export default COLUMN_INFO_NUM;
