// Loading
import Loading from "../components/Loading/Loading";
const [loading, setLoading] = useState(true)
setLoading(false)
if (loading) {
    return <Loading></Loading>
}


// login e role check
else {
    let profile = await supabase.from('profiles').select('*').eq('id', user.id)
    console.log(profile);

    if (profile.data.length > 0 && profile.body[0].role === 'hr') {
        localStorage.setItem("name", profile.body[0].name)
        localStorage.setItem("avatar_url", profile.body[0].profile_picture_path)
        // localStorage.setItem('email', email+'@mail.com')
        // localStorage.setItem('password', password)
        history.push('/dashboard')
    } else {
        supabase.auth.signOut().then((data) => {
            setErrorMessage("This dashboard is for HR users only")
            console.log(data);
        })
    }

}


//   Case Insensitive
function filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return (
        row[id] !== undefined ?
            String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            :
            true
    );
}

<ReactTable
    className="-striped -highlight"
    data={profiles}
    filterable
    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}