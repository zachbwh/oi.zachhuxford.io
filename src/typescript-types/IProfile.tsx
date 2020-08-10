import IGender from 'typescript-types/IGender'
import IProfileImage from 'typescript-types/IProfileImage'
import ILocailty from 'typescript-types/ILocality'

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