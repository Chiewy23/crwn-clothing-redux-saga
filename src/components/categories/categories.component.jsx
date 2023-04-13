import DirectoryItem from "./directory-item/directory-item.component";
import UUIDV4 from "../../utilities/UUIDV4.utils";

import { CategoriesContainer } from "./categories.styles";

const categories = [
  {
    id: UUIDV4(),
    title: "Hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "shop/hats"
  },
  {
    id: UUIDV4(),
    title: "Jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/jackets"
  },
  {
    id: UUIDV4(),
    title: "Sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "shop/sneakers"
  },
  {
    id: UUIDV4(),
    title: "Womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "shop/womens"
  },
  {
    id: UUIDV4(),
    title: "Mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "shop/mens"
  }
];

const Categories = () => {
    return (
        <CategoriesContainer>
        {
          categories.map(({id, title, imageUrl, route}) => {
            return (
              <DirectoryItem key={id} title={title} imageUrl={imageUrl} route={route} />
            )
          })
        }
      </CategoriesContainer>
    );
};

export default Categories;