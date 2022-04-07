import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);





const BAR_GRAPG = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Bar Chart of ${props.COLUMN_NAME}`,
            },
        },
    };

    const col_data_list = [];
    for (let value of Object.values(props.DATA)) {
        col_data_list.push(value[props.COLUMN_NAME]);
    }

    var data_min_number = Math.floor(Math.min(...col_data_list))
    var data_max_number = Math.ceil(Math.max(...col_data_list))
    var bin_range = ((data_max_number - data_min_number) / (10))

    var min_num = data_min_number
    var range_list = []
    var range_count_list = []

    let i = 0;
    while (i <= 10) {

        var result = col_data_list.filter((value) => {
            return ((value >= min_num) && (value < min_num + bin_range))
        });

        range_list.push(`${min_num.toFixed(2)}-${(min_num + bin_range).toFixed(2)}`)

        range_count_list.push(result.length)

        var min_num = min_num + bin_range
        i++;
    }


    const randomColor = () => {
        return Math.floor(Math.random() * 255)
    }

    var bgColor = 'rgb(' + randomColor() + "," + randomColor() + "," + randomColor() + ')';


    const labels = range_list;
    const labels_data = range_count_list;

    const data = {
        labels,
        datasets: [
            {
                label: props.COLUMN_NAME,
                data: labels_data,
                backgroundColor: bgColor,
            }
        ],
    };


    return (
        <>
            <Bar options={options} data={data} />
        </>
    )
}


const BAR = (props) => {

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
            <BAR_GRAPG DATA={props.BAR_DATA} COLUMN_NAME={columnSelected} />
        </div>
    )

}


export default BAR;
