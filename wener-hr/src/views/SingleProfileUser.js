import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Row,
  Col
} from "shards-react";
import { useHistory } from "react-router-dom";
import supabase from "../utils/supabase";


const SingleProfileUser = ({ userDetails }) => {

  const history = useHistory()

  function handleEditButton(e) {
    e.preventDefault()
    history.push(`/profiles/${userDetails.id}/edit`)
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (window.confirm('do you really want to delete this user?')) {
      const { data2, error2 } = await supabase
        .from('passwords')
        .delete()
        .eq('profile', userDetails.id)

      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userDetails.id)
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        history.push(`/profiles`)
      }
    }


  }

  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className=" text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={`${process.env.REACT_APP_MEDIA_URL}${userDetails.avatar_url}`}
            alt={userDetails.name}
            style={{
              height: '100px',
              width: '100px',
              objectFit: 'cover',
            }}
          />
        </div>
        <h4 className="mb-0">{userDetails.name}</h4>
        <span className="text-muted d-block mt-2" style={{ textTransform: 'uppercase' }}>{userDetails.role}</span>
        <span className="text-muted d-block">{userDetails.age} Years Old</span>
        <span className="text-muted d-block">{userDetails.phone_number} </span>
        {userDetails.location ? (
          <span className="text-muted d-block">{userDetails.location}</span>
        ) : null}
        <Row className='mt-4 mb-3'>
          <Col md={6}>
            <button className="btn btn-primary mb-2" onClick={(e) => handleEditButton(e)}>Edit User</button>
          </Col>
          <Col md={6}>
            {
              userDetails.attachment_path ?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${userDetails.attachment_path}`}>
                  <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Employee Credentials</button>
                </a>
                :
                <button className="btn btn-info">Credentials not added</button>
            }

          </Col>

          <Col md={6}>
            <button className="btn btn-danger mt-2" onClick={(e) => handleDelete(e)}>Delete User</button>
          </Col>
        </Row>
      </CardHeader>

    </Card>
  );

}
SingleProfileUser.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};


SingleProfileUser.defaultProps = {
  userDetails: {
    // name: "Sierra Brooks",
    // avatar_url: require("./../images/avatars/0.jpg"),
    // jobTitle: "Project Manager",
    // performanceReportTitle: "Workload",
    // performanceReportValue: 74,
  }
};

export default SingleProfileUser;
