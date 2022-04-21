import * as DivStyle from "../../Style/DivStyle";
import * as PictureStyle from "../../Style/PictureStyle";
import { Link } from "react-router-dom";
import * as TextStyle from "../../Style/TextStyle";



const ActivityDetails = ({activity}) => {
    return (
        <DivStyle.Feature_description background_color={activity.bg_color} txt_color={activity.txt_color} >
          <TextStyle.Activity_details_title>{activity.title}</TextStyle.Activity_details_title>
          <Link to={activity.link}>
            <PictureStyle.Feature_picture src={`home/${activity.pic}`} alt="ActivityPic" width ={activity.pic_width} />
          </Link>
          <TextStyle.Activity_details_desc>{activity.benefits}</TextStyle.Activity_details_desc>
        </DivStyle.Feature_description>
      );
}
 
export default ActivityDetails;

