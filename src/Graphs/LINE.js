import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


const LINE_GRAPG = (props) => {
    const options = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 0.5,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Line Chart of ${props.COLUMN_NAME}`,
            },
        },
    };

    const col_data_list = [];
    const col_data_list_num = [];
    let start_num = 0
    for (let value of Object.values(props.DATA)) {
        start_num++;
        col_data_list.push(value[props.COLUMN_NAME]);
        col_data_list_num.push(start_num)
    }

    const randomColor = () => {
        return Math.floor(Math.random() * 255)
    }

    var bgColor = 'rgb(' + randomColor() + "," + randomColor() + "," + randomColor() + ')';


    const labels = col_data_list_num;
    const labels_data = col_data_list;

    const data = {
        labels,
        datasets: [
            {
                label: props.COLUMN_NAME,
                data: labels_data,
                borderColor: bgColor,
                backgroundColor: bgColor,
            }
        ],
    };


    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}


const LINE = (props) => {

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
            <LINE_GRAPG DATA={props.LINE_DATA} COLUMN_NAME={columnSelected} />
        </div>
    )
}


export default LINE;
