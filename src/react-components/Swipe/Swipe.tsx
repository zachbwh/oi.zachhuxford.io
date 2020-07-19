import React from 'react';
import './Swipe.scss'

import ProfileCard from './ProfileCard/ProfileCard'
import Profile from 'typescript-types/IProfile';


const profiles: Profile[] = [
	{
		UserName: "zachbwh",
		ShortName: "Zach",
		FullName: "Zach Huxford",
		BirthDate: new Date("1998-02-21T11:00:00.148Z"),
		Biography: `Hello

Nice to meet your aquaintance.

My name is Zachariah Huxford`,
		Gender: {
			Gender: "male",
			Pronouns: "he/him"
		},
		InterestedIn: "women",
		Occupation: "software dev",
		Locality: {
			ShortName: "Auckland",
			Longitude: 	174.763336,
			Lattitude: -36.848461
		},
		ProfileImages: [
			{
				ImageUrl: "/assets/swipe-images/isolation-April 03, 2020-9.jpg",
				ImageAltText: "Zach playing backyard cricket in a fashionable striped shirt"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-6.jpg",
				ImageAltText: "Zach relaxing in his dressing gown using his phone on an orange chair after a long day"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-8.jpg",
				ImageAltText: "Zach looking sexy in his dressing gown"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 10, 2020-10.jpg",
				ImageAltText: "Zach having a spiritual moment with no shirt on in the grass"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-9.jpg",
				ImageAltText: "Zach wearing double denim in the dark"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-10.jpg",
				ImageAltText: "Zach wearing double denim in the dark on his bike",
				Offset: 0
			},
		]
	}
];

function Swipe() {
	var profileCards = profiles.map(profile => {
		return (<ProfileCard profile={profile} key={profile.UserName}></ProfileCard>);
	});

	return (
	<div className="swipe-container">
		{profileCards}
	</div>
	);
}

export default Swipe;
