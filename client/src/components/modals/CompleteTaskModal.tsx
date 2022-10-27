import ReactDOM from 'react-dom'
import styles from './AssignTaskModal.module.css'
import { DBTask } from '../../features/tasks/taskSlice'
import { MouseEvent } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  completeTask: (e: MouseEvent<HTMLButtonElement>) => void
  task: DBTask
}

const CompleteTaskModal = ({ open, onClose, task, completeTask }: Props) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <form>
          <input type='text' value={task.title} readOnly />
          <textarea value={task.description} readOnly />
          <input type='text' value={task.location} readOnly />
        </form>
        <section className='modal-btn'>
          <button onClick={completeTask}>Complete</button>
          <button onClick={onClose}>Close</button>
        </section>
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default CompleteTaskModal
