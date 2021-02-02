import React, { useEffect, useState, useRef } from "react";
import ReactJson from "react-json-view";
import { sendAuthorizationRequest, sendTokenRequest } from "../actions/sign-in";
import { dispatchLogout } from "../actions/sign-out";
import {
    isValidSession,
    getAllSessionParameters,
    decodeIdToken,
    getCodeVerifier,
    setCodeVerifier,
} from "../actions/session";
import getPKCE from "../actions/pkce";
import { fetchUserProfile as fetchUserProfileApi, generateToken } from "../actions/profile";

export default function Home() {
    const pkcePair = useRef(getPKCE());

    const [profile, setProfile] = useState({});

    const [state, setState] = useState({
        idToken: {},
        tokenResponse: {},
        isLoggedIn: false,
        profile: {},
    });

    const isSessionValid = isValidSession();

    useEffect(updateCodeVerifier, []);

    useEffect(() => {
        if (isSessionValid) {
            const session = getAllSessionParameters();

            const _tokenResponse = {
                access_token: session.ACCESS_TOKEN,
                refresh_token: session.REFRESH_TOKEN,
                scope: session.SCOPE,
                id_token: session.ID_TOKEN,
                token_type: session.TOKEN_TYPE,
                expires_in: parseInt(session.EXPIRES_IN),
            };

            const idToken = decodeIdToken(session.ID_TOKEN);

            setState({
                idToken,
                tokenResponse: _tokenResponse,
                isLoggedIn: true,
            });

            fetchUserProfile(idToken.ht_id, session.ACCESS_TOKEN);
        } else {
            handleRequestToken();
        }
    }, [isSessionValid]);

    function handleRequestToken() {
        const code = new URL(window.location.href).searchParams.get("code");
        if (isSessionValid || !code) {
            return;
        }

        const codeVerifier = getCodeVerifier();
        sendTokenRequest(code, codeVerifier)
            .then((response) => {
                console.log("TOKEN REQUEST SUCCESS", response);
                setState({
                    tokenResponse: response[0],
                    idToken: response[1],
                    isLoggedIn: true,
                });
            })
            .catch((error) => {
                console.log("TOKEN REQUEST ERROR", error);
                setState({ isLoggedIn: false });
            });
    }

    // set Code Verifier to cookies
    function updateCodeVerifier() {
        const codeVerifier = getCodeVerifier();
        const code = new URL(window.location.href).searchParams.get("code");

        if (!code || !codeVerifier) {
            setCodeVerifier(pkcePair.current.codeVerifier);
        }
    }

    async function fetchUserProfile(ht_id, accessToken) {
        const apimAccessToken = await generateToken();
        const profile = await fetchUserProfileApi(ht_id, accessToken, apimAccessToken);
        if (profile) {
            setProfile(profile);
        }
    }

    function handleLoginBtnClick() {
        sendAuthorizationRequest(pkcePair.current.codeChallenge);
    }

    function handleSignUpBtnClick() {
        window.open("https://app-profile-dev.hungthinhcorp.com.vn/account/register", "_blank");
    }

    function handleLogoutBtnClick() {
        dispatchLogout();
    }

    return (
        <div className="home-container">
            {/*<h1 className="ht-id">Hồ Tràm Complex</h1>*/}
            <br />
            {state.isLoggedIn ? (
                <>
                    <div className="profile-menu">
                        {profile && (
                            <span className="">
                                <span>{profile.full_name}, </span>
                                <span>HungThinh Id của bạn là {profile.ht_id} </span>
                            </span>
                        )}
                        <button className="btn btn-danger" onClick={handleLogoutBtnClick}>
                            Đăng Xuất
                        </button>
                    </div>
                    {profile && (
                        <div className="container main-contain">
                            <div className="row">
                                <div className="col-4 mb-5 item-ht">
                                    <a href="#">
                                        <img
                                            className="img-fluid"
                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg"
                                        />
                                    </a>
                                    <div className="text-center pt-4">
                                        <h5>Xe 5 chỗ</h5>
                                        <p>
                                            <span className="mr-1">
                                                <strong>Chỉ từ 500 triệu</strong>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-4 mb-5 item-ht">
                                    <a href="#">
                                        <img
                                            className="img-fluid"
                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg"
                                        />
                                    </a>
                                    <div className="text-center pt-4">
                                        <h5>Xe 7 chỗ</h5>
                                        <p>
                                            <span className="mr-1">
                                                <strong>Chỉ từ 1,2 tỷ</strong>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-4 mb-5 item-ht">
                                    <a href="#">
                                        <img
                                            className="img-fluid"
                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg"
                                        />
                                    </a>
                                    <div className="text-center pt-4">
                                        <h5>Siêu xe</h5>
                                        <p>
                                            <span className="mr-1">
                                                <strong>Chỉ từ 10tỷ</strong>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <button className="btn btn-primary float-right" onClick={handleLoginBtnClick}>
                        Đăng Nhập
                    </button>
                    <button className="btn btn-primary float-right mr-2" onClick={handleSignUpBtnClick}>
                        Đăng Ký
                    </button>
                </>
            )}
        </div>
    );
}
