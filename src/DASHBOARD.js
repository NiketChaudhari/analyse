import { useLocation, useNavigate } from "react-router-dom"
import "./style.css"
import BAR from "./Graphs/BAR"
import LINE from "./Graphs/LINE"
import DOUGHNUT from "./Graphs/DOUGHNUT"
import COLUMN_INFO_NUM from "./Graphs/COLUMN_INFO_NUM"
import COLUMN_INFO_CHAR from "./Graphs/COLUMN_INFO_CHAR"
import DataFrame from 'dataframe-js';



const DASHBOARD = () => {

  let location_Data = useLocation();
  let navigate = useNavigate();

  const JSON_DATA = location_Data.state.FILE_JSON

  const DF = new DataFrame(JSON_DATA);

  const column_list = DF.listColumns()
  const row_count = DF.count()

  var num_col_list = []
  var char_col_list = []

  column_list.map((item) => {
    var col_unique_list = DF.unique(item).toDict()[item]
    var col_type = typeof col_unique_list[0]
    var unique_per = (col_unique_list.length) * 100 / (row_count)

    if ((col_type === "number") & (unique_per >= 5)) {
      num_col_list.push(item)
    }
    else {
      char_col_list.push(item)
    }
  })




  const homeButtonClicked = () => {
    navigate("/");
  }

  return (
    <div className="DASH_DIV">
      <div className="DASH_DIV_01">


        <div className='DASH_DIV_01_01'>
          Filename : {location_Data.state.FILE_NAME}
        </div>

        <div className='DASH_DIV_01_02'>
          <button className='DASH_DIV_01_02_BUTTON' onClick={homeButtonClicked}>Home</button>
        </div>

      </div>

      <div className="DASH_DIV_02">
        <div className="DASH_DIV_02_01">

          {
            num_col_list.length > 0 ?
              <BAR BAR_DATA={JSON_DATA} COLUMN_LIST={num_col_list} />
              :
              <span className="DASH_EXCEPTION">
                File does not contain quantitative field.
              </span>
          }



        </div>

        <div className="DASH_DIV_02_02">

          {num_col_list.length > 0 ?
            <LINE LINE_DATA={JSON_DATA} COLUMN_LIST={num_col_list} />
            :
            <span className="DASH_EXCEPTION">
              File does not contain quantitative field.
            </span>
          }

        </div>
      </div>

      <div className="DASH_DIV_03">
        <div className="DASH_DIV_03_01">

          {
            num_col_list.map((item) => (
              <COLUMN_INFO_NUM DATA={JSON_DATA} COLUMN_NAME={item} key={item} />
            ))
          }
          {
            char_col_list.map((item) => (
              <COLUMN_INFO_CHAR DATA={JSON_DATA} COLUMN_NAME={item} key={item} />
            ))
          }

        </div>

        <div className="DASH_DIV_03_02">
          <div>


          {char_col_list.length > 0 ?
            <DOUGHNUT DOUGHNUT_DATA={JSON_DATA} COLUMN_LIST={char_col_list} />
            :
            <span className="DASH_EXCEPTION">
              File does not contain qualitative field.
            </span>
          }



          </div>
        </div>
      </div>
    </div>
  );
}

export default DASHBOARD;
