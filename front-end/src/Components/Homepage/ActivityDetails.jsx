import * as DivStyle from "../../Style/DivStyle";
import * as PictureStyle from "../../Style/PictureStyle";
import { Link } from "react-router-dom";
import * as TextStyle from "../../Style/TextStyle";



const ActivityDetails = ({activity}) => {
  const scroll_to_the_top = () => {
    window.scrollTo({      
      top : 0,
      behavior :"smooth"
    })
  };

    return (
        <DivStyle.Feature_description background_color={activity.bg_color} txt_color={activity.txt_color} >
          <TextStyle.Activity_details_title>{activity.title}</TextStyle.Activity_details_title>
          <Link to={activity.link} onClick = {scroll_to_the_top}>
            <PictureStyle.Feature_picture src={`home/${activity.pic}`} alt="ActivityPic" width ={activity.pic_width} />
          </Link>
          <TextStyle.Activity_details_desc>{activity.benefits}</TextStyle.Activity_details_desc>
        </DivStyle.Feature_description>
      );
}
 
export default ActivityDetails;

