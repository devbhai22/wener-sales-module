import supabase from '../supabase.js'

const transactionApprovedByAM = async (eventData=null) => {
    if (eventData === null){
        eventData = {
            order_id:27,
            amount:130000
        }
    }
    
    const { data, error } = await supabase
    .from('order_events')
    .insert([
        { name:'TransactionApprovedByAM', created_by:'ce798047-c775-441a-81df-b55734493633', 'data':eventData },
    ])

    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
}

export default transactionApprovedByAM