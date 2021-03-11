import IGender from 'typescript-types/Swipe/IGender'
import IProfileImage from 'typescript-types/Swipe/IProfileImage'
import ILocailty from 'typescript-types/Swipe/ILocality'

interface IProfile {
	UserName: string,
	ShortName: string,
	FullName: string,
	BirthDate: Date,
	Biography: string,
	Gender: IGender,
	InterestedIn: string,
	Occupation: string,
	Locality: ILocailty,
	ProfileImages: IProfileImage[],
	Status: "candidate" | "accepted" | "rejected"
}

export default IProfile;