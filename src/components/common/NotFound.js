import React from "react";
import Navb from './navb';
// import { withRouter } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import Lottie from 'lottie-react-web';
import animation from '../../assets/img/404.json'

const NotFound = () => {
    const lastLocation = useLastLocation();

    return (
        <div>
            <Navb />
            <div id='NotFondStyle' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lottie
                    options={{
                        animationData: animation
                    }}
                />
            </div>
            <div id='ReloadContinerBTN'>
                {lastLocation===null?(
                <div  onClick={()=>window.location.href='/'} id='ReloadrBTN'>Reload</div>
                ):(
                    <div  onClick={()=>window.location.href=`${lastLocation.pathname}`} id='ReloadrBTN'>Reload</div>
                )}
                
            </div>
        </div>
    );
};
// class NotFound extends Component {
//     render() {

//         return (
//             <div>
//                 <Navb />
//                 <div id='NotFondStyle' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Lottie
//                         options={{
//                             animationData: animation
//                         }}
//                     />
//                 </div>
//             </div>

//         );


//     }
// }
export default NotFound;

