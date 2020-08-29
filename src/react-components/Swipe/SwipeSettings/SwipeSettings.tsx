import React, { useState } from "react";

import './SwipeSettings.scss';
import InputRange, {Range} from 'react-input-range'
import 'react-input-range/lib/css/index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const minProfileAge = 18,
	ageRangeMustContain = 22,
	maxProfileAge = 55,
	minSwipeRadius = 1,
	maxSwipeRadius = 120;

function SwipeSettings() {
	const [swipeRadius, setSwipeRadius] = useState(69);
	const [minAge, setMinAge] = useState(18);
	const [maxAge, setMaxAge] = useState(55);
	const [lookingFor, setLookingFor] = useState<"Men" | "Everyone" | "Zach">("Zach");

	const updateAgeRange = function(range: Range) {
		if (range.min <= ageRangeMustContain) {
			setMinAge(range.min);
		}
		if (range.max >= ageRangeMustContain) {
			setMaxAge(range.max);
		}
	};

	const openPreferenceList = function() {
		
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
								<div className="setting-value">{Math.floor(swipeRadius)} km.</div>
							</div>
							<div className="input-range-container">
								<InputRange
									value={swipeRadius}
									formatLabel={() => ""}
									minValue={minSwipeRadius}
									maxValue={maxSwipeRadius}
									onChange={(value) => {value = value as number; setSwipeRadius(value)}} />
							</div>
						</div>
						<div className="setting">
							<div className="setting-label">
								<div className="setting-name">Age Range</div>
								<div className="setting-value">{Math.floor(minAge)} - {Math.floor(maxAge)} {maxAge === maxProfileAge ? "+" : ""}</div>
							</div>
							<div className="input-range-container">
								<InputRange
									value={{min: minAge, max: maxAge}}
									formatLabel={() => ""}
									minValue={minProfileAge}
									maxValue={maxProfileAge}
									onChange={(value) => {value = value as Range; updateAgeRange(value)}} />
							</div>
						</div>
						<div className="setting preference-list" onClick={openPreferenceList}>
							<div className="setting-label">
								<div className="setting-name">Looking For</div>
								<div className="setting-value">{lookingFor} <FontAwesomeIcon icon={faChevronRight} /></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SwipeSettings;