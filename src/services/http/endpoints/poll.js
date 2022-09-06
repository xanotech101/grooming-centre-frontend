import { http } from '../http';

/**
 * Endpoint to get `poll-listing`
 *  @param {object} params
 *
 * @returns {Promise<{ polls: PollListArray }>}
 */
export const adminGetPollListing = async () => {
	const path = `/polls`;

	const {
		data: { data },
	} = await http.get(path);

	return {
		polls: data.map(poll => ({
			id: poll.poll.id,
			question: poll.poll.question,
		})),
		showingDocumentsCount: data.length,
		totalDocumentsCount: data.length,
	};
};

/**
 * Endpoint to get `poll-listing`
 *  @param {object} params
 *
 * @returns {Promise<{ polls: PollListArray }>}
 */
export const adminGetSinglePoll = async pollId => {
	const path = `/polls/${pollId}`;

	const {
		data: { data },
	} = await http.get(path);

	return {
		poll: data,
		showingDocumentsCount: data.length,
		totalDocumentsCount: data.length,
	};
};

/**
 * Endpoint to get `poll-listing`
 *  @param {object} params
 *
 * @returns {Promise<{ polls: PollListArray }>}
 */
export const adminGetPollOptions = async pollId => {
	const path = `/polls/${pollId}`;

	const {
		data: { data },
	} = await http.get(path);

	return {
		pollOptions: data.poll.pollOptions.map(pollOption => ({
			id: pollOption.id,
			text: pollOption.text,
			pollId: pollOption.pollId,
		})),
		showingDocumentsCount: data.length,
		totalDocumentsCount: data.length,
	};
};
