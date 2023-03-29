import React from 'react';
import st from './navigation.module.css';
import BtnNavPg from "../../../UI/btn_nav_pg/btn_nav_pg";
import iconHome from "../../../../assets/png/home.png";
import iconLost from "../../../../assets/png/lost_black.png";
import iconFound from "../../../../assets/png/paw_black.png";
import iconServices from "../../../../assets/png/megafon.png";
import iconFavorites from "../../../../assets/png/star_full.png";
import iconLogout from "../../../../assets/png/logout.png";
import BtnNavPrfl from "../../../UI/btn_nav_profile/btn_nav_profile";
import Avatar from "../../../UI/avatar/avatar";
import MySubNav from "../sub_nav_body/MySubNav";
import BtnSubNavPg from "../../../UI/btn_sub_nav_pg/btn_sub_nav_pg";
import subIconHotels from "../../../../assets/png/hotels.png";
import subIconWalking from "../../../../assets/png/walking.png";
import subIconVethelp from "../../../../assets/png/vetHelp.png";
import subIconFostering from "../../../../assets/png/fostering.png";
import {
    favorites,
    fostering,
    found,
    homePage,
    hotels,
    lost,
    profile,
    vetHelp,
    walking
} from "../../../../constants/paths";
import {useWindowPath} from "../../../../hooks/useWindowPath";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "firebase/auth";
import {auth} from "../../../../firebase/firebase-config";
import {SET_LOCAL_USER} from "../../../../store/userRegistrationReducer";
import BtnNavLogout from "../../../UI/btn_nav_pg/btn_nav_logout";


const MyNavigation = () => {
    const location = useWindowPath();
    const showServices = [hotels, walking, fostering, vetHelp].some((path) => path === location);
    // const user_name = useSelector(state => state.user_name);
    const user_name = useSelector(state => state.userRegistration.name)
    const dispatch = useDispatch();

    const pgBtnsAr = [
        {id: 0, name: 'Home', paths: [homePage, '/', ''], icon: iconHome, sub_points: null},
        {id: 1, name: 'Lost', paths: [lost], icon: iconLost, sub_points: null},
        {id: 2, name: 'Found', paths: [found], icon: iconFound, sub_points: null},
        {
            id: 3, name: 'Services', paths: [hotels, walking, fostering, vetHelp], icon: iconServices, sub_points:
                [
                    {sub_id: 0, sub_name: 'Hotels', sub_paths: hotels, sub_icon: subIconHotels},
                    {sub_id: 1, sub_name: 'Walking', sub_paths: walking, sub_icon: subIconWalking},
                    {sub_id: 2, sub_name: 'Fostering', sub_paths: fostering, sub_icon: subIconFostering},
                    {sub_id: 3, sub_name: 'VetHelp', sub_paths: vetHelp, sub_icon: subIconVethelp},
                ]
        },
        {id: 4, name: 'Favorites', paths: [favorites], icon: iconFavorites, sub_points: null},
    ];

    const logout = () => {
        console.log('pzdc');
        signOut(auth)
            .then(() => {
                dispatch({type: SET_LOCAL_USER, payload: false});
            }).catch(e => console.log(e.message));
    }

    return (
        <div className={st.base}>
            <div className={st.pg_btns}>
                {pgBtnsAr.map(btn =>
                    <div key={btn.id}>
                        <BtnNavPg btnPath={btn.paths} icon={btn.icon} title={btn.name}/>
                        {showServices && btn.sub_points &&
                            <MySubNav>
                                {btn.sub_points.map(subBtn =>
                                    <BtnSubNavPg key={subBtn.sub_id} btnPath={subBtn.sub_paths}
                                                 icon={subBtn.sub_icon} title={subBtn.sub_name}/>
                                )}
                            </MySubNav>
                        }
                    </div>
                )}
            </div>
            <div className={st.log_btns}>
                <BtnNavPrfl btnPath={profile}>
                    <Avatar/>
                    {user_name}
                </BtnNavPrfl>
                {/*<Link to={[]} style={{width: 20, height: 20, backgroundColor: "green"}} onClick={() => logout()}>*/}
                {/*    <NavIcon iconPath={iconFavorites} act_green={true}/>*/}
                {/*    Gdhdhdhd*/}
                {/*</Link>*/}
                <div onClick={() => logout()}>
                    <BtnNavLogout icon={iconLogout} title={'Logout'}/>
                </div>
            </div>
        </div>
    );
};

export default MyNavigation;