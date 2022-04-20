import supabase from '../supabase.js'

const OrderApprovedByDM = async (eventData=null) => {
  if (eventData === null){
    eventData = {
        order_id:27,
    }
  }

  const { data, error } = await supabase
    .from('order_events')
    .insert([
      { name:'OrderApprovedByDM', created_by:'6726a65c-a2a3-45f2-b76f-ee332a5bdd6e', 'data':eventData },
    ])

  if(error){
      console.log(error)
  } else {
      console.log(data)
  }
}

export default OrderApprovedByDM