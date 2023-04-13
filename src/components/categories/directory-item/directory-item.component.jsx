import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({title, imageUrl, route}) => {
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;