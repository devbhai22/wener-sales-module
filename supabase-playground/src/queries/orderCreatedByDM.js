import supabase from '../supabase.js'

const OrderCreatedByDM = (eventData=null) => {
  if (eventData === null){
    const eventData = {
        territory_id:19,
        distributor_id:6,
        distributor_name:"Akash Electronics",
        invoice_data:{
            gross_total:100,
            total_discount:10,
            net_total:90,
            products:[
                {name:'Wener Socket', unit_price:100, quantity:1, discount_percentage:10, 
                    discount_amount:10, total_price:90}
            ]
        }
    }
  }
  
  const { data, error } = await supabase
    .from('order_events')
    .insert([
        { name:'OrderCreatedByDM', created_by:'8cc51b36-b81f-4450-988b-5a63b44f46c6', 'data':eventData },
    ])

    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
}

export default OrderCreatedByDM
