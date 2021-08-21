import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
	if (!props.events) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: { events: featuredEvents },
		revalidate: 60 * 60
	};
}
