import { useForm } from "react-hook-form"
import { useAtom } from "jotai"
import { editUser } from "../store/jotai"

export default function DialogEdit({ user, setUser }: any) {
  const { register, handleSubmit } = useForm({
    values: user ? { ...user, status: String(user.status) } : undefined,
  })
  const [, edit] = useAtom(editUser)

  const onSubmit = (data: any) => {
    edit({ ...data, status: data.status === "true" })
    setUser(null)
  }

  if (!user) return null

  return (
    <div className="modal-overlay" onClick={() => setUser(null)}>
      <dialog open className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Таҳрири корбар</h3>
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
            <button type="button" className="btn-cancel" onClick={() => setUser(null)}>
              Маҳкам кардан
            </button>
            <button type="submit" className="btn-submit">
              Сабт кардан
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
