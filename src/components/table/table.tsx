/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import moment from 'jalali-moment';
import IconButton from '@mui/material/IconButton';
import { IoTrashOutline, IoCreateOutline } from 'react-icons/io5'
import { ITask } from '../../redux/reducers/todoRedux/todoRedux';
import { useTodo } from '../../redux/selectors/todo/todoState';
import { useUi } from '../../redux/selectors/ui/uiState';
import { priorityColor, statusColor } from '../../utils/todo';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: ITask[], comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [ITask, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ITask;
  label: string;
  numeric: boolean;
  type?: 'string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency'
  dateSetting?: { locale?: string; format?: string };
}



interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITask) => void;
  order: Order;
  orderBy: string;
  headCells : any | HeadCell[];

}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler =
    (property: keyof ITask) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead 
      sx={{
        bgcolor: "#fff",
        color:"#212121"
        }}
    >
      <TableRow>

        {headCells.map((headCell:any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            
          >
            <TableSortLabel
              sx={{p:2,color: "#212121",
              }}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}




const RcTable:React.FC<any> = ({data}) => {

  const { todoState } = useTodo()
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ITask>('task');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoState!.todos))
  }, [todoState!.todos])
  const { uiOpenModal, uiModalData, uiModalViwe } = useUi()

  const handleDelete = () => {
    uiModalViwe("Delete")
    uiOpenModal()
  }

  const handleEdit = () => {
    uiModalViwe("Edit")
    uiOpenModal()
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITask,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = [
    {
      id: 'task',
      numeric: false,
      disablePadding: true,
      label: 'Task name',
      type: 'string'
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
      type: "string"
    },
    {
      id: 'priority',
      numeric: false,
      disablePadding: false,
      label: 'Priority',
      type: "string"
    },
    {
      id: 'deadline',
      numeric: false,
      disablePadding: false,
      label: 'Deadline',
      dateSetting: { locale: "fa", format: "YYYY/MM/DD" }
    },
    {
      id: 'actions',
      numeric: false,
      disablePadding: false,
      label: 'Actions',
    },
  ]

  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 4, pt: 5, px: 3, bgcolor:"#212121" }}>
        <TableContainer sx={{ width:"100%",pl:2, bgcolor: "#212121",overflowY:"hidden" }}>
          <Table
            sx={{ minWidth: 650, p:2, pt:4, }}
            aria-labelledby="tableTitle"
           
          >
            <EnhancedTableHead
            
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
            <TableBody
             
            >
              {
                data.length === 0 ? (
                  <TableRow
                    style={{
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding:1,
                      width:"100%",
                    }}
                    
                  >
                    <TableCell colSpan={12} sx={{
                      color: "#fff",
                      border: 0,
                      padding:"25px"
                    }}>
                        Can't Find Todos
                    </TableCell>
                  </TableRow>
                ):(
                  
                  stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {

                      
                      const convertedDeadline = moment(item!.deadline)
                        .locale("fa")
                        .format("YYYY/MM/DD")
                      
                        return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={item!.id}
                          
                        >
    
                          <TableCell
                            component="th"
    
                            scope="row"
                            sx={{
                              p:2,
                              border:0,
                              color: "#fff"
                            }}
                          >
                            {item!.task}
                          </TableCell>
                          <TableCell
                            sx={{
                              p:2,
                              border:0,
                            }} align="justify">
                              <span
                                style={{
                                  backgroundColor: `${statusColor(item!.status)}`,
                                  color: "#fff",
                                  padding: 10,
                                  borderRadius:20
                                }}
                              >
                                {item!.status}
                              </span>
                            </TableCell>
                          <TableCell
                            sx={{
                              p:2,
                              border:0,
                              color: "white"
                            }} align="justify">
                                <span
                                style={{
                                  backgroundColor: `${priorityColor(item.priority)}`,
                                  color: "#fff",
                                  padding: 10,
                                  borderRadius:20
                                }}
                              >
                                {item!.priority}
                              </span>
                            </TableCell>
                          <TableCell
                            sx={{
                              p:2,
                              border:0,
                              color: "white"
                            }} align="justify">{convertedDeadline}</TableCell>
                          <TableCell
                            sx={{
                              p:2,
                              border:0,
                              color: "#fff" 
                            }} align="justify">{<>
                              <IconButton onClick={() => {
                                uiModalData(item.id)
                                handleDelete()}
                              }>
                                <IoTrashOutline className='text-white hover:text-gray-400' />
                              </IconButton>
    
                            </>} {
                              <>
                                <IconButton onClick={() => {
                                  uiModalData(item)
                                  handleEdit()
                                  }}>
                                  <IoCreateOutline className='text-white hover:text-gray-400' />
                                </IconButton>
                              </>
                            }</TableCell>
                        </TableRow>
                      );
                    })
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        { todoState.count > 5 ? 
          <TablePagination
            sx={{
              bgcolor:"white",
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={todoState.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> : null
      }
      </Paper>
    </Box>
  );
}
 
export default RcTable