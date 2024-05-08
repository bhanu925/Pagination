import React ,{useState , useEffect} from 'react';
import axios from 'axios';
import './Employee.css';

export default function Employee() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setEmployeeData(res.data);
      } catch (error) {
        console.error('fetchDataFailed',error);
      }     
    }
    fetchData();
  },[])

  const [employeeData,setEmployeeData] = useState([]);
  const [ currentPage , setCurrentPage ] = useState(1);

  const previous =() =>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }

  const next = () =>{
    if(currentPage<Math.ceil(employeeData.length/10)){
      setCurrentPage(currentPage+1);
    }
  }

  const renderTheEmployeeData=()=>{
    const startIndex = (currentPage-1)*10;
    const lastIndex = Math.min(startIndex+10,employeeData.length);
    return employeeData.slice(startIndex,lastIndex).map((item,index)=>
  
       (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>     
        </tr>
      )
    )
  }
  return (
    <div>

      <div className='header'>
        <h2>Employee Data Table</h2>
      </div>
      <table className='table-data'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {renderTheEmployeeData()}
        </tbody>
      </table>
      
      
    <div className='pagination-button'>
      <button onClick={previous} disabled={currentPage === 1}>Previous</button>
      <p>{currentPage}</p>
      <button onClick={next} disabled={currentPage === Math.ceil(employeeData.length/10)}>Next</button>
    </div>

    </div>
  )
}
