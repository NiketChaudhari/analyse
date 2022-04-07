import './style.css';
import { useLocation, useNavigate } from "react-router-dom"
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'



const TABLE = () => {

  let location_Data = useLocation();
  let navigate = useNavigate();

  let JSON_DATA = location_Data.state.FILE_JSON

  let columnList = Object.keys(JSON_DATA[0])

  const header = (item) => {
    return (
      <span className='TABLE_HEADER'>
        {item}
      </span>
    )
  }


  var columns = []
  columnList.map((item) => {
    var my_dict = {}
    my_dict["Header"] = header(item);
    my_dict["accessor"] = item;
    my_dict["minWidth"] = 80;
    columns.push(my_dict)
  })




  const backButtonClicked = () => {
    navigate("/");
  }


  const nextButtonClicked = () => {
    navigate("/DASHBOARD", { state: location_Data.state });
  }





  return (

    <div className="DASH_DIV">
      <div className="DASH_DIV_01">


        <div className='DASH_DIV_01_01'>
          Filename : {location_Data.state.FILE_NAME}
        </div>

        <div className='DASH_DIV_01_02'>
          <button className='DASH_DIV_01_02_BUTTON' onClick={backButtonClicked}>Back</button>
          <button className='DASH_DIV_01_02_BUTTON' onClick={nextButtonClicked}>Next</button>
        </div>

      </div>

      <div className="DASH_DIV_02_TABLE">

        <ReactTable
          data={JSON_DATA}
          columns={columns}
          filterable={true}
          freezeWhenExpanded={false}
          sortable={true}
          className='TABLE_COLUMN'
          minRows={5}
          expander={true}
          defaultPageSize={15}

        //   getTdProps={(state, rowInfo, column) => {
        //   return {
        //     onClick: ()  => {
        //       console.log(rowInfo.original[column.id])
        //     }}

        //   }
        // }

        />
      </div>
    </div>

  );
}

export default TABLE;

