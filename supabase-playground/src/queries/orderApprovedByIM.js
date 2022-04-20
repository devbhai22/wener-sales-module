import supabase from '../supabase.js'

const OrderApprovedByIM = async (eventData=null) => {
  if (eventData === null){
    eventData = {
        order_id:39,
    }
  }
  
  const { data, error } = await supabase
    .from('order_events')
    .insert([
      { name:'OrderApprovedByIM', created_by:'9a059b67-396a-40b3-ad95-ebaa0af9980a', 'data':eventData },
    ])

  if(error){
      console.log(error)
  } else {
      console.log(data)
  }
}

export default OrderApprovedByIM