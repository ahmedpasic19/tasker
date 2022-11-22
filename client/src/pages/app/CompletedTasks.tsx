import MaterialTable from 'material-table'
import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DBTask } from '../../features/tasks/taskSlice'
import { toast, ToastContainer } from 'react-toastify'
import {
  getCompletedTasks,
  setErrorMessage,
  setSuccessMessage,
} from '../../features/tasks/taskSlice'
import { editTask } from '../../features/tasks/taskSlice'

//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import CheckIcon from '@mui/icons-material/Check'

//Modals
import CompleteTaskModal from '../../components/modals/tasks/CompleteTaskModal'
import DeleteTaskModal from '../../components/modals/tasks/DeleteTaskModal'
import EditTaskModal from '../../components/modals/tasks/EditTaskModal'
import usePrivateRoute from '../../hooks/usePrivateRoute'

const CompletedTasks = () => {
  const { allTasks, successMessage, errorMessage, isSuccess, isError } =
    useAppSelector((state) => state.tasks)

  const dispatch = useAppDispatch()

  const privateRoute = usePrivateRoute()

  useEffect(() => {
    dispatch(getCompletedTasks(privateRoute))
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
    <div className='mt-10'>
      <ToastContainer />
      <div className='w-full flex justify-center items-center'>
        <h1 className='text-4xl font-bold'>Completed Tasks</h1>
      </div>
      <div className='mt-10'>
        <MaterialTable
          title=''
          style={{ zIndex: -1 }}
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
          multi={true}
          task={task}
        />
        <DeleteTaskModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          multi={true}
          taskId={task._id}
        />
        <EditTaskModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          employeeEdit={true}
          setTask={setTask}
          multi={true}
          task={task}
        />
      </div>
    </div>
  )
}

export default CompletedTasks
