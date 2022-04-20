import supabase from '../supabase.js'

const ReturnRequestedByTSO = async(eventData=null) => {
  if (!eventData){
    eventData = {
        order_id:33,
        invoice_data: {
            net_total: 900,
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
        { name:'ReturnRequestedByTSO', created_by:'3267ba17-7ee1-49b2-aa4d-9984360fbb1c', 'data':eventData },
    ])

    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
}

export default ReturnRequestedByTSO