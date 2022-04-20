import supabase from '../supabase.js'

const OrderApprovedByZM = async (eventData=null) => {
  if (eventData === null){
    eventData = {
        order_id:9,
    }
  }
  
  const { data, error } = await supabase
    .from('order_events')
    .insert([
      { name:'OrderApprovedByZM', created_by:'161d8876-97fb-45f5-bcce-f7823656f68b', 'data':eventData },
    ])

  if(error){
      console.log(error)
  } else {
      console.log(data)
  }
}

export default OrderApprovedByZM