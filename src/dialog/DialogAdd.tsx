import { useForm } from "react-hook-form"
import { useAtom } from "jotai"
import { addUser } from "../store/jotai"

export default function DialogAdd({ open, setOpen }: any) {
  const { register, handleSubmit, reset } = useForm()
  const [, add] = useAtom(addUser)

  const onSubmit = (data: any) => {
    add({ ...data, status: data.status === "true" })
    reset()
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <dialog open className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Илова кардани корбар</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-group">
            <label>Ном</label>
            <input placeholder="Номи корбар..." {...register("name")} required />
          </div>

          <div className="form-group">
            <label>Расм (URL)</label>
            <input placeholder="https://..." {...register("img")} />
          </div>

          <div className="form-group">
            <label>Синну сол</label>
            <input placeholder="Син..." type="number" {...register("age")} required />
          </div>

          <div className="form-group">
            <label>Ҳолат (Status)</label>
            <select {...register("status")}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={() => setOpen(false)}>
              Маҳкам кардан
            </button>
            <button type="submit" className="btn-submit">
              Илова кардан
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
