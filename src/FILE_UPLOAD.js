import './style.css';
import { useNavigate } from "react-router-dom"
import * as XLSX from "xlsx";
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FaUserGraduate } from 'react-icons/fa';




const FILE_UPLOAD = () => {

  const navigate = useNavigate();

  const [dataFrame, setDataFrame] = useState([])
  const [fileName, setFileName] = useState(null);

  const File_Selected_Fun = async (e) => {

    var file = e.target.files[0];
    setFileName(file.name);
    try {
      var data = await file.arrayBuffer();
      var workbook = XLSX.read(data);
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(worksheet);
      setDataFrame(jsonData)
    }
    catch (err) {
      console.log(err)
      setDataFrame([])
    }

  }

  const Analyse_Button_Fun = () => {
    try {
      if ((fileName === null) || (dataFrame.length<1)) {
        NotificationManager.warning('Please, Select valid XLSX or CSV file.', 'Invalid File', 5000);
      }
      else {
        navigate("/TABLE", { state: { FILE_JSON: dataFrame, FILE_NAME: fileName } });
      }
    }
    catch (err) {
      NotificationManager.warning('Please, Select valid XLSX or CSV file.', 'Invalid File', 5000);
    }
  }

  return (

    <div className='FU_DIV'>
      <div className='FU_DIV_01'>
        <span className='FU_DIV_01_SPAN'>  A  </span>
        <span className='FU_DIV_01_SPAN'>  n  </span>
        <span className='FU_DIV_01_SPAN'>  a  </span>
        <span className='FU_DIV_01_SPAN'>  l  </span>
        <span className='FU_DIV_01_SPAN'>  y  </span>
        <span className='FU_DIV_01_SPAN'>  s  </span>
        <span className='FU_DIV_01_SPAN'>  e  </span>
      </div>

      <div className='FU_DIV_02'>
        <input type="file" className='FU_DIV_02_INPUT' accept=".xlsx, .csv" onChange={(e) => { File_Selected_Fun(e) }} />
        <button className='FU_DIV_02_BUTTON' onClick={Analyse_Button_Fun}>
          Analyse
        </button>
      </div>

      <div className='FU_FOOTER'>
        <FaUserGraduate />&nbsp; Niket Retsona Sunil Chaudhari
      </div>

      <NotificationContainer />
    </div>


  );
}

export default FILE_UPLOAD;

