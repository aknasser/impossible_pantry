import * as DivStyle from "../../Style/DivStyle";



const ActivityDetails = ({activity}) => {
    return (
        <DivStyle.Feature_description background_color={activity.bg_color} txt_color={activity.txt_color} >
          <h3>{activity.title}</h3>
          <a href="something">
            <img src={activity.pic} alt="ActivityPic" />
          </a>
          <h4>{activity.benefits}</h4>
        </DivStyle.Feature_description>
      );
}
 
export default ActivityDetails;

