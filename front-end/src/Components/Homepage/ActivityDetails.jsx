const ActivityDetails = ({activity}) => {
    return (
        <>
          <h3>{activity.title}</h3>
          <a href="something">
            <img src={activity.pic} alt="ActivityPic" />
          </a>
          <h4>{activity.benefits}</h4>
        </>
      );
}
 
export default ActivityDetails;