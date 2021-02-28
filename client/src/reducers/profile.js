import {
	GET_PROFILE,
	GET_RECOMMENDATIONS,
	RECOMMENDATIONS_ERROR,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	recommendations:[],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null
			};
		case GET_RECOMMENDATIONS:
			return {
				...state,
				recommendations: payload,
				loading: false
			};
		case RECOMMENDATIONS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		default:
			return state;
	}
}
