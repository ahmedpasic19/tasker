import MaterialTable from 'material-table'
import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBTask } from '../../features/tasks/taskSlice'
import { toast, ToastContainer } from 'react-toastify'
import {
  getAllTasks,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import {
  deleteTask,
  completeTask,
  editTask,
} from '../../features/tasks/taskSlice'

//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import CheckIcon from '@mui/icons-material/Check'

//Modals
import CompleteTaskModal from '../../components/modals/tasks/CompleteTaskModal'
import DeleteTaskModal from '../../components/modals/tasks/DeleteTaskModal'
import EditTaskModal from '../../components/modals/tasks/EditTaskModal'

const AllTasks = () => {
  const { allTasks, successMessage, errorMessage, isSuccess, isError } =
    useAppSelector((state) => state.tasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  const [openComplete, setOpenComplete] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [task, setTask] = useState({} as DBTask)

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Location', field: 'location' },
    { title: 'User', field: 'username' },
    { title: 'Progress', field: 'progress' },
    { title: 'Compleated at', field: 'compleatedAt' },
    { title: 'Assigned at', field: 'assignedAt' },
  ]

  const taskData = allTasks.map((task) => ({ ...task }))

  //Toasts
  const error = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }
  const success = (successMessage: string) => {
    toast.success(successMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
    })
  }

  useEffect(() => {
    if (errorMessage) {
      error(errorMessage)
      dispatch(setErrorMessage(''))
    }
    if (successMessage) {
      success(successMessage)
      dispatch(setSuccessMessage(''))
      setOpenComplete(false)
      setOpenDelete(false)
      setOpenEdit(false)
    }
  }, [errorMessage, successMessage, isError, isSuccess])

  return (
    <div>
      <ToastContainer />
      <MaterialTable
        // icons={tableIcons}
        title='All tasks'
        columns={columns}
        data={taskData}
        actions={[
          {
            icon: () => <CheckIcon />,
            tooltip: 'Compleate task',
            onClick: (event, rowData) => {
              if (rowData instanceof Array) return
              if (rowData) {
                setOpenComplete(true)
                setTask(rowData)
              }
            },
          },
          {
            icon: () => <Edit />,
            tooltip: 'Edit task',
            onClick: (event, rowData) => {
              if (rowData instanceof Array) return
              if (rowData) {
                setTask(rowData)
                setOpenEdit(true)
              }
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete task',
            onClick: (event, rowData) => {
              if (rowData instanceof Array) return
              if (rowData) {
                setTask(rowData)
                setOpenDelete(true)
              }
            },
          },
        ]}
        options={{ actionsColumnIndex: -1 }}
      />
      <CompleteTaskModal
        open={openComplete}
        onClose={() => setOpenComplete(false)}
        completeTask={completeTask}
        multi={true}
        task={task}
      />
      <DeleteTaskModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        deleteTask={deleteTask}
        multi={true}
        taskId={task._id}
      />
      <EditTaskModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        editTask={editTask}
        employeeEdit={true}
        setTask={setTask}
        multi={true}
        task={task}
      />
    </div>
  )
}

export default AllTasks