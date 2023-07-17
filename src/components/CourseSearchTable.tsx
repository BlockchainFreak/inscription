// import { usePlaygroundBuckets } from "@/hooks"
// import { Modal, Table, Text, Button Center } from "@mantine/core"

// export default function CourseSearchTable() {

//     const { buckets, currentActiveBucket, setPlayground } = usePlaygroundBuckets()

//     return (
//         <Modal opened={!currentActiveBucket} onClose={() => setPlayground({ buckets, currentActiveBucket: null })}>
//             <Modal.Title>Search Results</Modal.Title>
//             <Modal.Body>
//                 <Table striped>
//                     <thead>
//                         <tr>
//                             <th>Course Code</th>
//                             <th>Course Title</th>
//                             <th>Credit Hours</th>
//                             <th>Instructor(s)</th>
//                             <th>Section</th>
//                             <th>Start Time</th>
//                             <th>End Time</th>
//                             <th>Days</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {searchResults.map((course, index) => ())}
//         </Modal>
//     )
// }
