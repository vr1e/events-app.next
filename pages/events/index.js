import Head from 'next/head';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util';

export default function EventsPage(props) {
	const router = useRouter();
	const { events } = props;

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	if (!events) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Head>
				<title>All Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to improve...'
				/>
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: { events: events },
		revalidate: 60,
	};
}
