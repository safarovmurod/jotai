
export default function DialogInfo({ info, setInfo }: any) {
  if (!info) return null

  return (
    <div className="modal-overlay" onClick={() => setInfo(null)}>
      <dialog open className="modal-dialog modal-info" onClick={(e) => e.stopPropagation()}>
        <img
          src={info.img || "https://via.placeholder.com/100"}
          alt={info.name}
          className="info-img"
        />
        <h2 className="info-name">{info.name}</h2>

        <div className="info-details">
          <div className="info-item">
            <span className="info-label">Синну сол</span>
            <span className="info-value">{info.age} сола</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ҳолат</span>
            <span className={`card-status ${info.status ? "active" : "inactive"}`}>
              {info.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn-close-info"
          onClick={() => setInfo(null)}
        >
          Маҳкам кардан
        </button>
      </dialog>
    </div>
  )
}
