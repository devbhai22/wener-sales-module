// IMPORTS
import orderCreatedByTSO from './queries/orderCreatedByTSO.js'
// import orderCreatedByZM from './queries/orderCreatedByZM'
// import orderCreatedByDM from './queries/orderCreatedByDM'
// import orderCreatedByChairman from './queries/orderCreatedByChairman'

import orderApprovedByZM from './queries/orderApprovedByZM.js'
import orderApprovedByDM from './queries/orderApprovedByDM.js'
// import orderApprovedByChairman from './queries/orderApprovedByChairman'
import orderApprovedByIM from './queries/orderApprovedByIM.js'

// import orderRejectedByZM from './queries/orderRejectedByZM'
// import orderRejectedByDM from './queries/orderRejectedByDM'
// import orderRejectedByChairman from './queries/orderRejectedByChairman'
// import orderRejectedByIM from './queries/orderRejectedByIM'

// import invoiceEditedByIM from './queries/invoiceEditedByIM'

import returnRequestedByTSO from './queries/returnRequestedByTSO.js'
// import returnRequestedByZM from './queries/returnRequestedByZM'
import returnRequestedByDM from './queries/returnRequestedByDM.js'
// import returnRequestedByChairman from './queries/returnRequestedByChairman'

// import returnApprovedByZM from './queries/returnApprovedByZM'
// import returnApprovedByDM from './queries/returnApprovedByDM'
// import returnApprovedByChairman from './queries/returnApprovedByChairman'
// import returnApprovedByIM from './queries/returnApprovedByIM'

import transactionApprovedByAM from './queries/transactionApprovedByAM.js'


// PLAYGROUND

//orderCreatedByTSO()
//orderApprovedByZM({order_id:56})
//orderApprovedByDM()
// returnRequestedByTSO()

// import supabase from './supabase.js'

// const user = supabase.auth.signUp({
//     email:'hr@wenerbd.com',
//     password:'secret776hr'
// })

// async function main(){
//   const { data, error } = await supabase
//   .from('profiles')
//   .insert([
//     { id: '154b502d-e07b-4338-ad01-232965c08c65', name: 'abcd who', role: 'dm', age:40, works_at:76, phone_number:'01727307407' },
//   ])

//   if(error){
//       console.log(error)
//   } else {
//       console.log(data)
//   }

// }

// main()
orderApprovedByIM()
