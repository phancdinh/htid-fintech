import icon1 from "../img/icon1.png";
import icon2 from "../img/icon2.png";
import icon3 from "../img/icon3.png";
import icon4 from "../img/icon4.png";
import React from "react";

export default function AuthenUser(profile, handleLogoutBtnClick) {
    return (
        <div className="profile-menu d-flex ">
            <div>
                {profile && (
                    <span>
                        Xin chào,
                        <span className="font-weight-bold">{profile.full_name}</span>
                    </span>
                )}
            </div>
            <div className="ml-2">
                <div className="dropdown">
                    <button className="dropbtn">
                        <img src={getIconFromHtId(profile.ht_id)} alt="" />
                    </button>
                    <div className="dropdown-content">
                        <a href={"javascript:void()"} onClick={handleLogoutBtnClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function getIconFromHtId(htId) {
    if (!htId) return icon1;

    const num = htId % 4;

    switch (num) {
        case 0:
            return icon1;
        case 1:
            return icon2;
        case 2:
            return icon3;
        case 3:
            return icon4;
        default:
            return icon1;
    }
}
