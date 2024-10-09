import DataTable from 'react-data-table-component';
import classes from './Table.module.scss'
import { CircularProgress } from '@mui/material';

const customStyles = {
 
  tableWrapper: {
    style: {
      display: "flex",
      minWidth:'100%',
      overFlowX: "auto",
    },
  },
 
  head: {
    style: {
      fontSize: "1vw",
      fontWeight: "bold",
    },
  },
  headCells: {
    style: {
      color: "#000",
      backgroundColor: "#fff",
    },
  },
  rows: {
    style: {
      minHeight: "4vw",
      fontSize: "0.781vw",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f5f5f5",
    },
  },
  cells: {
  },
};

const conditionalRowStyles = [
  {
    when: row => row.status === 'pending',
    style: {
      backgroundColor: '#ffff040e', // Example: #f9f9a1
    },
  },
  {
    when: row => row.status === 'declined',
    style: {
      backgroundColor: '#f8dede', // Example: #f9a1a1
    },
  },
  {
    when: row => row.status === 'accepted',
    style: {
      backgroundColor: '#ddfcdd', // Example: #a1f9a1
    },
  },
  // Add more conditions if needed
];

const defaultStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--primaryColor)",
  fontWeight: "bold",
  height: "70vh",
};
const loadingDefaultStyles = { display: 'flex', justifyContent: 'center',alignItems:'center', height: '50vh',width:'100%' };





const Table = ({
  columns,
  data = [],
  loading,
  noData = "No Data",
  style,
}) => {
  

  return (
    <div className={classes.tableContainer} style={style}>
      {data?.length > 0 ? (
        <div style={{border:'1px solid var(--lightGreyColor)'}}>
          <DataTable
            conditionalRowStyles={conditionalRowStyles}
            columns={columns}
            data={data}
            highlightOnHover
            noDataComponent={noData}
            customStyles={customStyles}
          />
        </div>
      ) : (
        <>
          {loading ? (
            <div style={loadingDefaultStyles}>
              <CircularProgress size={'12px'} />
            </div>
          ) : (
            <p
              style={defaultStyles}
            >
              {noData}
            </p>
          )}
        </>
      )}

    </div>
  );
};

export default Table;
