import { useRef } from "react";
import { useNewTaskMutation } from "../../queries/useNewTaskMutation";
import styles from "./NewTask.module.css";


export interface NewTaskPros {
}

export function NewTask() {
  const { mutate } = useNewTaskMutation();

  const textRef = useRef<HTMLInputElement>(null);
  const handleSendButton = () => {
    mutate({
      id: 0,
      text: textRef.current?.value ?? '',
      status: 'TO-DO'
    });
  }
  return <form>
    <div className={styles.formContainer}>
      <div><h2>New Task</h2></div>
      <div>
        <label htmlFor="text">Text</label>
        <input type="text" id="text" ref={textRef} />
      </div>
      <div>
        <button type="button" onClick={handleSendButton}>Add</button>
      </div>
    </div>
  </form>
}