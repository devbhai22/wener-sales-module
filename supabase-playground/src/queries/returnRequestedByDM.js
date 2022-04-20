import supabase from '../supabase.js'

const ReturnRequestedByDM = async(eventData=null) => {
  if (!eventData){
    eventData = {
        order_id:33,
        invoice_data: {
            net_total: 9000,
            products: [
                {
                    product_name: "prothom product",
                    quantity: 10,
                    total_amount: 17500,
                    discount_amount: 7500,
                    rate: 250,
                    discount_percentage: 30
                  },
                  {
                    product_name: "ditiyo product",
                    quantity: 50,
                    total_amount: 36000,
                    discount_amount: 24000,
                    rate: 120,
                    discount_percentage: 40
                  },
            ] 
        },
    }
  }
  console.log(eventData, 'event data')
  const { data, error } = await supabase
    .from('order_events')
    .insert([
        { name:'ReturnRequestedByDM', created_by:'6726a65c-a2a3-45f2-b76f-ee332a5bdd6e', 'data':eventData },
    ])

    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
}

export default ReturnRequestedByDM