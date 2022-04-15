import * as TextStyle from '../../Style/TextStyle'

const PageInstructions = ({instructions}) => {
    return (
        <>
            <TextStyle.Page_description>{instructions}</TextStyle.Page_description>
        </>
    );
}
 
export default PageInstructions;