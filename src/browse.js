// import React, { useState } from 'react'
// import Card from './card'
// import Search from './search'

// import Moment from 'react-moment'
// import FilterResults from 'react-filter-search'

// import { useFetch } from '../utils/useFetch'

// import tokenLists from '../utils/token-lists.json'

// import { Link } from 'react-router-dom'

// function ListItem({ list }) {
//   const [tokenlist, loading] = useFetch(list.url)

//   return (
//     <section className="list-item">
//       {loading ? (
//         <span>loading...</span>
//       ) : (
//         <>
//           <Link to={'/token-list?url=' + list.url}>
//             <p>{tokenlist.name}</p>
//           </Link>
//           <p>
//             <Moment fromNow>{tokenlist.timestamp}</Moment>
//           </p>
//           <p style={{ textAlign: 'right' }}>{tokenlist.tokens.length}</p>
//         </>
//       )}
//     </section>
//   )
// }

// export default function AllLists() {
//   const [value, setValue] = useState('')

//   function handleChange(e) {
//     const { value } = e.target
//     setValue(value)
//   }

//   return (
//     <section className="featured">
//       <Search handleChange={handleChange} value={value} setValue={setValue} />
//       <div className="card-wrapper ">
//         <FilterResults
//           value={value}
//           data={tokenLists}
//           renderResults={(results) => (
//             <>
//               {results.map((list, i) => (
//                 <Card key={i} url={list.url} list={list} customImage={true} />
//               ))}
//             </>
//           )}
//         />
//       </div>

//       {/* <div className="lists-wrapper" style={{ marginTop: '4rem' }}>
//         <div className="flex-between" style={{ marginBottom: '1rem' }}>
//           <p className="description">Discover Lists</p>

//         </div>
//         <section className="list-item list-title">
//           <p>Name</p>
//           <p>Last Updated</p>
//           <p style={{ textAlign: 'right' }}>Tokens</p>
//         </section>

//         <FilterResults
//           value={value}
//           data={tokenLists}
//           renderResults={(results) => (
//             <div>
//               {results.map((data, i) => (
//                 <ListItem key={i} list={data} />
//               ))}
//             </div>
//           )}
//         />
//       </div> */}
//     </section>
//   )
// }
