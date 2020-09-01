import React, { useEffect } from "react";

import '../SwipeSettings.scss';
import './SwipeSettingsLookingFor.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { selectSwipeSettings, setLookingFor, SwipeSettingsState, setSwipeSettings } from "redux/slices/SwipeSettingsSlice";
import { useSelector, useDispatch } from "react-redux";

function SwipeSettingsLookingFor() {
	const dispatch = useDispatch();

	var swipeSettings = useSelector(selectSwipeSettings);
	const lookingFor = swipeSettings.lookingFor,
		swipeRadius = swipeSettings.swipeRadius;

	useEffect(() => {
		if (swipeRadius === 0) {
			fetch('/assets/swipeSettings.json')
			.then(response => response.json())
			.then(((swipeSettings: SwipeSettingsState) => {
				dispatch(setSwipeSettings(swipeSettings));
			}));
		}
	 }, [dispatch, swipeRadius]);

	return (
		<div className="swipe-settings-container looking-for">
			<div className="swipe-settings">
				<div className="settings-body">
					<h4 className="settings-title"><span>Looking For</span><span onClick={() => window.history.back()}>Done</span></h4>
					<div className="discovery-settings">
						<div className="setting" onClick={() => dispatch(setLookingFor({ lookingFor: "Everyone" }))}>
							<div className="setting-label">
								<div className="setting-name">Everyone</div>
								<div className="setting-value" style={{opacity: lookingFor === "Everyone" ? 1 : 0}}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></div>
							</div>
						</div>
						<div className="setting" onClick={() => dispatch(setLookingFor({ lookingFor: "Men" }))}>
							<div className="setting-label">
								<div className="setting-name">Men</div>
								<div className="setting-value" style={{opacity: lookingFor === "Men" ? 1 : 0}}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></div>
							</div>
						</div>
						<div className="setting" onClick={() => dispatch(setLookingFor({ lookingFor: "Zach" }))}>
							<div className="setting-label">
								<div className="setting-name">Zach</div>
								<div className="setting-value" style={{opacity: lookingFor === "Zach" ? 1 : 0}}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SwipeSettingsLookingFor;