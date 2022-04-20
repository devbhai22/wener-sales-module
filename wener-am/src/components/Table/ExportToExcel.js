import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const ExportToExcel = (props) => {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '15px 0'
        }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="export btn btn-success"
                table="table-to-xls"
                filename="filtredData"
                sheet="tablexls"
                buttonText="Export to Excel File" />

            <table hidden="true" id="table-to-xls">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>ID</th>
                        <th>Title </th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.posts.map(post => {
                            return (

                                <tr key={post.id}>
                                    <td>{post.userId}</td>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
export default ExportToExcel;