// import Fuse from "fuse.js";
// import React, { useState, useEffect } from "react";

// function SearchDream({ data }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState(data);

//   const fuseOptions = {
//     keys: ["categories", "tags"],
//     imcludeScore: true,
//     threshold: 0.4,
//   };

//   const fuse = new Fuse(data, fuseOptions);
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by category or tag"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul {searchResults.map((dream, index) => <li key={index}>{dream}</li>)}>
        
//       </ul>
//     </div>
//   );
// }
