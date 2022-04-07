import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);



const DOUGHNUT_GRAPG = (props) => {

  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  var col_list = []
  for (let value of Object.values(props.DATA)) {
    col_list.push(value[props.COLUMN_NAME]);
  }

  var col_list_set_ = new Set(col_list)
  var col_list_set = Array.from(col_list_set_);

  var labels_list = []
  var labels_list_count = []

  col_list_set.map((item) => {
    labels_list.push(item.toString())
    labels_list_count.push(countOccurrences(col_list, item))
  })

  var backgroundColor_list = []

  for (var i = 0; i < labels_list.length; i++) {
    var rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    var color_item = 'rgb(' + rgb.join(',') + ')';
    backgroundColor_list.push(color_item)
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Doughnut Chart of ${props.COLUMN_NAME}`,
      },
    },
  };



  const data = {
    labels: labels_list,
    datasets: [
      {
        label: labels_list,
        data: labels_list_count,

        backgroundColor: backgroundColor_list,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };



  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  )
}


const DOUGHNUT = (props) => {

  const [nextNum, setNextNum] = useState(0)

  const [columnSelected, setColumnSelected] = useState(props.COLUMN_LIST[nextNum])

  var col_len = props.COLUMN_LIST.length - 1


  const nextGraph = () => {

    if (nextNum < (col_len)) {
      setNextNum(nextNum + 1)
    }
    else {
      setNextNum(0)
    }
    setColumnSelected(props.COLUMN_LIST[nextNum])
  }

  return (
    <div className='CHART_DIV' onClick={nextGraph}>
      <DOUGHNUT_GRAPG DATA={props.DOUGHNUT_DATA} COLUMN_NAME={columnSelected} />
    </div>
  )

}


export default DOUGHNUT;
