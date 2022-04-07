import React from 'react';
import { GiPieChart } from 'react-icons/gi';


const COLUMN_INFO_CHAR = (props) => {

  var col_data = []

  try {
    props.DATA.map((item) => {
      col_data.push(item[props.COLUMN_NAME])
    })
  }
  catch (err) {
    col_data = []
  }

  var total_len = col_data.length

  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  var col_data_set = new Set(col_data)
  var col_data_set = Array.from(col_data_set);

  var labels_list = []
  var labels_list_count = []

  col_data_set.map((item) => {
    labels_list.push(item)
    labels_list_count.push(countOccurrences(col_data, item))
  })


  return (
    <div className='COLUMN_INFO_DIV_01'>
      <div className='COLUMN_INFO_DIV_02'>
        {props.COLUMN_NAME}
      </div>

      <div className='COLUMN_INFO_DIV_03_CHAR'>

        {labels_list.map((item, num) => (

          <div key={num} className='COLUMN_INFO_DIV_03_CHAR_DIV'>
            <span className='COLUMN_INFO_DIV_03_CHAR_DIV_SPAN_01'>
              <GiPieChart /><span style={{ marginInline: "5px" }}>{item} ({labels_list_count[num]} Nos.)</span>
            </span>

            <span className='COLUMN_INFO_DIV_03_CHAR_DIV_SPAN_02'>
              {((labels_list_count[num]) * 100 / (total_len)).toFixed(2)} %
            </span>
          </div>

        ))
        }


      </div>


    </div>
  );
}

export default COLUMN_INFO_CHAR;
