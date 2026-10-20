import { useAtom } from "jotai"
import { dataJotai, deleteUser, paramsAtom } from "./store/jotai"
import "./App.css"
import { useEffect, useState } from "react"
import DialogAdd from "./dialog/DialogAdd"
import DialogEdit from "./dialog/DialogEdit"
import DialogInfo from "./dialog/DialogInfo"

export default function App() {
   const [data] = useAtom(dataJotai)
   const [, deleteUs] = useAtom(deleteUser)
   const [open, setOpen] = useState(false)
   const [user, setUser] = useState(null)
   const [info, setInfo] = useState(null)
   const [, setParams] = useAtom(paramsAtom)
   const [search, setSearch] = useState("")
   const [limit, setLimit] = useState(5)
   const [pages, setPages] = useState(1)
   const [select, setSelect] = useState("all")
   useEffect(() => {
      const timer = setTimeout(() => {
         setParams({ search: search, limit: limit, page: pages, select: select })
      }, 500)
      return () => clearTimeout(timer)
   }, [search, limit, pages, select])

   return (
      <>
         <div className="top-bar">
            <div className="search-box">
               <svg
                  className="search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
               </svg>
            <input
               className="search-input"
               type="search"
               placeholder="search..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            <select value={select} onChange={(e) => setSelect(e.target.value)}>
               <option value="all">All</option>
               <option value="true">Active</option>
               <option value="false">Inactive</option>
            </select>

            <button className="btn-add-primary" onClick={() => setOpen(true)}>
               add user
            </button>
         </div>

         <DialogAdd open={open} setOpen={setOpen} />
         <DialogInfo info={info} setInfo={setInfo} />
         <DialogEdit user={user} setUser={setUser} />

         <div className="cards-container">
            {data?.map((el) => {
               return (
                  <div key={el.id} className="card">
                     <img src={el.img} alt={el.name} className="card-img" />
                     <h4 className="card-name">{el.name}</h4>
                     <p className="card-age">Синну сол: {el.age}</p>
                     <span className={`card-status ${el.status ? "active" : "inactive"}`}>
                        {el.status ? "Active" : "Inactive"}
                     </span>
                     <div className="card-actions">
                        <button onClick={() => deleteUs(el.id)} className="btn-delete">
                           delete
                        </button>
                        <button onClick={() => setUser(el)}>edit</button>
                        <button onClick={() => setInfo(el)}>info</button>
                     </div>
                  </div>
               )
            })}
         </div>

         <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
            <button onClick={() => setPages(pages - 1)}>prev</button>

            <button onClick={() => setPages(pages + 1)}>next</button>
         </div>
      </>
   )
}
