import React, { useState, useEffect } from "react";

import './SwipeSettings.scss';
import InputRange, {Range} from 'react-input-range'
import 'react-input-range/lib/css/index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSwipeSettings, setSwipeRadius as _setSwipeRadius, setMinAge, setMaxAge, setSwipeSettings, SwipeSettingsState } from "redux/slices/SwipeSettingsSlice";

const minProfileAge = 18,
	ageRangeMustContain = 22,
	maxProfileAge = 55,
	minSwipeRadius = 1,
	swipeRadiusMustContain = 22,
	maxSwipeRadius = 120;

function SwipeSettings() {
	const [showAgeRequirement, setShowAgeRequirement] = useState(false);
	const [showSwipeRadiusRequirement, setShowSwipeRadiusRequirement] = useState(false);
	
	const dispatch = useDispatch();

	var swipeSettings = useSelector(selectSwipeSettings);
	const swipeRadius = swipeSettings.swipeRadius;
	const minAge = swipeSettings.minAge;
	const maxAge = swipeSettings.maxAge;
	const lookingFor = swipeSettings.lookingFor;

	useEffect(() => {
		if (swipeRadius === 0) {
			fetch('/assets/swipeSettings.json')
			.then(response => response.json())
			.then(((swipeSettings: SwipeSettingsState) => {
				dispatch(setSwipeSettings(swipeSettings));
			}));
		}
	 }, [dispatch]);

	const updateAgeRange = function(range: Range) {
		var shouldShowAgeRequirement = false,
			nextMinAge = {minAge: minAge},
			nextMaxAge = {maxAge: maxAge};

		if (range.min <= ageRangeMustContain) {
			nextMinAge.minAge = range.min;
		} else {
			nextMinAge.minAge = range.max === ageRangeMustContain ? ageRangeMustContain - 1 : ageRangeMustContain;
			shouldShowAgeRequirement = true;
		}
		if (range.max >= ageRangeMustContain) {
			nextMaxAge.maxAge = range.max;
		} else {
			nextMaxAge.maxAge = range.min === ageRangeMustContain ? ageRangeMustContain + 1 : ageRangeMustContain;
			shouldShowAgeRequirement = true;
		}

		dispatch(setMinAge(nextMinAge));
		dispatch(setMaxAge(nextMaxAge));

		setShowAgeRequirement(shouldShowAgeRequirement);
	};

	const setSwipeRadius = function(value: number) {
		if (value >= swipeRadiusMustContain) {
			dispatch(_setSwipeRadius({ swipeRadius: value }));
			setShowSwipeRadiusRequirement(false);
		} else {
			setShowSwipeRadiusRequirement(true);
		}
	};

	return (
		<div className="swipe-settings-container">
			<div className="swipe-settings">
				<div className="settings-body">
					<h4 className="settings-title"><span>Swipe Settings</span><span>Save</span></h4>
					<div className="discovery-settings">
						<div className="setting">
							<div className="setting-label">
								<div className="setting-name">Swipe Radius</div>
								<div className="setting-value"> {swipeRadius === maxSwipeRadius ? "over" : ""} {Math.floor(swipeRadius)}km</div>
							</div>
							<div className="input-range-container">
								<InputRange
									value={swipeRadius}
									formatLabel={() => ""}
									minValue={minSwipeRadius}
									maxValue={maxSwipeRadius}
									onChange={(value) => {value = value as number; setSwipeRadius(value)}} />
							</div>
							<div>
								<span className="requirement-message" style={{opacity: showSwipeRadiusRequirement ? 1 : 0}}>
									Swipe Radius must include Zach's current location relative to you.
								</span>
							</div>
						</div>
						<div className="setting">
							<div className="setting-label">
								<div className="setting-name">Age Range</div>
								<div className="setting-value">{Math.floor(minAge)} - {Math.floor(maxAge)}{maxAge === maxProfileAge ? "+" : ""}</div>
							</div>
							<div className="input-range-container">
								<InputRange
									value={{min: minAge, max: maxAge}}
									formatLabel={() => ""}
									minValue={minProfileAge}
									maxValue={maxProfileAge}
									onChange={(value) => {value = value as Range; updateAgeRange(value)}} />
							</div>
							<div>
								<span className="requirement-message" style={{opacity: showAgeRequirement ? 1 : 0}}>
									Age range must include Zach's current age.
								</span>
							</div>
						</div>
						<Link to="/swipe/settings/looking-for">
							<div className="setting preference-list">
								<div className="setting-label">
									<div className="setting-name">Looking For</div>
									<div className="setting-value">{lookingFor} <FontAwesomeIcon icon={faChevronRight} /></div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SwipeSettings;