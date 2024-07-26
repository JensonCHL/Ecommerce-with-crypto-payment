import starReguler from '../assets/starreguler.png'
import starSolid from '../assets/starsolid.png'

const Rating = ({value})=>{
    return(
        <div>
            <img src={value>=1?starSolid : starReguler} width="20px" height="20px" alt="star" />
            <img src={value>=1?starSolid : starReguler} width="20px" height="20px" alt="star" />
            <img src={value>=1?starSolid : starReguler} width="20px" height="20px" alt="star" />
            <img src={value>=1?starSolid : starReguler} width="20px" height="20px" alt="star" />
            <img src={value>=1?starSolid : starReguler} width="20px" height="20px" alt="star" />
        </div>
    );

}

export default Rating;